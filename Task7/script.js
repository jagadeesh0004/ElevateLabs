const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reload-btn");

// Function to fetch and display users
async function fetchUsers() {
  userContainer.innerHTML = "Loading...";
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    // Clear container
    userContainer.innerHTML = "";

    // Loop through users
    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(card);
    });
  } catch (error) {
    userContainer.innerHTML = `<p id="error">⚠️ Error: ${error.message}</p>`;
  }
}

// Reload button event
reloadBtn.addEventListener("click", fetchUsers);

// Initial load
fetchUsers();
