let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
   
    document.querySelector('form[role="search"]')?.addEventListener('submit', e => e.preventDefault());

    fetch('https://fakestoreapi.com/products')
        .then(r => r.json())
        .then(products => {
            allProducts = products;
            render(allProducts);
        })
        .catch(err => {
            console.error('Errore nel caricamento dei prodotti:', err);
            const row = document.getElementById('products');
            if (row) row.innerHTML = '<div class="col-12"><p class="text-danger text-center">Impossibile caricare i prodotti.</p></div>';
        });

  
    const input = document.getElementById('searchInput');
    input?.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        const list = q
            ? allProducts.filter(p => (p.title + ' ' + p.description).toLowerCase().includes(q))
            : allProducts;
        render(list);
    });
});

function render(list) {
    const row = document.getElementById('products');
    if (!row) return;
    if (!list.length) {
        row.innerHTML = '<div class="col-12"><p class="text-center text-muted">Nessun prodotto trovato.</p></div>';
        return;
    }
    row.innerHTML = list.map(p => {
        const title = p.title.length > 40 ? p.title.slice(0, 37) + '...' : p.title;
        const desc = p.description.length > 80 ? p.description.slice(0, 77) + '...' : p.description;
        return `
            <div class="col-6 col-md-4 col-lg-3 d-flex">
                <div class="card product-card flex-fill h-100 shadow-sm">
                    <img src="${p.image}" class="card-img-top product-image" alt="${p.title}">
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title mb-2">${title}</h6>
                        <p class="card-text small flex-grow-1">${desc}</p>
                        <a href="#" class="btn btn-primary btn-sm mt-auto">Dettagli</a>
                    </div>
                </div>
            </div>`;
    }).join('');
}