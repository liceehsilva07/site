document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const precoPequena = parseFloat(document.getElementById('preco-pequena').value);
        const precoMedia = parseFloat(document.getElementById('preco-media').value);
        const precoGrande = parseFloat(document.getElementById('preco-grande').value);
        const precoGigante = parseFloat(document.getElementById('preco-gigante').value);
        const imagem = document.getElementById('imagem').value;

        fetch('http://localhost:3001/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                descricao,
                precoPequena,
                precoMedia,
                precoGrande,
                precoGigante,
                imagem
            })
        })
        .then(response => response.text())
        .then(data => {
            alert('Produto cadastrado com sucesso!');
            document.getElementById('product-form').reset();
        })
        .catch(error => console.error('Erro ao cadastrar o produto:', error));
    });
});
