/*back-button*/
document.getElementById('back-button').addEventListener('click', () => {
  window.history.back();
});
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
  /*usuario*/
  document.addEventListener('click', function(event) {
    const dropdownToggle = document.getElementById('dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');
    const isClickInside = dropdownContent.contains(event.target) || dropdownToggle.contains(event.target);
  
    if (!isClickInside) {
        dropdownToggle.checked = false;
    }
  });