document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    const productList = document.querySelector('main');
    if (!productList) return;

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const cards = products.map(product => `
                <div class="card m-2" style="width: 18rem; display:inline-block; vertical-align: top;">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title.substring(0,15 )}...</h5>
                        <p class="card-text">${product.description.substring(0,15 )}...</p>
                        <a href="#" class="btn btn-primary">Dettagli</a>
                    </div>
                </div>
            `).join('');
            productList.innerHTML = cards;
        })
        .catch(err => {
            console.error('Errore nel caricamento dei prodotti:', err);
            productList.innerHTML = '<p class="text-danger">Impossibile caricare i prodotti al momento.</p>';
        });
}