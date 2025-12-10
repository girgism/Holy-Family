document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      // Close mobile menu if open
      if (mobileMenu) {
        mobileMenu.classList.add("hidden")
      }
    })
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })

  // Single Card Carousel functionality
  const carouselWrapper = document.querySelector(".regions-carousel-wrapper")
  const carouselSlides = document.querySelectorAll(".regions-carousel-slide")
  const carouselDots = document.querySelectorAll(".regions-carousel-dot")
  const prevButton = document.querySelector(".regions-carousel-prev")
  const nextButton = document.querySelector(".regions-carousel-next")
  const currentSlideElement = document.querySelector(".current-slide")
  const totalSlidesElement = document.querySelector(".total-slides")

  if (carouselWrapper && carouselSlides.length > 0) {
    let currentSlide = 0
    let autoSlideInterval
    const totalSlides = carouselSlides.length

    // Set total slides in counter
    if (totalSlidesElement) {
      totalSlidesElement.textContent = totalSlides.toString()
    }

    // Function to update carousel
    function updateCarousel() {
      // Remove active class from all slides
      carouselSlides.forEach((slide, index) => {
        slide.classList.remove("active", "prev")

        if (index === currentSlide) {
          slide.classList.add("active")
        } else if (index < currentSlide) {
          slide.classList.add("prev")
        }
      })

      // Update dots
      carouselDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add("active")
          dot.classList.remove("bg-gray-300")
          dot.classList.add("bg-secondary")
        } else {
          dot.classList.remove("active")
          dot.classList.remove("bg-secondary")
          dot.classList.add("bg-gray-300")
        }
      })

      // Update counter
      if (currentSlideElement) {
        currentSlideElement.textContent = (currentSlide + 1).toString()
      }
    }

    // Function to go to next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides
      updateCarousel()
    }

    // Function to go to previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateCarousel()
    }

    // Function to go to specific slide
    function goToSlide(index) {
      currentSlide = index
      updateCarousel()
    }

    // Add click event to dots
    carouselDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index)
        resetAutoSlide()
      })
    })

    // Add click events to navigation buttons
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        prevSlide()
        resetAutoSlide()
      })
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextSlide()
        resetAutoSlide()
      })
    }

    // Auto-slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 50000) // Change slide every 5 seconds
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval)
      startAutoSlide()
    }

    // Touch/swipe functionality
    let touchStartX = 0
    let touchEndX = 0

    carouselWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
      clearInterval(autoSlideInterval)
    })

    carouselWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
      startAutoSlide()
    })

    function handleSwipe() {
      const swipeThreshold = 50
      const diff = touchStartX - touchEndX

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide()
        } else {
          // Swipe right - previous slide
          prevSlide()
        }
      }
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
        resetAutoSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
        resetAutoSlide()
      }
    })

    // Initialize carousel
    updateCarousel()
    startAutoSlide()

    // Pause auto-slide when hovering over carousel
    const carouselContainer = document.querySelector(".regions-carousel-container")
    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval)
      })

      carouselContainer.addEventListener("mouseleave", () => {
        startAutoSlide()
      })
    }
  }
})

// Function to scroll to regions section
function scrollToRegions() {
  document.getElementById("regions").scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function zoomIn(img) {
  img.style.transform = "scale(1.5)";
  img.style.transition = "transform 0.5s ease-in-out";
}


function zoomOut(img) {
  img.style.transform = "scale(1)";
  img.style.transition = "transform 0.5s ease-in-out";
  setTimeout(() => {
    img.style.transform = "";
    img.style.transition = "";
  }, 500)
}
