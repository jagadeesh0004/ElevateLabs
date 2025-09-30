document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop actual submission

  let isValid = true;

  // reset messages
  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  document.getElementById("success-message").textContent = "";

  // inputs
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // validate name
  if (name === "") {
    setError("name", "Name cannot be empty");
    isValid = false;
  }

  // validate email with regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    setError("email", "Email cannot be empty");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    setError("email", "Invalid email format");
    isValid = false;
  }

  // validate message
  if (message === "") {
    setError("message", "Message cannot be empty");
    isValid = false;
  }

  // success
  if (isValid) {
    document.getElementById("success-message").textContent = "Form submitted successfully!";
    document.getElementById("contactForm").reset();
  }
});

// helper to show error under input
function setError(id, message) {
  const input = document.getElementById(id);
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
}
