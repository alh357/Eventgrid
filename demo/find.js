// Show/Hide Professionals section based on organizer needs
const lookingForRadios = document.querySelectorAll('input[name="looking-for"]');
const professionalOptions = document.getElementById("professional-options");
const events = document.querySelector(".event-cards");
const locationSelect = document.getElementById("location");
const userId = localStorage.getItem("userId");
const customCategory = document.getElementById("customCategory");

const categoryCheckboxes = document.querySelectorAll(
  'input[name="categories"]'
);

const eventTypeCheckboxes = document.querySelectorAll(
  'input[name="event-type"]'
);
const hiringCheckbox = document.querySelector('input[name="looking-for"]');

lookingForRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "yes") {
      professionalOptions.classList.remove("hidden");
    } else {
      professionalOptions.classList.add("hidden");
    }
  });
});

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // assuming the response is JSON
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Your code here will run after the DOM is fully loaded

  lists = getData("/events").then((data) => {
    //list = data.events;
    console.log(data);
    data.forEach((list, n) => {
      // none = 'style="display: none"';
      // if (list.hiring) {
      //   none = "";
      // }
      a = document.createElement("div");
      a.id = list.eventId;
      a.classList.add("event-card");
      a.innerHTML = `
      <img src="${list.imageUrl}" class="img" alt="Event Image" />
      <div class="event-info">
        <h3>${list.name}</h3>
        <p class="info">
          ${list.description}
        </p>
        <p class="info-span">Date: ${list.date.slice(0, 10)}, ${list.time}</p>
      <p class="info" >
              Looking for:
              <span class="info-span">${list.lookingFor}</span>
            </p>
        <p class="info">
          <span class="info-span">${list.interested}</span> People Interested
        </p>
      </div>
      <div class="checkbox-wrapper">
  <input type="checkbox" id="interested${n}" class="interested-checkbox" />
  <label for="interested${n}" class="checkbox-label">☆ I'm Interested</label>
</div>
      <div class="tick">
        <a href=""><img src="${list.eventType}.png" alt="" /></a>
      </div>
      <div class="cal">
        <a href=""><img src="cal.png" alt="" /></a>
      </div>
     
    `;

      events.appendChild(a);
      if (list.interestedPeople.includes(userId)) {
        document.querySelector(`#interested${n}`).checked = true;
        console.log(list.interestedPeople);
      }
    });
    document.querySelectorAll(".interested-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", async function () {
        console.log("hgf");

        // Redirect to login if user is not logged in
        if (!userId) {
          localStorage.setItem("loc", "/find-events");
          window.location.href = "/login"; // Redirect to login page
          return;
        }

        // Get the event ID from the parent event card's id attribute
        const eventId = this.closest(".event-card").id;

        // Set the URL based on checkbox state
        const url = this.checked
          ? `/api/interested/${eventId}/${userId}`
          : `/api/uninterested/${eventId}/${userId}`;

        try {
          const response = await fetch(url);
          const result = await response.json();

          if (response.ok) {
            console.log(result.message);
            // Optionally, update the UI with the new interested count if returned
          } else {
            console.error("Error:", result.error);
          }
        } catch (error) {
          console.error("Request failed:", error);
        }
      });
    });
  });
});

// Function to collect preferences and send the request
async function fetchFilteredEvents(arra = []) {
  // Collect selected location
  const location = locationSelect.value;
  events.innerHTML = "";
  // Collect selected categories
  const categories = Array.from(categoryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  // Add event listener to customCategory input
  if (arra.length > 0) {
    arra.forEach((customCategory) => {
      if (!categories.includes(customCategory)) {
        categories.push(customCategory);
      }
    });
  }
  //js = { true: true, false: false };
  // Collect selected event types (free, paid)
  const eventTypes = Array.from(eventTypeCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  // Construct query parameters based on preferences
  const queryParams = new URLSearchParams();
  queryParams.append("location", location);
  if (categories.length > 0)
    queryParams.append("categories", categories.join(","));
  if (eventTypes.length > 0)
    queryParams.append("eventType", eventTypes.join(","));
  if (hiringCheckbox.checked) {
    queryParams.append("hiring", true);
  }

  console.log(queryParams);
  try {
    // Fetch events based on preferences
    const response = await fetch(
      `/api/events/search?${queryParams.toString()}`
    );
    if (!response.ok) throw new Error("Failed to fetch events");

    const data = await response.json();
    console.log(data);
    // Clear previous events and display filtered events
    data.forEach((list, n) => {
      // none = 'style="display: none"';
      // if (list.hiring) {
      //   none = "";
      // }
      a = document.createElement("div");
      a.id = list.eventId;
      a.classList.add("event-card");
      a.innerHTML = `
      <img src="${list.imageUrl}" class="img" alt="Event Image" />
      <div class="event-info">
        <h3>${list.name}</h3>
        <p class="info">
          ${list.description}
        </p>
        <p class="info-span">Date: ${list.date.slice(0, 10)}, ${list.time}</p>
      <p class="info" >
              Looking for:
              <span class="info-span">${list.lookingFor}</span>
            </p>
        <p class="info">
          <span class="info-span">${list.interested}</span> People Interested
        </p>
      </div>
<div class="checkbox-wrapper">
  <input type="checkbox" id="interested${n}" class="interested-checkbox" />
  <label for="interested${n}" class="checkbox-label">☆ I'm Interested</label>
</div>
      <div class="tick">
        <a href=""><img src="${list.eventType}.png" alt="" /></a>
      </div>
      <div class="cal">
        <a href=""><img src="cal.png" alt="" /></a>



      </div>
      <div class="id" style="display: none">${list.eventId}</div>
    `;
      events.appendChild(a);
      if (list.interestedPeople.includes(userId)) {
        document.querySelector(`#interested${n}`).checked = true;
        console.log(list.interestedPeople);
      }
    });
    document.querySelectorAll(".interested-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", async function () {
        console.log("hgf");

        // Redirect to login if user is not logged in
        if (!userId) {
          localStorage.setItem("loc", "/find-events");
          window.location.href = "/login"; // Redirect to login page
          return;
        }

        // Get the event ID from the parent event card's id attribute
        const eventId = this.closest(".event-card").id;

        // Set the URL based on checkbox state
        const url = this.checked
          ? `/api/interested/${eventId}/${userId}`
          : `/api/uninterested/${eventId}/${userId}`;

        try {
          const response = await fetch(url);
          const result = await response.json();

          if (response.ok) {
            console.log(result.message);
            // Optionally, update the UI with the new interested count if returned
          } else {
            console.error("Error:", result.error);
          }
        } catch (error) {
          console.error("Request failed:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Fetch events when preferences are changed
locationSelect.addEventListener("change", fetchFilteredEvents);
categoryCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", fetchFilteredEvents)
);
eventTypeCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", fetchFilteredEvents)
);
hiringCheckbox.addEventListener("change", fetchFilteredEvents);
customCategory.addEventListener("change", fetchFilteredEvents);

const customCategoryInput = document.getElementById("customCategory");
customCategoryInput.addEventListener("input", () => {
  const arra = customCategoryInput.value
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);
  console.log(arra);
  fetchFilteredEvents(arra);

  // Update the entire search query with updated categories
});
