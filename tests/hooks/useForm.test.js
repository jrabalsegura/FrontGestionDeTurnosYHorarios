import { act, renderHook } from '@testing-library/react';
import { useForm } from '../../src/hooks/useForm';


describe('Pruebas en useForm', () => {

    const initialForm = {
        name: 'Fernando',
        email: 'fernando@google.com'
    }

    const formValidations = {
        name: [(value) => value.length >= 3, 'Name must be at least 3 characters long'],
        email: [(value) => value.includes('@'), 'Email must be valid']
    }


    test('debe de regresar los valores por defecto', () => {
        
        const { result } = renderHook( () => useForm(initialForm)  );
        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            isFormValid: true,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
        });

    });


    test('debe de cambiar el nombre del formulario', () => {

        const newValue = 'Juan';
        const { result } = renderHook( () => useForm(initialForm)  );
        const { onInputChange } = result.current;
        
        act(()=>{
            onInputChange({ target: { name: 'name', value: newValue } })
        });
                
        expect( result.current.name ).toBe( newValue );
        expect( result.current.formState.name ).toBe( newValue );

        
    });

    test('debe de realizar el reset del formulario', () => {

        const newValue = 'Juan';
        const { result } = renderHook( () => useForm(initialForm)  );
        const { onInputChange, onResetForm } = result.current;
        
        act(()=>{
            onInputChange({ target: { name: 'name', value: newValue } });
            onResetForm();
        });
                
        expect( result.current.name ).toBe( initialForm.name );
        expect( result.current.formState.name ).toBe( initialForm.name );

        
    });

    test('debe de validar el formulario correctamente', () => {
        const { result } = renderHook(() => useForm(initialForm, formValidations));
        expect(result.current.nameValid).toBe(null);
        expect(result.current.emailValid).toBe(null);
        expect(result.current.isFormValid).toBe(true);
    });

    test('debe de detectar errores de validación en el formulario', () => {
        const invalidForm = {
            name: 'Fe',
            email: 'fernando'
        };
        const { result } = renderHook(() => useForm(invalidForm, formValidations));
        expect(result.current.nameValid).toBe('Name must be at least 3 characters long');
        expect(result.current.emailValid).toBe('Email must be valid');
        expect(result.current.isFormValid).toBe(false);
    });


    
});