const userId = localStorage.getItem("userId");
const locationSelect = document.querySelectorAll(".location-select");
const cards = document.querySelectorAll(".event-cards");

locationSelect.forEach((i, oj) => {
  i.addEventListener("change", async (event) => {
    document.querySelectorAll(".location")[oj].textContent =
      event.target.options[event.target.selectedIndex].text;
    console.log(oj);
    cards[oj].innerHTML = "";
    try {
      const response = await fetch(`/events/locations${oj}/${i.value}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      console.log(data);
      data.forEach((list, n) => {
        // none = 'style="display: none"';
        // if (list.hiring) {
        //   none = "";
        // }
        if (n < 8) {
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
  <input type="checkbox" id="interested1${n}" class="interested-checkbox" />
  <label for="interested1${n}" class="checkbox-label">☆ I'm Interested</label>
</div>
        <div class="tick">
          <a href=""><img src="${list.eventType}.png" alt="" /></a>
        </div>
        <div class="cal">
          <a href=""><img src="cal.png" alt="" /></a>
        </div>
        <div class="id" style="display: none">${list.eventId}</div>
      `;
          cards[oj].appendChild(a);
          if (list.interestedPeople.includes(userId)) {
            document.querySelector(`#interested1${n}`).checked = true;
            console.log(list.interestedPeople);
          }
        }
      });
      document.querySelectorAll(".interested-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", async function () {
          console.log("hgf");

          // Redirect to login if user is not logged in
          if (!userId) {
            localStorage.setItem("loc", "/");
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
      // Process and display the events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  });
});

// locationSelect.forEach((i, oj) => {
//   i.addEventListener("change", (event) => {
//     document.querySelectorAll(".location")[oj].textContent =
//       event.target.options[event.target.selectedIndex].text;
//     console.log(oj);
//   });
// });

document.addEventListener("DOMContentLoaded", async () => {
  // Function to fetch and display events based on the selected location

  // Initial request for the default location when the page loads
  try {
    const response = await fetch(
      `/events/locations0/${locationSelect[0].value}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    console.log(data);
    data.forEach((list, n) => {
      // none = 'style="display: none"';
      // if (list.hiring) {
      //   none = "";
      // }
      if (n < 8) {
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
  <input type="checkbox" id="interested2${n}" class="interested-checkbox" />
  <label for="interested2${n}" class="checkbox-label">☆ I'm Interested</label>
</div>
      <div class="tick">
        <a href=""><img src="${list.eventType}.png" alt="" /></a>
      </div>
      <div class="cal">
        <a href=""><img src="cal.png" alt="" /></a>
      </div>
      <div class="id" style="display: none">${list.eventId}</div>
    `;
        cards[0].appendChild(a);
        if (list.interestedPeople.includes(userId)) {
          document.querySelector(`#interested2${n}`).checked = true;
          console.log(list.interestedPeople);
        }
      }
    });
    document.querySelectorAll(".interested-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", async function () {
        console.log("hgf");

        // Redirect to login if user is not logged in
        if (!userId) {
          localStorage.setItem("loc", "/");
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
    // Process and display the events
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  // Event listener for location dropdown change
  try {
    const response = await fetch(
      `/events/locations1/${locationSelect[1].value}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    console.log(data);
    data.forEach((list, n) => {
      // none = 'style="display: none"';
      // if (list.hiring) {
      //   none = "";
      // }
      if (n < 8) {
        a = document.createElement("div");
        a.classList.add("event-card");
        a.id = list.eventId;
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
        cards[1].appendChild(a);
        if (list.interestedPeople.includes(userId)) {
          document.querySelector(`#interested${n}`).checked = true;
          console.log(list.interestedPeople);
        }
      }
    });
    document.querySelectorAll(".interested-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", async function () {
        console.log("hgf");

        // Redirect to login if user is not logged in
        if (!userId) {
          localStorage.setItem("loc", "/");
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
    // Process and display the events
  } catch (error) {
    console.error("Error fetching events:", error);
  }
});
