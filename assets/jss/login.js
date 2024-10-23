document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Login efetuado com sucesso");
        window.location.href = 'index.html';  // Redireciona para a página index.html após o login
    } else {
        alert(data.message);
    }
});



/* CADASTRO */

document.getElementById('registerButton').addEventListener('click', () => {
    window.location.href = 'registro.html'; // Defina o caminho da página de registro
});
