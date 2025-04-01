document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Himalayan Shilajit section
  initHimalayanSection()

  // Implement lazy loading for images
  lazyLoadImages()

  // Initialize animations
  initAnimations()
})

// Initialize the Himalayan Shilajit section
function initHimalayanSection() {
  // Add click handler for the CTA button
  const ctaButton = document.querySelector(".shilajit-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      e.preventDefault()
      // You can add custom functionality here like scrolling to a shop section
      // or opening a modal with more information
      console.log("Shilajit CTA clicked")

      // For demonstration, let's add a small animation
      this.classList.add("pulse")
      setTimeout(() => {
        this.classList.remove("pulse")
      }, 500)
    })
  }

  // Add hover effects for benefit items
  const benefitItems = document.querySelectorAll(".benefit-item")
  benefitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.08)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.05)"
    })
  })
}

// Lazy loading for images
function lazyLoadImages() {
  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // If the image is in viewport
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute("data-src")

          // Replace the data-src with src
          if (src) {
            img.src = src
            img.removeAttribute("data-src")
          }

          // Stop observing the image
          observer.unobserve(img)
        }
      })
    })

    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll(
      ".himalayan-section img[data-src]"
    )
    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll(
      ".himalayan-section img[data-src]"
    )
    lazyImages.forEach((img) => {
      const src = img.getAttribute("data-src")
      if (src) {
        img.src = src
        img.removeAttribute("data-src")
      }
    })
  }
}

// Initialize animations using IntersectionObserver
function initAnimations() {
  if ("IntersectionObserver" in window) {
    // Animate elements when they come into view
    const animateObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    )

    // Observe certification icons
    const certItems = document.querySelectorAll(".cert-item")
    certItems.forEach((item, index) => {
      // Add a staggered delay
      item.style.transitionDelay = `${index * 0.1}s`
      animateObserver.observe(item)
    })

    // Observe benefit items
    const benefitItems = document.querySelectorAll(".benefit-item")
    benefitItems.forEach((item, index) => {
      // Add a staggered delay
      item.style.transitionDelay = `${index * 0.15}s`
      animateObserver.observe(item)
    })

    // Observe the Shilajit title, subtitle and image
    const titleElements = document.querySelectorAll(
      ".shilajit-title, .shilajit-subtitle, .shilajit-image"
    )
    titleElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.2}s`
      animateObserver.observe(el)
    })

    // Observe the CTA button
    const ctaButton = document.querySelector(".shilajit-button")
    if (ctaButton) {
      ctaButton.style.transitionDelay = "0.3s"
      animateObserver.observe(ctaButton)
    }
  }
}

// Add a CSS rule for the 'pulse' animation
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse {
      animation: pulse 0.5s ease-in-out;
    }
    
    .cert-item, .benefit-item, .shilajit-title, .shilajit-subtitle, .shilajit-image, .shilajit-button {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .cert-item.animate, .benefit-item.animate, .shilajit-title.animate, .shilajit-subtitle.animate, .shilajit-image.animate, .shilajit-button.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
})
