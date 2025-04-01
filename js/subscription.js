document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy")

  // Intersection Observer for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src // Load actual image
        lazyImage.onload = () => {
          lazyImage.classList.add("loaded") // Fade in effect
        }
        lazyImage.classList.remove("lazy")
        observer.unobserve(lazyImage)
      }
    })
  })

  lazyImages.forEach((img) => {
    imageObserver.observe(img)
  })
})
