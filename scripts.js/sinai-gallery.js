
    document.addEventListener("DOMContentLoaded", function () {
      const galleryImages = [
        // Rafah
        {
          id: 1,
          cat: "rafah",
          src: "images/sinia/7.jpeg",
          title: "رفح",
          desc: "بوابة مصر الشرقية",
        },
        // Sheikh Zuwayid (Pitulion)
        {
          id: 2,
          cat: "sheikh-zuwayid",
          src: "images/sinia/8.jpg",
          title: "الشيخ زويد",
          desc: "بيتليون القديمة",
        },
        {
          id: 8,
          cat: "sheikh-zuwayid",
          src: "images/sinia/12.jpg",
          title: "الشيخ زويد",
          desc: "بيتليون القديمة",
        },
        // Arish
        {
          id: 3,
          cat: "arish",
          src: "images/sinia/3.jpg",
          title: "العريش",
          desc: "رينوكورورا التاريخية",
        },
        // Farama (Pelusium)
        {
          id: 4,
          cat: "farama",
          src: "images/sinia/5.jpg",
          title: "الفرما",
          desc: "بيلوزيوم العريقة",
        },
        // Mahamadiya (Gara)
        {
          id: 5,
          cat: "mahamadiya",
          src: "images/sinia/6.jpg",
          title: "جارا",
          desc: "المحمدية حالياً",
        },
        // Flusiyat (Ostrakine)
        {
          id: 6,
          cat: "flusiyat",
          src: "images/sinia/9.jpg",
          title: "أوستراكين",
          desc: "الفلوسيات",
        },
        // Add more images as needed...
      ];

      let currentFilter = "all";
      let itemsToShow = 6;
      const galleryGrid = document.getElementById("gallery-grid");
      const loadMoreBtn = document.getElementById("load-more");
      const filterBtns = document.querySelectorAll(".filter-btn");

      function renderGallery() {
        const filtered = galleryImages.filter(
          (img) => currentFilter === "all" || img.cat === currentFilter
        );
        const displayed = filtered.slice(0, itemsToShow);

        galleryGrid.innerHTML = displayed
          .map(
            (img) => `
          <div class="gallery-item show group relative overflow-hidden rounded-2xl shadow-md bg-white aspect-[4/3]">
            <a href="${img.src}" data-lightbox="sinai-gallery" data-title="${img.title}">
              <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-right">
                <h4 class="text-white text-xl font-bold mb-1">${img.title}</h4>
                <p class="text-gray-200 text-sm">${img.desc}</p>
              </div>
            </a>
          </div>
        `
          )
          .join("");

        if (itemsToShow >= filtered.length) {
          loadMoreBtn.style.display = "none";
        } else {
          loadMoreBtn.style.display = "inline-block";
        }
      }

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterBtns.forEach((b) =>
            b.classList.remove("bg-primary", "text-white")
          );
          btn.classList.add("bg-primary", "text-white");
          currentFilter = btn.dataset.filter;
          itemsToShow = 6;
          renderGallery();
        });
      });

      loadMoreBtn.addEventListener("click", () => {
        itemsToShow += 6;
        renderGallery();
      });

      renderGallery();
    });
