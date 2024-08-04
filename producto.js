/*usuario*/
document.addEventListener('click', function(event) {
  const dropdownToggle = document.getElementById('dropdown-toggle');
  const dropdownContent = document.querySelector('.dropdown-content');
  const isClickInside = dropdownContent.contains(event.target) || dropdownToggle.contains(event.target);

  if (!isClickInside) {
      dropdownToggle.checked = false;
  }
});

/*producto*/
document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
  });
  
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  
  if (selectedProduct) {
    document.getElementById('detail-image').src = selectedProduct.imageUrl;
    document.getElementById('detail-name').textContent = selectedProduct.name;
    document.getElementById('detail-price').textContent = `$${selectedProduct.price}`;
    document.getElementById('detail-description').textContent = selectedProduct.description;
  }
  
  document.getElementById('add-to-cart').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(selectedProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${selectedProduct.name} ha sido añadido al carrito`);
  });

  const image = document.getElementById('detail-image');
const container = document.querySelector('.image-container');

container.addEventListener('mousemove', (e) => {
  const rect = image.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const zoomed = document.createElement('div');
  zoomed.classList.add('zoomed');
  zoomed.style.backgroundImage = `url(${image.src})`;
  zoomed.style.backgroundSize = `${image.width * 2}px ${image.height * 2}px`;
  zoomed.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
  
  if (!container.contains(zoomed)) {
    container.appendChild(zoomed);
  }

  zoomed.style.display = 'block';

  container.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    zoomed.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
  });

  container.addEventListener('mouseleave', () => {
    zoomed.style.display = 'none';
  });
});