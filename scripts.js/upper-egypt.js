const areas = [
        { id: "jabal-al-tayr", name: "جبل الطير", count: 12, ext: "jpg" },
        { id: "al-muharraq", name: "دير المحرق", count: 10, ext: "jpg" },
        { id: "ashmounin", name: "الأشمونين", count: 3, ext: "jpg" },
        { id: "dronka", name: "العدرا درنكه", count: 11, ext: "jpg" },
        { id: "anba-srabamon", name: "دير الانبا صرابامون", count: 9, ext: "jpg" },
        // { id: "historical", name: "المناطق التاريخية", count: 5, ext: "jpg" },
      ];

      const galleryImages = [];

          galleryImages.push({
            id: galleryImages.length + 1,
            cat: "historical",
            src: `images/upper/gallery/historical/5.jpg`,
            title: "دير السحابه",
          });
      
          galleryImages.push({
            id: galleryImages.length + 1,
            cat: "historical",
            src: `images/upper/gallery/historical/1.jpeg`,
            title: "البهنسا",
          });
        

        for (let i = 2; i <= 3; i++) {
          galleryImages.push({
            id: galleryImages.length + 1,
            cat: "historical",
            src: `images/upper/gallery/historical/${i}.jpeg`,
            title: "دير ابوحنس",
          });
        }
        galleryImages.push({
            id: galleryImages.length + 1,
            cat: "historical",
            src: `images/upper/gallery/historical/4.png`,
            title: "دير ابوحنس",
          });

      areas.forEach((area) => {
        for (let i = 1; i <= area.count; i++) {
          galleryImages.push({
            id: galleryImages.length + 1,
            cat: area.id,
            src: `images/upper/gallery/${area.id}/${i}.${area.ext}`,
            title: area.name,
          });
        }
      });

      const GALLERY_CONFIG = {
        initial: 12,
        increment: 12,
        grid: document.getElementById("pro-gallery-grid"),
        loadBtn: document.getElementById("btn-load-more"),
        filters: document.querySelectorAll("#gallery-filters .filter-btn"),
      };

      let galleryState = {
        limit: GALLERY_CONFIG.initial,
        category: "all",
      };

      function renderGallery() {
        const filtered =
          galleryState.category === "all"
            ? galleryImages
            : galleryImages.filter((img) => img.cat === galleryState.category);

        const visible = filtered.slice(0, galleryState.limit);

        GALLERY_CONFIG.grid.innerHTML = visible
          .map(
            (img) => `
      <div class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
        <a href="${img.src}" data-lightbox="region-gallery" data-title="${img.title}">
          <div class="aspect-[4/5] overflow-hidden">
            <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <h4 class="text-white text-xl font-bold mb-1">${img.title}</h4>
          </div>
        </a>
      </div>
    `
          )
          .join("");

        GALLERY_CONFIG.loadBtn.parentElement.style.display =
          galleryState.limit >= filtered.length ? "none" : "block";
      }

      GALLERY_CONFIG.filters.forEach((btn) => {
        btn.addEventListener("click", () => {
          GALLERY_CONFIG.filters.forEach((b) => {
            b.classList.remove(
              "active",
              "bg-primary",
              "text-white",
              "border-primary"
            );
            b.classList.add("border-gray-200", "text-gray-600");
          });
          btn.classList.add(
            "active",
            "bg-primary",
            "text-white",
            "border-primary"
          );
          btn.classList.remove("border-gray-200", "text-gray-600");

          galleryState.category = btn.dataset.category;
          galleryState.limit = GALLERY_CONFIG.initial;
          renderGallery();
        });
      });

      GALLERY_CONFIG.loadBtn.addEventListener("click", () => {
        galleryState.limit += GALLERY_CONFIG.increment;
        renderGallery();
      });

      document.addEventListener("DOMContentLoaded", renderGallery);