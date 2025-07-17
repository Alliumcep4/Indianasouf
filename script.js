document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu-bars');
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header .navbar a');

  // Toggle menú hamburguesa
  menu.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic cierre el menú inmediatamente
    navbar.classList.toggle('active');

    if (navbar.classList.contains('active')) {
      menu.classList.remove('fa-bars');
      menu.classList.add('fa-times');
    } else {
      menu.classList.remove('fa-times');
      menu.classList.add('fa-bars');
    }
  });

  // Evita que clic dentro del navbar cierre el menú
  navbar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Cerrar menú si se hace clic fuera del navbar y del menú
  document.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menu.classList.remove('fa-times');
      menu.classList.add('fa-bars');
    }
  });

  // Cerrar menú y actualizar enlaces activos al hacer scroll
  window.addEventListener('scroll', () => {
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menu.classList.remove('fa-times');
      menu.classList.add('fa-bars');
    }

    let scrollY = window.scrollY;

    sections.forEach(sec => {
      const height = sec.offsetHeight;
      const offset = sec.offsetTop - 150;
      const id = sec.getAttribute('id');

      if (scrollY >= offset && scrollY < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(id)) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Búsqueda
  const searchIcon = document.querySelector('#search-icon');
  const searchForm = document.querySelector('#search-form');
  const searchClose = document.querySelector('#close');
  const searchBox = document.querySelector('#search-box');

  searchIcon.addEventListener('click', () => {
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
      searchBox.focus();
    }
  });

  searchClose.addEventListener('click', () => {
    searchForm.classList.remove('active');
    searchBox.value = '';
    showAllSections();
  });

  function showAllSections() {
    document.querySelectorAll('.searchable-section').forEach(el => {
      el.style.display = 'block';
    });
  }

  searchBox.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const elements = document.querySelectorAll('.searchable-section');

    elements.forEach(el => {
      const text = el.innerText.toLowerCase();
      el.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });

    if (searchTerm === '') showAllSections();
  });

  // Cerrar menú al hacer clic en enlace de navegación (en móvil)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menu.classList.remove('fa-times');
      menu.classList.add('fa-bars');
    });
  });
});
