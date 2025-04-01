document.addEventListener("DOMContentLoaded", function () {
  // Product Gallery Navigation
  initProductGallery()

  // Flavor Selection
  initFlavorSelection()

  // Subscription Options
  initSubscriptionOptions()

  // Add to Cart functionality
  initAddToCart()
})

// Product Gallery functionality
function initProductGallery() {
  const mainImg = document.querySelector(".product-main-img img")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const thumbnailItems = document.querySelectorAll(".thumbnail-item")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (!mainImg || !thumbnails.length) return

  let currentIndex = 0
  const maxIndex = thumbnailItems.length - 1

  // Store all thumbnail image sources for easy access
  const thumbnailSources = []
  thumbnailItems.forEach((item) => {
    const img = item.querySelector("img")
    if (img && img.src) {
      thumbnailSources.push(img.src)
    } else {
      thumbnailSources.push("placeholder.jpg") // Fallback
    }
  })

  // Set initial image and thumbnail
  if (thumbnailSources.length > 0) {
    mainImg.src = thumbnailSources[0]
  }
  setActiveThumbnail(currentIndex)

  // Event listeners for thumbnails (dots)
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      // Direct one-to-one mapping - each dot corresponds to one image
      currentIndex = index
      updateGallery()
    })
  })

  // Event listeners for thumbnail items (actual thumbnail images)
  if (thumbnailItems.length) {
    thumbnailItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentIndex = index
        updateGallery()
      })
    })
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
      updateGallery()
    })
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
      updateGallery()
    })
  }

  // Update gallery based on current index
  function updateGallery() {
    // Always set the main image from our stored sources
    if (thumbnailSources[currentIndex]) {
      mainImg.src = thumbnailSources[currentIndex]
    }

    setActiveThumbnail(currentIndex)
  }

  // Set active thumbnail
  function setActiveThumbnail(index) {
    // Update the dots (thumbnails)
    thumbnails.forEach((thumb, i) => {
      // Direct one-to-one mapping between thumbnails and dots
      if (i === index) {
        thumb.classList.add("active")
      } else {
        thumb.classList.remove("active")
      }
    })

    // Update the thumbnail images
    if (thumbnailItems.length) {
      thumbnailItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active")
        } else {
          item.classList.remove("active")
        }
      })
    }
  }
}

// Flavor Selection functionality
function initFlavorSelection() {
  const flavorOptions = document.querySelectorAll(".flavor-option")

  if (!flavorOptions.length) return

  flavorOptions.forEach((option) => {
    const radio = option.querySelector('input[type="radio"]')

    option.addEventListener("click", () => {
      // Handle the radio button selection
      flavorOptions.forEach((opt) => {
        const optRadio = opt.querySelector('input[type="radio"]')
        if (optRadio) optRadio.checked = false
      })

      // Select current option
      if (radio) radio.checked = true

      // Update cart link when flavor changes
      updateCartLink()
    })
  })

  // Set first option as active by default
  if (flavorOptions[0]) {
    const firstRadio = flavorOptions[0].querySelector('input[type="radio"]')
    if (firstRadio) firstRadio.checked = true
  }
}

// Subscription Options functionality
function initSubscriptionOptions() {
  const subscriptionOptions = document.querySelectorAll(".subscription-option")

  if (!subscriptionOptions.length) return

  subscriptionOptions.forEach((option) => {
    const radio = option.querySelector('input[type="radio"]')
    const label = option.querySelector("label")

    if (label) {
      label.addEventListener("click", () => {
        // Select the radio button when the label is clicked
        if (radio) radio.checked = true

        // Update price display based on selection
        updatePriceDisplay()

        // Update cart link when subscription changes
        updateCartLink()
      })
    }
  })

  // Select the popular option by default if it exists
  const popularOption = document.querySelector(
    ".subscription-option.popular input[type='radio']"
  )
  if (popularOption) {
    popularOption.checked = true
  } else if (subscriptionOptions[0]) {
    const firstRadio = subscriptionOptions[0].querySelector(
      'input[type="radio"]'
    )
    if (firstRadio) firstRadio.checked = true
  }

  // Package options
  const packageOptions = document.querySelectorAll(".package-option")
  if (packageOptions.length) {
    packageOptions.forEach((option) => {
      option.addEventListener("click", () => {
        packageOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")
      })
    })

    // Select first package option by default
    if (packageOptions[0]) {
      packageOptions[0].classList.add("active")
    }
  }
}

// Function to update the cart link based on selected options
function updateCartLink() {
  // Get selected flavor
  const selectedFlavor = document.querySelector(
    ".flavor-option input[type='radio']:checked"
  )
  const flavorValue = selectedFlavor ? selectedFlavor.value : "original"

  // Get selected subscription
  const selectedSubscription = document.querySelector(
    ".subscription-option input[type='radio']:checked"
  )
  const subscriptionValue = selectedSubscription
    ? selectedSubscription.value
    : "single"

  // Generate a cart link based on selections
  const cartParams = `flavor=${flavorValue}&subscription=${subscriptionValue}`

  // Update the add to cart button's href attribute (if it's an anchor tag)
  const addToCartBtn = document.querySelector(".add-to-cart")
  if (addToCartBtn) {
    if (addToCartBtn.tagName === "A") {
      addToCartBtn.href = `/cart?add=alcami-elements&${cartParams}`
    } else {
      // Store the params as a data attribute for later use
      addToCartBtn.setAttribute("data-cart-params", cartParams)
    }
  }

  console.log(`Cart link updated: ${cartParams}`)
}

// Add to Cart functionality
function initAddToCart() {
  const addToCartBtn = document.querySelector(".add-to-cart")

  if (!addToCartBtn) return

  // Initialize the cart link
  updateCartLink()

  addToCartBtn.addEventListener("click", function (e) {
    e.preventDefault()

    // Get selected flavor
    const selectedFlavor = document.querySelector(
      ".flavor-option input[type='radio']:checked"
    )
    const flavorValue = selectedFlavor ? selectedFlavor.value : "original"
    let flavorName = "Original"

    // Find the flavor name from the selected flavor option
    if (selectedFlavor) {
      const nameElement = selectedFlavor
        .closest(".flavor-option")
        .querySelector(".flavor-name")
      if (nameElement) {
        flavorName = nameElement.textContent
      }
    }

    // Get selected subscription
    const selectedSubscription = document.querySelector(
      ".subscription-option input[type='radio']:checked"
    )
    const subscriptionValue = selectedSubscription
      ? selectedSubscription.value
      : "single"
    let subscriptionTitle = "Single Kit"

    // Find the subscription title from the selected subscription option
    if (selectedSubscription) {
      const titleElement = selectedSubscription
        .closest(".subscription-option")
        .querySelector(".subscription-title")
      if (titleElement) {
        subscriptionTitle = titleElement.textContent
      }
    }

    // Build the cart URL
    const cartUrl = `/cart?add=alcami-elements&flavor=${flavorValue}&subscription=${subscriptionValue}`

    // Simulate adding to cart - in a real site this would redirect or use AJAX
    console.log(`Added to cart: ${flavorName} - ${subscriptionTitle}`)
    console.log(`Cart URL: ${cartUrl}`)

    // Visual feedback
    const originalText = this.textContent
    this.textContent = "Added to Cart!"
    this.style.background = "var(--gradient-gold)"

    setTimeout(() => {
      this.innerHTML = `Add to Cart <i class="fas fa-arrow-right"></i>`
      this.style.background = ""
    }, 1500)
  })
}

// Helper function to update price display
function updatePriceDisplay() {
  const selectedOption = document.querySelector(".subscription-option.active")
  if (!selectedOption) return

  const subscriptionValue = selectedOption.querySelector(
    'input[type="radio"]'
  ).value
  const currentPriceElem = selectedOption.querySelector(".current-price")

  if (currentPriceElem) {
    const currentPrice = currentPriceElem.textContent

    // Update a total or summary price if it exists
    const summaryPrice = document.querySelector(".summary-price")
    if (summaryPrice) {
      summaryPrice.textContent = currentPrice
    }
  }
}
