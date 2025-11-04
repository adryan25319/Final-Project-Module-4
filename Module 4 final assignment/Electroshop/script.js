let productsData = [];

async function loadProducts() {
  try {
    const response = await fetch("api/products.json");
    const products = await response.json();
    productsData = products;
    displayProducts(products);
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products available at this time.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}')">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(productName) {
  alert(`${productName} added to cart!`);
}

document.getElementById("price-filter").addEventListener("change", (e) => {
  const value = e.target.value;
  let sorted = [...productsData];

  if (value === "low-high") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === "high-low") {
    sorted.sort((a, b) => b.price - a.price);
  }

  displayProducts(sorted);
});

// Navigation handling
const sections = document.querySelectorAll(".content-section");
const tabs = {
  home: document.getElementById("home-tab"),
  shop: document.getElementById("shop-tab"),
  contact: document.getElementById("contact-tab")
};

Object.entries(tabs).forEach(([key, tab]) => {
  tab.addEventListener("click", () => {
    sections.forEach(s => s.style.display = "none");
    document.getElementById(`${key}-section`).style.display = "block";
    if (key === "shop") loadProducts();
  });
});

// Default to home
document.getElementById("home-section").style.display = "block";
