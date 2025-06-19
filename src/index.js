// Grabbing HTML Elements
const guestForm = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestCategory = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

// Initializing the Guest List (create an array to store all your guests)

let guests = [];

// When the form is submitted

guestForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Stops the page from refreshing

  const name = guestInput.value.trim(); // Get name
  const category = guestCategory.value; // Get category

  if (!name) return alert("Please enter a guest name."); // If name is empty
  if (guests.length >= 10) {
    alert("Guest limit reached (10 guests).");
    return;
  }

  const guest = {
    id: Date.now(),  // Unique ID
    name,
    category,
    rsvp: true,  // RSVP starts as true
    addedAt: new Date().toLocaleTimeString() // Time added
  };

  guests.push(guest);  // Add to list
  renderGuests();  // show on page
  guestForm.reset(); // clear the form
});


// Displaying the guest list

function renderGuests() {
  guestList.innerHTML = ''; // Clear everything first

  guests.forEach(guest => {
    const li = document.createElement('li');
    li.className = `p-4 border border-green-200 rounded-lg shadow bg-white bg-opacity-80`;
    // Add guest name and category
    // Add time added
    // Add RSVP status
    // Add buttons: RSVP, Edit, Remove
    // Add to list
    ory
    const nameLine = document.createElement('p');
    nameLine.className = 'text-lg font-semibold text-green-800';
    nameLine.textContent = `${guest.name} (${guest.category})`;

    const timeLine = document.createElement('p');
    timeLine.className = 'text-sm text-gray-500';
    timeLine.textContent = `Added at: ${guest.addedAt}`;

    const statusLine = document.createElement('p');
    statusLine.className = `text-sm mt-1 ${
      guest.rsvp ? 'text-green-600' : 'text-red-500'
    }`;
    statusLine.textContent = `Status: ${guest.rsvp ? 'Attending ✅' : 'Not Attending ❌'}`;

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'mt-3 flex gap-2 flex-wrap';

    const rsvpBtn = document.createElement('button');
    rsvpBtn.textContent = 'Toggle RSVP';
    rsvpBtn.className =
      'px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded';
    rsvpBtn.addEventListener('click', () => {
      guest.rsvp = !guest.rsvp;
      renderGuests();
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className =
      'px-3 py-1 bg-green-400 hover:bg-green-500 text-white rounded';
    editBtn.addEventListener('click', () => {
      const newName = prompt('Update guest name:', guest.name);
      if (newName) {
        guest.name = newName.trim();
        renderGuests();
      }
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className =
      'px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded';
    removeBtn.addEventListener('click', () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    });

    buttonGroup.appendChild(rsvpBtn);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(removeBtn);

    li.appendChild(nameLine);
    li.appendChild(timeLine);
    li.appendChild(statusLine);
    li.appendChild(buttonGroup);

    guestList.appendChild(li);
  });
}
