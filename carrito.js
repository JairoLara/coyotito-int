document.addEventListener('click', function(event) {
  const dropdownToggle = document.getElementById('dropdown-toggle');
  const dropdownContent = document.querySelector('.dropdown-content');
  const isClickInside = dropdownContent.contains(event.target) || dropdownToggle.contains(event.target);

  if (!isClickInside) {
      dropdownToggle.checked = false;
  }
});
/*back-button*/
document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});

/*carrito*/
async function getProductById(id) {
  try {
      const response = await fetch(`https://66a189667053166bcabf3141.mockapi.io/producs/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const product = await response.json();
      return product;
  } catch (error) {
      console.error('Error fetching product:', error);
      return null;
  }
}

async function addToCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === itemId);

  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      const product = await getProductById(itemId);
      if (product) {
          product.quantity = 1; 
          cart.push(product);
      }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === itemId);

  if (itemIndex > -1) {
      const item = cart[itemIndex];
      if (item.quantity > 1) {
          item.quantity -= 1;
      } else {
          cart.splice(itemIndex, 1);
      }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

async function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountElement = document.getElementById('total-amount');
  const totalItemsElement = document.getElementById('total-items');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
      totalAmountElement.textContent = '$0.00';
      totalItemsElement.textContent = 'Productos (0): $0.00';
      return;
  }

  let totalAmount = 0;
  let totalItems = 0;

  for (const item of cart) {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;

      const detailsDiv = document.createElement('div');
      detailsDiv.classList.add('cart-item-details');

      const name = document.createElement('h4');
      name.textContent = item.name;

      const price = document.createElement('p');
      price.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      const quantity = document.createElement('p');
      quantity.textContent = `Cantidad: ${item.quantity}`;

      detailsDiv.appendChild(name);
      detailsDiv.appendChild(price);
      detailsDiv.appendChild(quantity);

      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('cart-item-actions');

      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';
      decrementButton.classList.add('btn', 'Eliminar');
      decrementButton.onclick = () => removeFromCart(item.id);

      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';
      incrementButton.classList.add('btn', 'Agregar');
      incrementButton.onclick = () => addToCart(item.id);

      actionsDiv.appendChild(decrementButton);
      actionsDiv.appendChild(incrementButton);

      cartItemDiv.appendChild(img);
      cartItemDiv.appendChild(detailsDiv);
      cartItemDiv.appendChild(actionsDiv);

      cartItemsContainer.appendChild(cartItemDiv);

      totalAmount += item.price * item.quantity;
      totalItems += item.quantity;
  }

  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
  totalItemsElement.textContent = `Productos (${totalItems}): $${totalAmount.toFixed(2)}`;
}

function emptyCart() {
  localStorage.removeItem('cart');
  displayCart();
  alert('El carrito ha sido vaciado.');
}

document.getElementById('empty-cart').addEventListener('click', emptyCart);
document.getElementById('continue-purchase').addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

document.addEventListener('DOMContentLoaded', displayCart);