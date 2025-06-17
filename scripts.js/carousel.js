document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Carousel functionality
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".carousel-dot")

  // If there are no slides, exit early
  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Add active class to current slide and dot
    slides[index].classList.add("active")
    dots[index].classList.add("active")

    // Update current slide index
    currentSlide = index
  }

  // Function to show next slide
  function nextSlide() {
    let next = currentSlide + 1
    if (next >= slides.length) next = 0
    showSlide(next)
  }

  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  // Stop slideshow
  function stopSlideshow() {
    clearInterval(slideInterval)
  }

  // Add click event to dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = Number.parseInt(this.getAttribute("data-index"))
      showSlide(slideIndex)
      stopSlideshow() // Stop automatic slideshow when user interacts
      startSlideshow() // Restart slideshow after user interaction
    })
  })

  // Add swipe functionality for mobile
  let touchStartX = 0
  let touchEndX = 0

  const carouselContainer = document.querySelector(".carousel-container")

  if (carouselContainer) {
    carouselContainer.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      false,
    )

    carouselContainer.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      false,
    )
  }

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left, show next slide
      nextSlide()
      stopSlideshow()
      startSlideshow()
    } else if (touchEndX > touchStartX) {
      // Swipe right, show previous slide
      let prev = currentSlide - 1
      if (prev < 0) prev = slides.length - 1
      showSlide(prev)
      stopSlideshow()
      startSlideshow()
    }
  }

  // Start the slideshow
  startSlideshow()
})
