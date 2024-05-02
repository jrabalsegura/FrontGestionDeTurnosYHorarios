import gestionApi from "../api/gestionApi";



function apihelperdownload (filename) {
    const fileType = filename.split('.').pop(); // Extracts the file extension as type
    return gestionApi.post(`/download`, { name: filename, type: fileType }, { responseType: 'blob' }).then(function (response) {
        return response;
    })
}

export const downloadFile = (filename) => {
    apihelperdownload(filename).then(
        (res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            if (typeof window.navigator.msSaveBlob === 'function') {
                window.navigator.msSaveBlob(
                    res.data,
                    filename
                );
            } else {
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            }
        },
        (error) => {
            alert("Something went wrong", error);
        }
    )
};



