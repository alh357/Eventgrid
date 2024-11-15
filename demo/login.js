const err = document.querySelector(".error");
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create the login data object
    const loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    try {
      // Send login data to the backend
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Login successful:", result);

        // Store user info in local storage (or session storage if preferred)
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("userName", result.name);
        localStorage.setItem("userEmail", result.email);
        err.textContent = "Login successful";
        setTimeout(() => {
          err.textContent = "";
        }, 2000);
        const loc = localStorage.loc;
        localStorage.removeItem("loc");
        window.location.href = loc || "/";
        // Redirect the user to the dashboard or another page
        //window.location.href = "/dashboard";
      } else {
        console.error("Login failed:", result.error);
        err.textContent = "Invalid email or password. Please try again.";
        setTimeout(() => {
          err.textContent = "";
        }, 4000);
      }
    } catch (error) {
      console.error("Request failed:", error);
      err.textContent = "Login failed. Please try again later.";
      setTimeout(() => {
        err.textContent = "";
      }, 4000);
    }
  });

if (localStorage.userId) {
  window.location.href = "/";
}
