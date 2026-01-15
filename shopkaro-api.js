<script>
/* ========================================
🔥 FULLSTACK CONNECTION - ShopKaro Backend
======================================== */

const API_BASE = 'http://localhost:8000/api';

// 🔥 1. LOAD PRODUCTS FROM BACKEND (Replace your old function)
async function loadAllProducts() {
try {
console.log('🔄 Fetching products from Django backend...');
const response = await fetch(`${API_BASE}/products/?category=all`);
const allProducts = await response.json();

// Organize for your existing frontend (perfect match!)
const categorized = {
mobiles: allProducts.filter(p =>
p.category.name.toLowerCase().includes('mobile') ||
p.name.toLowerCase().includes('iphone') ||
p.name.toLowerCase().includes('galaxy')
),
laptops: allProducts.filter(p =>
p.category.name.toLowerCase().includes('laptop') ||
p.name.toLowerCase().includes('macbook')
),
headphones: allProducts.filter(p =>
p.category.name.toLowerCase().includes('headphone') ||
p.name.toLowerCase().includes('airpods')
)
};

// Your existing functions work PERFECTLY!
loadProducts('allProducts', allProducts);
loadProducts('mobilesProducts', categorized.mobiles);
loadProducts('laptopsProducts', categorized.laptops);
loadProducts('headphonesProducts', categorized.headphones);

console.log('✅ Backend connected! Loaded:', allProducts.length, 'products');
} catch(error) {
console.error('❌ Backend Error:', error);
alert('Backend not running? Start: python manage.py runserver');
}
}

// 🔥 2. PRODUCT DETAILS FROM BACKEND
async function showProductDetails(productId) {
try {
const response = await fetch(`${API_BASE}/products/${productId}/`);
const product = await response.json();

// Your existing modal (SAME format!)
document.getElementById('modalTitle').textContent = product.name;
document.getElementById('modalImg').src = product.img;
document.getElementById('modalBrand').textContent = product.brand;
document.getElementById('modalPrice').innerHTML =
`₹${product.price.toLocaleString()}
<span style="color:#999; margin-left:10px;">₹${product.originalPrice.toLocaleString()}</span>
<span style="background:#f15b26;color:white;padding:2px 8px;border-radius:4px;font-size:12px;">${product.discount}% off</span>`;
document.getElementById('modalRating').innerHTML =
`${product.rating} ${'★'.repeat(Math.floor(product.rating))}`;
document.getElementById('modalDesc').textContent = product.desc;
document.getElementById('productModal').style.display = 'block';
} catch(error) {
console.error('Product detail error:', error);
}
}

// 🔥 3. SEARCH FROM BACKEND
async function searchProducts() {
const query = document.getElementById('searchInput').value;
if(!query) return loadAllProducts();

try {
const response = await fetch(`${API_BASE}/products/?search=${query}`);
const results = await response.json();
loadProducts('allProducts', results);
} catch(error) {
console.error('Search error:', error);
}
}

// 🔥 4. AUTO-CONNECT ON PAGE LOAD
window.addEventListener('load', function() {
if(document.getElementById('mainApp')) {
setTimeout(loadAllProducts, 500); // After login
}
});

// 🔥 5. Update your existing functions to use backend IDs
function addToCart(productId) {
// Your cart logic + backend call later
console.log('Add to cart:', productId);
// Backend cart endpoint will be added next
}
</script>