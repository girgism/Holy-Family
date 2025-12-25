const galleryImagesMaadi = [
    { id: 2, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/2.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 4, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/4.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 5, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/5.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 7, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/7.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 8, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/8.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 10, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/10.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 11, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/11.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 12, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/12.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 13, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/13.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 14, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/14.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 15, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/15.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 16, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/16.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 17, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/17.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 18, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/18.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 19, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/19.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 21, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/21.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 22, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/22.jpg', title: 'كنيسة العدرا المعادى', desc: '' },
    { id: 23, cat: 'new-cairo', src: 'images/cairo-gallery/maadi/23.jpg', title: 'كنيسة العدرا المعادى', desc: '' },

    { id: 23, cat: 'new-cairo', src: 'images/cairo-gallery', title: 'كنيسة العدرا المعادى', desc: '' },
  ];

  const GALLERY_CONFIG = {
    initial: 12,
    increment: 12,
    grid: document.getElementById('pro-gallery-grid'),
    loadBtn: document.getElementById('btn-load-more'),
    filters: document.querySelectorAll('#gallery-filters .filter-btn')
  };

  let galleryState = {
    limit: GALLERY_CONFIG.initial,
    category: 'all'
  };

  function renderGallery() {
    const filtered = galleryState.category === 'all' 
      ? galleryImagesMaadi 
      : galleryImagesMaadi.filter(img => img.cat === galleryState.category);
    
    const visible = filtered.slice(0, galleryState.limit);
    
    GALLERY_CONFIG.grid.innerHTML = visible.map(img => `
      <div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 fade-in border border-gray-100">
        <a href="${img.src}" data-lightbox="cairo-full-gallery" data-title="${img.title} - ${img.desc}">
          <div class="aspect-[4/5] overflow-hidden">
            <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <span class="text-orange-300 text-xs font-bold uppercase tracking-wider mb-1">${img.cat}</span>
            <h4 class="text-white text-xl font-bold mb-1">${img.title}</h4>
            <p class="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">${img.desc}</p>
          </div>
        </a>
      </div>
    `).join('');

    GALLERY_CONFIG.loadBtn.parentElement.style.display = galleryState.limit >= filtered.length ? 'none' : 'block';
  }

  GALLERY_CONFIG.filters.forEach(btn => {
    btn.addEventListener('click', () => {
      GALLERY_CONFIG.filters.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white', 'border-primary');
        b.classList.add('border-gray-200', 'text-gray-600');
      });
      btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary');
      btn.classList.remove('border-gray-200', 'text-gray-600');
      
      galleryState.category = btn.dataset.category;
      galleryState.limit = GALLERY_CONFIG.initial;
      renderGallery();
    });
  });

  GALLERY_CONFIG.loadBtn.addEventListener('click', () => {
    galleryState.limit += GALLERY_CONFIG.increment;
    renderGallery();
  });

  renderGallery();
