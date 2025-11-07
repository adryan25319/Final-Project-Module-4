let productsData = [];

async function loadProducts() {
  try {
    const response = await fetch("api/products.json");
    const products = await response.json();
    productsData = products;
    displayProducts(products);
  } catch (err) {
    console.error("Failed to load products:", err);
    document.getElementById("product-list").innerHTML = "<p>Failed to load products.</p>";
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(productName) {
  alert(`${productName} added to cart!`);
}

// Sort Products
document.getElementById("price-filter").addEventListener("change", (e) => {
  let sorted = [...productsData];
  const value = e.target.value;

  if (value === "low-high") sorted.sort((a, b) => a.price - b.price);
  else if (value === "high-low") sorted.sort((a, b) => b.price - a.price);

  displayProducts(sorted);
});

// Load products on page load
window.addEventListener("DOMContentLoaded", loadProducts);
