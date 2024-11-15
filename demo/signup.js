const err = document.querySelector(".error");
document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Generate a unique user ID
    const userId = "user_" + Math.random().toString(36).substr(2, 9);

    // Create the user data object
    const userData = {
      userId: userId,
      name: name,
      email: email,
      password: password, // Ideally, hash the password on the backend
    };

    try {
      // Send the user data to the backend
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("userName", result.name);
        localStorage.setItem("userEmail", result.email);
        console.log("User created successfully");
        err.textContent = "User created successfully";
        setTimeout(() => {
          err.textContent = "";
        }, 2000);
        //alert("Sign-up successful!");
        // Redirect the user to login or another page if needed
        const loc = localStorage.loc;
        localStorage.removeItem("loc");
        window.location.href = loc || "/";
      } else {
        console.error("Error creating user:", result.error);
        err.textContent = "Error during sign-up. Please try again.";
        setTimeout(() => {
          err.textContent = "";
        }, 4000);
      }
    } catch (error) {
      console.error("Request failed:", error);
      err.textContent = "Failed to sign up. Please try again.";
      setTimeout(() => {
        err.textContent = "";
      }, 4000);
    }
  });

if (localStorage.userId) {
  window.location.href = "/";
}

//localStorage.clear();
