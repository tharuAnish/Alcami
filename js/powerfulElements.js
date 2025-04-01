document.addEventListener("DOMContentLoaded", function () {
  // Animate elements when they come into view
  const animateOnScroll = function () {
    const sections = document.querySelectorAll(
      ".ingredients-section, .guarantees-section, .as-seen-section"
    )

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.85) {
        section.classList.add("animated")
      }
    })

    // Animate guarantee items with staggered delay
    const guaranteeItems = document.querySelectorAll(".guarantee-item")
    guaranteeItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.9) {
        setTimeout(() => {
          item.classList.add("animated")
        }, 150 * index)
      }
    })

    // Animate logos with staggered delay
    const logos = document.querySelectorAll(".as-seen-logos img")
    logos.forEach((logo, index) => {
      const logoTop = logo.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (logoTop < windowHeight * 0.9) {
        setTimeout(() => {
          logo.classList.add("animated")
        }, 120 * index)
      }
    })
  }

  // Run on load
  setTimeout(() => {
    animateOnScroll()
  }, 300)

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Button hover effects
  const buttons = document.querySelectorAll(".btn-primary")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 4px 8px rgba(219, 166, 34, 0.3)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = ""
    })
  })
})
