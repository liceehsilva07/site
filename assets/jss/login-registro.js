document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Configura o evento de submit para o formulário de registro
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            if (response.status === 201) {
                alert("Registrado com sucesso! Redirecionando para a página de login.");
                window.location.href = 'login.html';
            } else if (response.status === 409) {
                alert("Nome de usuário ou e-mail já estão em uso. Tente outro.");
            } else {
                alert("Erro ao registrar");
            }
        });
    }
    

    // Configura o evento de submit para o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
    
            if (response.ok) {
                const data = await response.json(); // Interpreta a resposta como JSON
                localStorage.setItem('userName', username);
                localStorage.setItem('isAdmin', data.isAdmin); // Armazena se é admin
                alert(data.message);
                window.location.href = 'C:/Users/anaal/OneDrive/Desktop/Site/cardapio.html';
            } else {
                alert("Nome de usuário ou senha incorretos. Tente novamente.");
            }
            
        });
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = localStorage.getItem('isAdmin');
    const adminLink = document.getElementById('admin-link');
    
    // Exibir o link de cadastro apenas para administradores
    if (isAdmin === '1') { // '1' representa o valor que indica um usuário admin
        adminLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
    }
});


function logout() {
    localStorage.removeItem('userName'); // Remove o nome do usuário
    alert("Você saiu da conta.");
    window.location.href = './assets/jss/login.html'; // Redireciona para a página de login
}

