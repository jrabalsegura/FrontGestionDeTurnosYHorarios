# React + Vite Project: Gestión de Turnos y Horarios

This project is a web application for managing shifts and schedules, built using React and Vite. It provides features for administrators and employees to efficiently handle scheduling tasks.

## Technologies Used

- React: A JavaScript library for building user interfaces
- Vite: A fast build tool and development server for modern web projects
- Redux Toolkit: A package that simplifies Redux development
- React Router: A routing library for React applications
- Material-UI (MUI): A popular React UI framework for building responsive and accessible user interfaces
- Axios: A promise-based HTTP client for making API requests
- date-fns: A lightweight JavaScript date utility library
- React Big Calendar: A calendar component for displaying events
- Jest: A JavaScript testing framework
- React Testing Library: A testing utility for React components

## Project Structure

The project follows a modular structure, separating concerns into different directories:

- `src/admin`: Contains components and routes specific to the admin functionality
- `src/auth`: Includes authentication-related components and routes
- `src/employee`: Contains components and routes specific to the employee functionality
- `src/api`: Includes API configuration and request handling
- `src/store`: Contains Redux store configuration and slices for state management

## Testing

The project includes unit tests written using Jest and React Testing Library. The tests ensure the correctness of individual components and Redux slices. To run the tests, use the following command:

```bash
npm test
```

The test coverage report is generated in the `coverage` directory.

## Deployment

This project is designed to work in conjunction with the backend project GestionDeTurnosYHorarios. To deploy both projects together, follow these steps:

1. Clone both repositories:

```bash
git clone https://github.com/jrabalsegura/FrontGestionDeTurnosYHorarios.git
git clone https://github.com/jrabalsegura/GestionDeTurnosYHorarios.git
```

2. Crear .env variables:

Frontend:
API=http://localhost:4014
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=12345678

Backend:
PORT=4014
DB_CNN=mongodb+srv://gestion_user:VOSMx5l4MyC2Wkmz@gestionturnosdb.ps0xuo5.mongodb.net/gestion_turnos
JWT_SECRET=ESTEESMIPROYECTOFINDEGRADO123987_45
API_ENDPOINT=http://localhost:4014
API_ENDPOINTHEROKU=https://gestion-horarios-cd0d24b996c6.herokuapp.com
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=12345678
SENDGRID_API_KEY=
NODE_ENV=development
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=

3. In the frontend project's directory, use Docker Compose to start both the frontend and backend services:

```bash
docker compose up
```

4. Open the application in your browser at `http://localhost:3010`

## Contributing

Contributions to the project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more information.



