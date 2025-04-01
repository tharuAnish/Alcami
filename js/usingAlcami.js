// Basic intersection observer setup to trigger count-up
const statsSection = document.querySelector(".stats")
const countElements = document.querySelectorAll(".count-up")
let hasAnimated = false

function animateValue(el, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    el.textContent = Math.floor(progress * (end - start) + start) + "%"
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// Intersection Observer to trigger once
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true
        countElements.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target"))
          animateValue(el, 0, target, 1500)
        })
      }
    })
  },
  { threshold: 0.1 }
)

observer.observe(statsSection)
