let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
    const form = document.querySelector('form[role="search"]');
    form?.addEventListener('submit', e => e.preventDefault());
    const input = document.getElementById('searchInput');
    input?.addEventListener('input', searchProducts);
});

function getProducts() {
    const productRow = document.getElementById('products');
    if (!productRow) return;

    fetch('https://fakestoreapi.com/products')
        .then(r => r.json())
        .then(products => {
            allProducts = products;
            renderProducts(allProducts);
        })
        .catch(err => {
            console.error('Errore nel caricamento dei prodotti:', err);
            productRow.innerHTML = '<div class="col-12"><p class="text-danger text-center">Impossibile caricare i prodotti.</p></div>';
        });
}

function renderProducts(list) {
    const productRow = document.getElementById('products');
    if (!productRow) return;
    productRow.innerHTML = list.map(product => {
        const title = product.title.length > 40 ? product.title.substring(0, 37) + '...' : product.title;
        const desc = product.description.length > 80 ? product.description.substring(0, 77) + '...' : product.description;
        return `
        <div class="col-6 col-md-4 col-lg-3 d-flex">
          <div class="card product-card flex-fill h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title mb-2">${title}</h6>
              <p class="card-text small flex-grow-1">${desc}</p>
              <a href="#" class="btn btn-primary btn-sm mt-auto">Dettagli</a>
            </div>
          </div>
        </div>`;
    }).join('');
}

function searchProducts() {
    const input = document.getElementById('searchInput');
    const q = (input?.value || '').toLowerCase().trim();
    if (!q) {
        renderProducts(allProducts);
        return;
    }
    const filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
    renderProducts(filtered.length ? filtered : []);
    if (!filtered.length) {
        const productRow = document.getElementById('products');
        productRow.innerHTML = '<div class="col-12"><p class="text-center text-muted">Nessun prodotto trovato.</p></div>';
    }
}