// Show/Hide Professionals section based on organizer needs
const lookingForRadios = document.querySelectorAll('input[name="looking-for"]');
const professionalOptions = document.getElementById("professional-options");
const events = document.querySelector(".event-cards");

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
      <button class="buttu">☆ I'm Interested</button>
      <div class="tick">
        <a href=""><img src="${list.eventType}.png" alt="" /></a>
      </div>
      <div class="cal">
        <a href=""><img src="cal.png" alt="" /></a>
      </div>
      <div class="id" style="display: none">${list.eventId}</div>
    `;
      events.appendChild(a);
    });
  });
});
