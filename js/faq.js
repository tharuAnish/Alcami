document.addEventListener("DOMContentLoaded", function () {
  // Get all FAQ question elements
  const faqQuestions = document.querySelectorAll(".faq-question")

  // Add click event listeners to each FAQ question
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      // Get the parent FAQ item
      const faqItem = this.parentElement

      // Toggle the active class on the FAQ item
      faqItem.classList.toggle("active")

      // Find the answer element within this FAQ item
      const answer = faqItem.querySelector(".faq-answer")

      // If the FAQ item is active, set the height to the scrollHeight
      // Otherwise, set the height to 0
      if (faqItem.classList.contains("active")) {
        answer.style.height = answer.scrollHeight + "px"
      } else {
        answer.style.height = "0"
      }

      // Close other FAQ items (optional - for accordion behavior)
      const otherFaqItems = document.querySelectorAll(".faq-item")
      otherFaqItems.forEach((item) => {
        if (item !== faqItem && item.classList.contains("active")) {
          item.classList.remove("active")
          item.querySelector(".faq-answer").style.height = "0"
        }
      })
    })
  })
})
