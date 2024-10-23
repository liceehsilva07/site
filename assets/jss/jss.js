//Index


function initMap() {
    var map = L.map('map').setView([-22.948838252865173, -43.23465728802696], 15); // Coordenadas de São Paulo
        
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
            
    L.marker([-22.948838252865173, -43.23465728802696]).addTo(map)
        .bindPopup('Endereço: Estrada da Pizzaria, 123456')
        .openPopup();
        }

function irParaPagina() {
    window.location.href = "cardapio.html"; // Substitua por sua URL
    }


//Carrinho

document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let cartCount = 0;

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        document.getElementById('cart-count').textContent = cartCount;
    }

    // Função para adicionar itens ao carrinho
    function addToCart(name, price, size) {
        cart.push({ name: name, price: parseFloat(price), size: size });
        cartCount++;
        updateCartCount();
        alert(name + " (" + size + ") adicionada ao carrinho! Preço: R$ " + price);
    }

    // Seleciona todos os botões de "Adicionar ao Carrinho" e adiciona um evento de clique
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const selectElement = this.parentElement.querySelector('.pizza-size');
            const price = selectElement.value;  // Captura o valor do preço selecionado
            const size = selectElement.options[selectElement.selectedIndex].getAttribute('data-size');  // Captura o tamanho selecionado

            addToCart(name, price, size);  // Adiciona ao carrinho com o nome, preço e tamanho
        });
    });

    // Função para exibir o carrinho
    function viewCart() {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        let cartDetails = "Itens no carrinho:\n";
        let total = 0;
        cart.forEach(item => {
            cartDetails += item.name + " (" + item.size + ") - R$ " + item.price.toFixed(2) + "\n";
            total += item.price;
        });
        cartDetails += "Total: R$ " + total.toFixed(2);
        alert(cartDetails);
    }

    // Exibe o carrinho quando o ícone do carrinho é clicado
    document.getElementById('cart-icon').addEventListener('click', viewCart);
});


document.addEventListener('DOMContentLoaded', function() {
    // Recuperar o carrinho e o total do localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = localStorage.getItem('total') || 0;

    // Exibir o resumo do carrinho
    let cartSummary = "Resumo do pedido:\n";
    cart.forEach(item => {
        cartSummary += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    cartSummary += `Total: R$ ${total}`;

    document.getElementById('cart-summary').innerText = cartSummary;

    // Função para finalizar o pedido
    document.getElementById('confirm-order').addEventListener('click', function() {
        alert('Pedido confirmado! Obrigado por comprar conosco.');
        localStorage.clear(); // Limpa o carrinho após a confirmação
        window.location.href = "index.html"; // Redireciona para a página inicial
    });
});

/* LOGIN */

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validação simples (em um projeto real, isso seria feito no backend)
        if (email === 'usuario@exemplo.com' && password === '12345') {
            alert('Login realizado com sucesso!');
            window.location.href = 'cardapio.html'; // Redireciona para o cardápio após login
        } else {
            alert('E-mail ou senha incorretos!');
        }
    });
});
