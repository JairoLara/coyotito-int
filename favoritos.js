document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    
    document.getElementById('clear-favorites').addEventListener('click', () => {
      localStorage.removeItem('favorites');
      loadFavorites(); // Recargar la lista después de vaciar
    });
  });
  
  function loadFavorites() {
    const favoritesContainer = document.getElementById('favorites');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favoritesContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos
  
    favorites.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" />
        <div class="product-info">
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <p>${product.categoria}</p>
          <button class="btn btn-danger btn-sm remove-favorite" data-index="${index}">Eliminar</button>
        </div>
      `;
      favoritesContainer.appendChild(productDiv);
    });
  
    // Agregar evento para eliminar productos individuales
    document.querySelectorAll('.remove-favorite').forEach(button => {
      button.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        removeFavorite(index);
      });
    });
  }
  
  function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites(); // Recargar la lista después de eliminar
  }

  /*back-button*/
document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});