import user from "./_isLoggedin";
import createAlert from "./utils";
import axios from "axios";

// Show the pop up
if (document.querySelector(".rent-cart")) {
  document.querySelector(".rent-cart").addEventListener("click", () => {
    if (!user) {
      createAlert("danger", "Login to perform the task");
    } else {
      document.getElementById("overlay").style.display = "flex";

      displayRentedDress();
    }
  });
}

if (document.getElementById("close-btn")) {
  document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
  });
}

if (document.querySelectorAll(".btn").length > 0) {
  const allRentBtns = document.querySelectorAll(".btn");

  allRentBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!user) {
        createAlert("danger", "Login to perform the task");
        return;
      }
      const itemTitle = btn.parentElement.querySelector("h4").textContent;

      rentDress(user, itemTitle);
    });
  });
}

async function rentDress(username, item) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/rented-items",
      {
        username,
        item,
      }
    );
    console.log(response);
    createAlert("success", "Item rented successfully!");
  } catch (err) {
    console.log(err);
    createAlert("danger", "Item already rented!");
  }
}

async function displayRentedDress() {
  try {
    // Fetch rented items for the user
    const response = await axios.post(
      "http://localhost:3000/api/v1/users/display-rented-items",
      { user }
    );

    const rentedItems = response.data.rentedItems;
    const overlayAbove = document.getElementById("overlay-above");

    // Clear existing items
    overlayAbove.innerHTML = `
      <h2 style="margin-bottom: 20px">Rented Items</h2>
    `;

    // Render rented items dynamically
    rentedItems.forEach((item) => {
      const itemTemplate = `
        <div class="item-container">
          <span class="item-name">${item}</span>
          <button class="remove-btn">&times;</button>
        </div>
      `;
      overlayAbove.insertAdjacentHTML("beforeend", itemTemplate);
    });

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button, index) => {
      button.addEventListener("click", async () => {
        const itemToRemove = rentedItems[index];

        try {
          // API call to remove the item from the database
          const removeResponse = await axios.post(
            "http://localhost:3000/api/v1/users/remove-rented-item",
            { user, item: itemToRemove }
          );

          if (removeResponse.data.status === "success") {
            // Remove the item visually
            button.parentElement.remove();
            console.log(`Removed item: ${itemToRemove}`);
          } else {
            console.error("Failed to remove item from the database");
          }
        } catch (err) {
          console.error(err);
          createAlert("danger", "Failed to remove the item!");
        }
      });
    });
  } catch (err) {
    console.error(err);
    createAlert("danger", "Something went wrong while fetching rented items!");
  }
}
