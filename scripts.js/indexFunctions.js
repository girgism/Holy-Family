// Function to scroll to regions section
      function scrollToRegions() {
        document.getElementById("regions").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          mobileMenu.classList.add("hidden");
        });
      });

      // Fade in animation on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // Add stagger effect to region cards
      const regionCards = document.querySelectorAll("#regions .fade-in");
      regionCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });

      // Add stagger effect to service cards
      const serviceCards = document.querySelectorAll("#services .fade-in");
      serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
      });

      // Form submission
      document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
          alert("Thank you for your message! We will get back to you soon.");
          this.reset();
        } else {
          alert("Please fill in all fields.");
        }
      });

      // Form submission to save to file
        // document.getElementById('contactForm').addEventListener('submit', async function(e) {
        //     e.preventDefault();
            
        //     const name = document.getElementById('name').value;
        //     const email = document.getElementById('email').value;
        //     const message = document.getElementById('message').value;
            
        //     if (!name || !email || !message) {
        //         alert('Please fill in all fields.');
        //         return;
        //     }
            
        //     const submitButton = this.querySelector('button[type="submit"]');
        //     const originalText = submitButton.textContent;
            
        //     // Show loading state
        //     submitButton.textContent = 'Sending...';
        //     submitButton.disabled = true;
            
        //     try {
        //         const response = await fetch('/save-contact', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 name: name,
        //                 email: email,
        //                 message: message
        //             })
        //         });
                
        //         if (response.ok) {
        //             alert('Thank you for your message! We will get back to you soon.');
        //             this.reset();
        //         } else {
        //             alert('Error sending message. Please try again.');
        //         }
        //     } catch (error) {
        //         alert('Error sending message. Please try again.');
        //         console.error('Error:', error);
        //     } finally {
        //         // Restore button state
        //         submitButton.textContent = originalText;
        //         submitButton.disabled = false;
        //     }
        // });