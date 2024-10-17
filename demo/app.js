// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Handle location change for events
const locationSelect = document.getElementById("location-select");
locationSelect.addEventListener("change", (event) => {
  document.getElementById("location").textContent =
    event.target.options[event.target.selectedIndex].text;
});
