// Toggle Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const side = document.querySelector(".side");
let scrolle = function () {};
const toop = document.querySelector(".top");

hamburger.addEventListener("click", () => {
  //navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  side.classList.toggle("active");
});

// Handle location change for events

// locationSelect.addEventListener("change", (event) => {
//   document.getElementById("location").textContent =
//     event.target.options[event.target.selectedIndex].text;
// });

window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    toop.classList.add("top1");
  } else {
    toop.classList.remove("top1");
  }
});

window.addEventListener("scroll", function () {
  toop.classList.remove("trans");
  clearTimeout(scrolle);

  scrolle = setTimeout(function () {
    if (window.scrollY > 380) {
      toop.classList.add("trans");
      //console.log(window.scrollY);
    } else {
      toop.classList.remove("trans");
    }
  }, 5000);

  window.addEventListener("mousemove", function () {
    toop.classList.remove("trans");
    clearTimeout(scrolle);
    scrolle = setTimeout(function () {
      if (window.scrollY > 380) {
        toop.classList.add("trans");
        console.log(window.scrollY);
      } else {
        toop.classList.remove("trans");
      }
    }, 5000);
  });
});

toop.addEventListener("click", function (e) {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
