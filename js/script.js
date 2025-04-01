document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const menuItems = document.querySelector(".menu")
  let isMenuOpen = false

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation()
      isMenuOpen = !isMenuOpen
      toggleMenu(isMenuOpen)
    })
  }

  function toggleMenu(open) {
    if (open) {
      menuItems.classList.add("active")
      menuItems.style.display = "block"
      menuItems.style.position = "absolute"
      menuItems.style.top = "80px"
      menuItems.style.left = "0"
      menuItems.style.width = "100%"
      menuItems.style.backgroundColor = "#fff"
      menuItems.style.padding = "20px"
      menuItems.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)"
      menuItems.style.zIndex = "1000"

      // Add animation
      menuItems.style.opacity = "0"
      menuItems.style.transition = "opacity 0.3s ease"

      // Style the menu items for mobile
      const menuList = menuItems.querySelector("ul")
      menuList.style.flexDirection = "column"
      menuList.style.gap = "15px"

      // Slight delay to allow animation
      setTimeout(() => {
        menuItems.style.opacity = "1"
      }, 10)

      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden"

      // Change toggle icon to X (if using font-awesome)
      mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>'
    } else {
      menuItems.style.opacity = "0"

      setTimeout(() => {
        menuItems.classList.remove("active")
        menuItems.style.display = ""
        menuItems.style.position = ""
        menuItems.style.top = ""
        menuItems.style.left = ""
        menuItems.style.width = ""
        menuItems.style.backgroundColor = ""
        menuItems.style.padding = ""
        menuItems.style.boxShadow = ""
        menuItems.style.zIndex = ""
        menuItems.style.transition = ""

        // Restore body scrolling
        document.body.style.overflow = ""

        // Change toggle icon back to bars
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }, 300)
    }
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      isMenuOpen &&
      !menuItems.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      isMenuOpen = false
      toggleMenu(false)
    }
  })

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      isMenuOpen = false
      toggleMenu(false)
    }
  })

  // Dropdown functionality for Shop menu
  const dropdown = document.querySelector(".dropdown")
  if (dropdown) {
    dropdown.addEventListener("click", function (e) {
      // Only prevent default on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault()
        // Toggle dropdown menu
        this.classList.toggle("expanded")

        const dropdownMenu = this.querySelector(".dropdown-menu")
        if (this.classList.contains("expanded")) {
          dropdownMenu.style.display = "block"
        } else {
          dropdownMenu.style.display = ""
        }
      }
    })

    // On desktop, handle hover state manually to make the experience smoother
    if (window.innerWidth > 768) {
      dropdown.addEventListener("mouseenter", function () {
        this.classList.add("expanded")
      })

      dropdown.addEventListener("mouseleave", function () {
        this.classList.remove("expanded")
      })
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })

        // Close mobile menu after clicking a link
        if (isMenuOpen) {
          isMenuOpen = false
          toggleMenu(false)
        }
      }
    })
  })

  // Add hover effect to buttons
  const buttons = document.querySelectorAll(".cta-button a, .shop-button a")
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
