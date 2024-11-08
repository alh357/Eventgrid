const locationSelect = document.querySelectorAll(".location-select");
const cards = document.querySelectorAll(".event-cards");

locationSelect.forEach((i, oj) => {
  i.addEventListener("change", (event) => {
    document.querySelectorAll(".location")[oj].textContent =
      event.target.options[event.target.selectedIndex].text;
    console.log(oj);
  });
});

locationSelect.forEach((i, oj) => {
  i.addEventListener("change", (event) => {
    document.querySelectorAll(".location")[oj].textContent =
      event.target.options[event.target.selectedIndex].text;
    console.log(oj);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  // Function to fetch and display events based on the selected location

  // Initial request for the default location when the page loads
  try {
    const response = await fetch(
      `/events/locations/${locationSelect[0].value}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    console.log(data);
    data.forEach((list) => {
      none = 'style="display: none"';
      if (list.hiring) {
        none = "";
      }
      a = document.createElement("div");
      a.classList.add("event-card");
      a.innerHTML = `
      <img src="${list.imageUrl}" class="img" alt="Event Image" />
      <div class="event-info">
        <h3>${list.name}</h3>
        <p class="info">
          ${list.description}
        </p>
        <p class="info-span">Date: ${list.date.slice(0, 10)}, ${list.time}</p>
      <p class="info" ${none}>
              Looking for:
              <span class="info-span">${list.lookingFor}</span>
            </p>
        <p class="info">
          <span class="info-span">${list.interested}</span> People Interested
        </p>
      </div>
      <button class="buttu">☆ I'm Interested</button>
      <div class="tick">
        <a href=""><img src="free.png" alt="" /></a>
      </div>
      <div class="cal">
        <a href=""><img src="cal.png" alt="" /></a>
      </div>
      <div class="id" style="display: none">${list.eventId}</div>
    `;
      events.appendChild(a);
    });
    // Process and display the events
  } catch (error) {
    console.error("Error fetching events:", error);
  }
  // Event listener for location dropdown change
});