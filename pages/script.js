document.querySelectorAll('.nav-toggle').forEach((button) => {
  const menu = button.parentElement.querySelector('.links');
  if (!menu) return;
  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
    button.textContent = isOpen ? '×' : '☰';
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Otwórz menu');
      button.textContent = '☰';
    });
  });
});
document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });


// Powiększony podgląd zdjęć galerii na podstronach.
if (document.body.classList.contains('subpage')) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'photo-lightbox';
  lightbox.setAttribute('aria-label', 'Powiększone zdjęcie');
  lightbox.innerHTML =     '<button class="lightbox-close" type="button" aria-label="Zamknij podgląd">×</button>' +
    '<img class="lightbox-image" alt="">' +
    '<p class="lightbox-caption"></p>';
  document.body.append(lightbox);

  const previewImage = lightbox.querySelector('.lightbox-image');
  const caption = lightbox.querySelector('.lightbox-caption');
  let lastFocusedImage = null;

  const openPreview = (image) => {
    lastFocusedImage = image;
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    caption.textContent = image.alt;
    lightbox.showModal();
    lightbox.querySelector('.lightbox-close').focus();
  };

  document.querySelectorAll('.photo-card img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', image.alt ? 'Powiększ zdjęcie: ' + image.alt : 'Powiększ zdjęcie');
    image.addEventListener('click', () => openPreview(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPreview(image);
      }
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    if (lastFocusedImage && lastFocusedImage.isConnected) lastFocusedImage.focus();
  });
}
