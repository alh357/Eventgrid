// Show/Hide Professionals section based on organizer needs
const lookingForRadios = document.querySelectorAll('input[name="looking-for"]');
const professionalOptions = document.getElementById("professional-options");
const today = new Date().toISOString().split("T")[0];
let pros = "";
lookingForRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    e.preventDefault();
    if (radio.value === "yes") {
      professionalOptions.classList.remove("hidden");
    } else {
      professionalOptions.classList.add("hidden");
    }
  });
});
function generateEventId() {
  return "evt_" + Math.random().toString(36).substr(2, 9);
}
// Cloudinary upload configuration
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dvjxucepy/image/upload";
const uploadPreset = "whn4sd33";

// Function to collect form data when the form is submitted
document
  .getElementById("create-event-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect form data
    const eventName = document.getElementById("event-name").value;
    const eventDescription = document.getElementById("event-description").value;
    const dat = document.getElementById("event-date");
    dat.setAttribute("min", today);
    const eventDate = dat.value;
    const eventTime = document.getElementById("event-time").value;
    const location = document.getElementById("location").value;
    const eventAddress = document.getElementById("event-address").value;

    // Collecting selected categories (checkboxes)
    const categories1 = Array.from(
      document.querySelectorAll('input[name="categories"]:checked')
    ).map((input) => input.value);

    // Collecting event type (free, paid, or both)
    const eventIsFree = document.querySelector(
      'input[name="free-event"]:checked'
    ).value;

    // Checking if the organizers are looking for professionals
    const isLookingForProfessionals =
      document.querySelector('input[name="looking-for"]:checked').value ===
      "yes";

    // Collecting selected professionals if looking for professionals is "yes"
    let professionalsNeeded = [];
    if (isLookingForProfessionals) {
      professionalsNeeded = Array.from(
        document.querySelectorAll('input[name="professionals"]:checked')
      ).map((input) => input.value);
    }

    for (let n = 0; n < professionalsNeeded.length; n++) {
      if (n === 2) {
        pros += "....,";
        break;
      }
      pros += `${professionalsNeeded[n]}, `;
    }
    // Get the image file from the input
    const imageFile = document.getElementById("event-image").files[0];

    try {
      // Step 1: Upload image directly to Cloudinary (or another service)
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset);

      const imageResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });
      const imageData = await imageResponse.json();
      console.log(imageData);

      // Step 2: Generate a unique event ID
      const eventId = generateEventId();

      // Step 3: Create the event data object with the image URL
      console.log(pros);
      const eventData = {
        eventId: eventId,
        name: eventName,
        description: eventDescription,
        date: eventDate,
        eventType: eventIsFree,
        time: eventTime,
        location: location,
        imageUrl: imageData.secure_url,
        interested: 0,
        hiring: isLookingForProfessionals,
        hiring1: professionalsNeeded,
        lookingFor: pros.slice(0, pros.length - 2), //pros,
        categories: categories1, // URL of the uploaded image
      };
      pros = "";
      console.log("eevent", eventData);

      //      Step 4: Send the event data to the backend
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
      console.log("Event created:", result);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  });
