// Função para inicializar o mapa
function initMap() {
    var map = L.map('map').setView([-22.948838252865173, -43.23465728802696], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-22.948838252865173, -43.23465728802696]).addTo(map)
        .bindPopup('Endereço: Estrada da Pizzaria, 123456')
        .openPopup();
}


// Função para redirecionar para o cardápio
function irParaPagina() {
    window.location.href = "cardapio.html";
}

// Função para carregar produtos e exibir no cardápio
fetch('http://localhost:3001/produtos')
    .then(response => response.json())
    .then(data => {
        let cardapioContainer = document.querySelector('#cardapio-container');
        data.forEach(product => {
            // Tratar valores de preço como numéricos e definir "0.00" para valores inválidos
            const precoPequena = isNaN(product.preco_pequena) ? "0.00" : parseFloat(product.preco_pequena).toFixed(2);
            const precoMedia = isNaN(product.preco_media) ? "0.00" : parseFloat(product.preco_media).toFixed(2);
            const precoGrande = isNaN(product.preco_grande) ? "0.00" : parseFloat(product.preco_grande).toFixed(2);
            const precoGigante = isNaN(product.preco_gigante) ? "0.00" : parseFloat(product.preco_gigante).toFixed(2);

            const productCard = `
                <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12">
                    <div class="card mb-3" style="max-width: 33.25rem;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="./assets/images/pizzas/${product.imagem}" class="card-img" alt="${product.nome}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${product.nome}</h5>
                                    <p class="card-text">${product.descricao}</p>
                                    <label for="tamanho-${product.id}">Escolha o tamanho:</label>
                                    <select id="tamanho-${product.id}" class="form-control" onchange="atualizarPreco(${product.id})">
                                        <option value="${precoPequena}">Pequena - R$ ${precoPequena}</option>
                                        <option value="${precoMedia}">Média - R$ ${precoMedia}</option>
                                        <option value="${precoGrande}">Grande - R$ ${precoGrande}</option>
                                        <option value="${precoGigante}">Gigante - R$ ${precoGigante}</option>
                                    </select>
                                    <p class="card-text">Preço: R$ <span id="preco-${product.id}">${precoPequena}</span></p>
                                    <button class="btn btn-success add-to-cart" data-id="${product.id}" data-name="${product.nome}">Adicionar ao Carrinho</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cardapioContainer.innerHTML += productCard;
        });

// CARRINHO

        // Adicionar eventos para os botões "Adicionar ao Carrinho"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const productName = this.getAttribute('data-name');
                const tamanho = document.querySelector(`#tamanho-${productId}`).value;

                alert(`Você adicionou ${productName} (${tamanho}) ao carrinho!`);
            });
        });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));


// Função para atualizar o preço exibido de acordo com o tamanho selecionado
function atualizarPreco(id) {
    const selectElement = document.querySelector(`#tamanho-${id}`);
    const precoElement = document.querySelector(`#preco-${id}`);
    precoElement.textContent = parseFloat(selectElement.value).toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let cartCount = 0;
    let cartTotal = 0;

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        document.getElementById('cart-count').textContent = cartCount;
    }

    // Função para atualizar o menu suspenso do carrinho
    function updateCartDropdown() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        cartItemsContainer.innerHTML = ''; // Limpa o carrinho antes de adicionar os itens
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} (${item.size}) - R$ ${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });
        
        cartTotalElement.textContent = cartTotal.toFixed(2);
    }

    // Função para adicionar itens ao carrinho
    function addToCart(productId, name, price, size) {
        // Adiciona o item ao array do carrinho
        cart.push({ id: productId, name: name, price: parseFloat(price), size: size });
        cartCount++;
        cartTotal += parseFloat(price);
        updateCartCount();
        updateCartDropdown();
    }

    // Exibir/ocultar o menu suspenso ao clicar no ícone do carrinho
    document.getElementById('cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        const cartDropdown = document.getElementById('cart-dropdown');
        cartDropdown.style.display = cartDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Carregar produtos e exibir no cardápio
    fetch('http://localhost:3001/produtos')
        .then(response => response.json())
        .then(data => {
            let cardapioContainer = document.querySelector('#cardapio-container');
            cardapioContainer.innerHTML = ''; // Limpar o contêiner para evitar duplicações

            data.forEach(product => {
                const precoPequena = isNaN(product.preco_pequena) ? "0.00" : parseFloat(product.preco_pequena).toFixed(2);
                const precoMedia = isNaN(product.preco_media) ? "0.00" : parseFloat(product.preco_media).toFixed(2);
                const precoGrande = isNaN(product.preco_grande) ? "0.00" : parseFloat(product.preco_grande).toFixed(2);
                const precoGigante = isNaN(product.preco_gigante) ? "0.00" : parseFloat(product.preco_gigante).toFixed(2);

                const productCard = `
                    <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12">
                        <div class="card mb-3" style="max-width: 33.25rem;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="./assets/images/pizzas/${product.imagem}" class="card-img" alt="${product.nome}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.nome}</h5>
                                        <p class="card-text">${product.descricao}</p>
                                        <label for="tamanho-${product.id}">Escolha o tamanho:</label>
                                        <select id="tamanho-${product.id}" class="form-control">
                                            <option value="${precoPequena}" data-size="Pequena">Pequena - R$ ${precoPequena}</option>
                                            <option value="${precoMedia}" data-size="Média">Média - R$ ${precoMedia}</option>
                                            <option value="${precoGrande}" data-size="Grande">Grande - R$ ${precoGrande}</option>
                                            <option value="${precoGigante}" data-size="Gigante">Gigante - R$ ${precoGigante}</option>
                                        </select>
                                        <button class="btn btn-success add-to-cart" data-id="${product.id}" data-name="${product.nome}">Adicionar ao Carrinho</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cardapioContainer.innerHTML += productCard;
            });

            // Adicionar eventos para os botões "Adicionar ao Carrinho"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const productName = this.getAttribute('data-name');
                    const selectElement = document.querySelector(`#tamanho-${productId}`);
                    const price = selectElement.value;
                    const size = selectElement.options[selectElement.selectedIndex].getAttribute('data-size');
                    
                    addToCart(productId, productName, price, size);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));

    // Finalizar compra
    document.getElementById('finalizar-compra').addEventListener('click', function() {
        alert('Compra finalizada com sucesso!');
    });
});

// CADASTRO

    document.addEventListener('DOMContentLoaded', function() {
        const userName = localStorage.getItem('userName');
        if (userName) {
            const loginButton = document.querySelector('.btn-login');
            loginButton.textContent = `Olá, ${userName}`;
            loginButton.disabled = true; // Desativa o botão de login
        }
    });

//VERIFICANDO SE É O ADM

    document.addEventListener('DOMContentLoaded', function() {
        const isAdmin = localStorage.getItem('isAdmin');
        if (isAdmin === '1') {
            document.getElementById('admin-link').style.display = 'block';
        }
    });
