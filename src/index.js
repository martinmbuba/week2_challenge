// Get references to the HTML elements
const guestForm = document.getElementById('guest-form');          // The form used to add a guest
const guestInput = document.getElementById('guest-name');         // The input field for the guest's name
const guestCategory = document.getElementById('guest-category');  // The dropdown for selecting guest category
const guestList = document.getElementById('guest-list');          // The <ul> where guest items will be displayed
let guests = [];  // Array to store all guest objects

// Listen for when the form is submitted
guestForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Stop the form from refreshing the page

  const name = guestInput.value.trim();  // Get the name and remove extra spaces
  const category = guestCategory.value;  // Get the selected category

  // If the name is empty, show an alert and stop
  if (!name) return alert("Please enter a guest name.");

  // If there are already 10 guests, stop and alert the user
  if (guests.length >= 10) {
    alert("Guest limit reached (10 guests).");
    return;
  }

  // Create a guest object with some details
  const guest = {
    id: Date.now(),  // Unique ID based on current time
    name,            // Guest name
    category,        // Selected category
    rsvp: true,      // Guest is attending by default
    addedAt: new Date().toLocaleTimeString()  // Time guest was added
  };

  guests.push(guest);     // Add the guest to the array
  renderGuests();         // Update the guest list display
  guestForm.reset();      // Clear the form fields
});


// This function displays all guests in the list
function renderGuests() {
  guestList.innerHTML = '';  // Clear the current list on the page

  // Go through each guest and display their information
  guests.forEach(guest => {
    const li = document.createElement('li');  // Create list item for this guest
    li.className = `p-4 border border-green-200 rounded-lg shadow bg-white bg-opacity-80`;

    // Create a paragraph showing the guest's name and category
    const nameLine = document.createElement('p');
    nameLine.className = 'text-lg font-semibold text-green-800';
    nameLine.textContent = `${guest.name} (${guest.category})`;

    // Create a paragraph showing when the guest was added
    const timeLine = document.createElement('p');
    timeLine.className = 'text-sm text-gray-500';
    timeLine.textContent = `Added at: ${guest.addedAt}`;

    // Create a paragraph showing RSVP status
    const statusLine = document.createElement('p');
    statusLine.className = `text-sm mt-1 ${guest.rsvp ? 'text-green-600' : 'text-red-500'}`;
    statusLine.textContent = `Status: ${guest.rsvp ? 'Attending ✅' : 'Not Attending ❌'}`;

    // Create a container for the buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'mt-3 flex gap-2 flex-wrap';

    // Button to toggle RSVP status
    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = 'Toggle RSVP';
    rsvpBtn.className = 'px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded';
    rsvpBtn.addEventListener('click', () => {
      guest.rsvp = !guest.rsvp;  // Change RSVP status
      renderGuests();            // Re-render the list
    });

    // Button to edit the guest name
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'px-3 py-1 bg-green-400 hover:bg-green-500 text-white rounded';
    editBtn.addEventListener('click', () => {
      const newName = prompt('Update guest name:', guest.name);  // Ask for a new name
      if (newName) {
        guest.name = newName.trim();  // Update the name
        renderGuests();               // Re-render the list
      }
    });

    // Button to remove the guest
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded';
    removeBtn.addEventListener('click', () => {
      guests = guests.filter(g => g.id !== guest.id);  // Remove guest from array
      renderGuests();                                  // Re-render the list
    });

    // Add all buttons to the button group
    buttonGroup.appendChild(rsvpBtn);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(removeBtn);

    // Add all guest info and buttons to the list item
    li.appendChild(nameLine);
    li.appendChild(timeLine);
    li.appendChild(statusLine);
    li.appendChild(buttonGroup);

    // Add the complete list item to the guest list in the HTML
    guestList.appendChild(li);
  });
}
