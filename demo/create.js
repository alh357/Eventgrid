// Show/Hide Professionals section based on organizer needs
const lookingForRadios = document.querySelectorAll('input[name="looking-for"]');
const professionalOptions = document.getElementById("professional-options");

lookingForRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "yes") {
      professionalOptions.classList.remove("hidden");
    } else {
      professionalOptions.classList.add("hidden");
    }
  });
});
