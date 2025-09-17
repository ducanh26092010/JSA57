// Lay du lieu tu API DummyJSON
const API_URL_ROOT = 'https://dummyjson.com/';

// ham render sp len giao dien
function renderProducts (products) {
    const container = document.getElementById("product_list");
    container.innerHTML = ""; // xoa code
    // chay vong lap de tao tung sp
    // ?. ktra neu dsach khac null -> thuc hien
    products?.forEach(p => {
        const productHTML = `
        <div class="col">
              <div class="card shadow-sm">
                <img src="${p.thumbnail}" alt="hinh anh san pham" />
                <div class="card-body">
                  <h3 class="card-title">${p.title}</h3>
                  <div class="card-text">
                    <strong class="text-danger">$${p.price}</strong>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <button type="button" data-id="${p.id}" class="btn btn-sm btn-primary">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            `;
            // them sp vao containet
            container.innerHTML += productHTML;
    });
}

// ham lay sp tu API
function loadProductsFormAPI() {
    fetch(API_URL_ROOT + "products", {method: "GET"})
        .then(response => response.json()) // chuyen thanh obj
        .then(data => {
            console.log(data);
            // goi ham load sp len giao dien
            renderProducts(data.products);
        })
        .catch(err => console.error("Loi API: ", err))
}


// goi ham khi load web
document.addEventListener('DOMContentLoaded', function() {
    loadProductsFormAPI();
});