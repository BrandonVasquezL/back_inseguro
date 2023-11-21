document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function (event) {
        console.log('Evento submit del formulario');
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        authenticateUser(username, password);
    });

    const ingresarButton = document.getElementById('ingresarButton');
    ingresarButton.addEventListener('click', function () {
        console.log('Evento clic en el botón'); 
        // Simula el clic en el botón de enviar el formulario
        loginForm.submit();
    });
});

function authenticateUser(username, password) {
    console.log('Entró a authenticateUser');
    fetch('http://localhost:3000/vista', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        console.log('Respuesta del servidor:', response);
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.text();
    })
    .then(data => {
        console.log('Datos recibidos:', data);
        try {
            const jsonData = JSON.parse(data);
            console.log('Resultado:', jsonData);

            if (jsonData.success) {
                // Si la autenticación fue exitosa, redirige a home.html
                window.location.href = '/vista/home.html';
                console.log('Autenticación exitosa');
            } else {
                // Realizar otras acciones según el resultado, si es necesario
                console.log('Autenticación fallida');
            }
        } catch (error) {
            console.error('Error al analizar la respuesta JSON:', error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
