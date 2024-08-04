/*categorias*/
document.getElementById('categorias').addEventListener('click', function() {
  const categoriasMenu = document.getElementById('categoriasMenu');
  if (categoriasMenu.style.display === 'none') {
      categoriasMenu.style.display = 'block';
  } else {
      categoriasMenu.style.display = 'none';
  }
});

document.addEventListener('click', function(event) {
  const categoriasMenu = document.getElementById('categoriasMenu');
  const categorias = document.getElementById('categorias');
  if (!categorias.contains(event.target) && !categoriasMenu.contains(event.target)) {
      categoriasMenu.style.display = 'none';
  }
});

document.querySelectorAll('.categoriaopc').forEach(button => {
  button.addEventListener('click', function() {
    const categoria = this.getAttribute('categoria');
    updateHeaderText(categoria);
    if (categoria === 'Todos') {
      displayProducts(allProducts, 'todosproducts');
    } else {
      const filteredProducts = allProducts.filter(product => product.categoria === categoria);
      displayProducts(filteredProducts, 'todosproducts');
    }
  });
});

function updateHeaderText(categoria) {
  const header = document.getElementById('productostod');
  header.textContent = categoria.toUpperCase();
}
/*usuario*/
document.addEventListener('click', function(event) {
  const dropdownToggle = document.getElementById('dropdown-toggle');
  const dropdownContent = document.querySelector('.dropdown-content');
  const isClickInside = dropdownContent.contains(event.target) || dropdownToggle.contains(event.target);

  if (!isClickInside) {
      dropdownToggle.checked = false;
  }
});

/*Carrucel*/
let currentIndex = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slides img').length;

  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 3000); // Cambia de imagen cada 3 segundos
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
  startSlideShow();
});

/*Productos*/
let allProducts = [];

fetch('https://66a189667053166bcabf3141.mockapi.io/producs')
  .then(response => response.json())
  .then(products => {
    allProducts = products; 
    displayProductsMV(products, 'products', 4); 
    displayProducts(products, 'todosproducts'); 
  })
  .catch(error => console.error('Error fetching products:', error));

document.querySelectorAll('.categoriaopc').forEach(button => {
    button.addEventListener('click', function() {
        const categoria = this.getAttribute('categoria');
        if (categoria === 'Todos') {
            displayProducts(allProducts, 'todosproducts');
        } else {
            const filteredProducts = allProducts.filter(product => product.categoria === categoria);
            displayProducts(filteredProducts, 'todosproducts');
        }
    });
});

function displayProducts(products, containerId) {
  const productContainer = document.getElementById(containerId);
  productContainer.innerHTML = '';
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.addEventListener('click', () => viewProductDetails(product));
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const name = document.createElement('h4');
    name.textContent = product.name;
    const price = document.createElement('p');
    price.textContent = `$${product.price}`;
    const categoria = document.createElement('p');
    categoria.textContent = `${product.categoria}`;
    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.classList.add('boton-agregar');
    addToCartBtn.addEventListener('click', () => addToCart(product));
    const addToFavoritesBtn = document.createElement('button');
    addToFavoritesBtn.textContent = 'Agregar a favoritos';
    addToFavoritesBtn.classList.add('boton-favoritos');
    addToFavoritesBtn.addEventListener('click', () => addToFavorites(product));
    productInfo.appendChild(name);
    productInfo.appendChild(price);
    productInfo.appendChild(categoria);
    productInfo.appendChild(addToCartBtn);
    productInfo.appendChild(addToFavoritesBtn);
    productDiv.appendChild(img);
    productDiv.appendChild(productInfo); 
    productContainer.appendChild(productDiv);
  });
}

function displayProductsMV(products, containerId, limit = null) {
  const productContainer = document.getElementById(containerId);
  productContainer.innerHTML = '';
  const productsToShow = limit ? products.slice(0, limit) : products;
  productsToShow.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.addEventListener('click', () => viewProductDetails(product));
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const name = document.createElement('h4');
    name.textContent = product.name;
    const price = document.createElement('p');
    price.textContent = `$${product.price}`; 
    const categoria = document.createElement('p');
    categoria.textContent = `${product.categoria}`;
    const addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Agregar al carrito';
    addToCartBtn.classList.add('boton-agregar');
    addToCartBtn.addEventListener('click', () => addToCart(product));
    const addToFavoritesBtn = document.createElement('button');
    addToFavoritesBtn.textContent = 'Agregar a favoritos';
    addToFavoritesBtn.classList.add('boton-favoritos');
    addToFavoritesBtn.addEventListener('click', () => addToFavorites(product));
    productInfo.appendChild(name);
    productInfo.appendChild(price);
    productInfo.appendChild(categoria);
    productInfo.appendChild(addToCartBtn);
    productInfo.appendChild(addToFavoritesBtn);
    productDiv.appendChild(img);
    productDiv.appendChild(productInfo);
    productContainer.appendChild(productDiv);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Verificar si el producto ya está en el carrito
  if (cart.some(item => item.id === product.id)) {
    alert(`${product.name} ya está en el carrito`);
    return; // Salir de la función si el producto ya está en el carrito
  }
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} ha sido añadido al carrito`);
}

function addToFavorites(product) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(product);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert(`${product.name} ha sido añadido a favoritos`);
}

function viewProductDetails(product) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'producto.html';
}

const viewCartBtn = document.getElementById('view-cart');
viewCartBtn.addEventListener('click', () => {
  window.location.href = 'carrito.html';
});

/*perfil*/

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    searchAPI(query);
});

function searchAPI(query) {
    fetch('https://66a189667053166bcabf3141.mockapi.io/producs')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
            displayResults(filteredData);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>ID: ${item.id}</p>
        `;
        resultsContainer.appendChild(div);
    });
}