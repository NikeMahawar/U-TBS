import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js';

// Firebase configuration object with your project details
const firebaseConfig = {
    apiKey: "AIzaSyDsdpg0aV3W1UwFknBmAqrwFs97JMQJfgk",
    authDomain: "unstop-train-tickets-booking.firebaseapp.com",
    databaseURL: "https://unstop-train-tickets-booking-default-rtdb.firebaseio.com",
    projectId: "unstop-train-tickets-booking",
    storageBucket: "unstop-train-tickets-booking.appspot.com",
    messagingSenderId: "197075433810",
    appId: "1:197075433810:web:902cc8f28a84817540a28b"
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize the seat array with 80 seats, all set to 0 (unbooked)
let seats = new Array(80).fill(0);

// Load seat data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSeats();
});

// Function to load seat data from Firebase
function loadSeats() {
    const seatsRef = ref(database, 'seats');
    get(seatsRef).then((snapshot) => {
        if (snapshot.exists()) {
            seats = snapshot.val(); // Update the seats array with data from Firebase
        }
        createSeats(); // Create the seat elements on the page
        updateSeatDisplay(); // Update the seat display based on the current seat data
    }).catch((error) => {
        console.error("Error loading seats:", error); // Log any errors that occur
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to load seat data!' // Show an error message if data loading fails
        });
    });
}

// Function to save the updated seat data to Firebase
function saveSeats() {
    const seatsRef = ref(database, 'seats');
    set(seatsRef, seats).catch((error) => {
        console.error("Error saving seats:", error); // Log any errors that occur
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to save seat data!' // Show an error message if saving fails
        });
    });
}

// Function to handle seat booking
function bookSeats() {
    const seatCount = parseInt(document.getElementById('seatCount').value);
    
    // Validate the input
    if (isNaN(seatCount) || seatCount < 1 || seatCount > 7) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid input',
            text: 'Please enter a valid number of seats between 1 and 7.'
        });
        return;
    }

    let bookedSeats = []; // Array to keep track of booked seats
    let seatsLeft = seatCount; // Number of seats left to book

    // Try to book seats in the first available row with enough seats
    for (let i = 0; i < seats.length; i += 7) {
        let rowSeats = seats.slice(i, i + 7);
        if (rowSeats.filter(seat => seat === 0).length >= seatsLeft) {
            for (let j = i; j < i + 7 && seatsLeft > 0; j++) {
                if (seats[j] === 0) {
                    seats[j] = 1; // Mark the seat as booked
                    bookedSeats.push(j + 1); // Add the seat number to the booked seats list
                    seatsLeft--;
                }
            }
            break;
        }
    }

    // If not enough seats were booked in the rows, try to book remaining seats elsewhere
    if (seatsLeft > 0) {
        for (let i = 0; i < seats.length && seatsLeft > 0; i++) {
            if (seats[i] === 0) {
                seats[i] = 1; // Mark the seat as booked
                bookedSeats.push(i + 1); // Add the seat number to the booked seats list
                seatsLeft--;
            }
        }
    }

    // Show success or error message based on the booking result
    if (bookedSeats.length > 0) {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Booked seats: ${bookedSeats.join(', ')}`
        });
        saveSeats(); // Save the updated seat data
        updateSeatDisplay(); // Update the seat display

        // If all seats are booked, clear bookings after a delay
        if (seats.every(seat => seat === 1)) {
            setTimeout(() => {
                clearBookings();
            }, 2000);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Not enough seats available to fulfill the request.'
        });
    }
}

// Function to clear all bookings
function clearBookings() {
    seats.fill(0); // Reset all seats to unbooked
    saveSeats(); // Save the updated seat data
    updateSeatDisplay(); // Update the seat display
    Swal.fire({
        icon: 'info',
        title: 'Cleared',
        text: 'All bookings have been cleared, seats are available again.'
    });
}

// Function to update the seat display based on current seat data
function updateSeatDisplay() {
    const seatElements = document.querySelectorAll('.seat');
    seatElements.forEach(seat => {
        const seatNumber = parseInt(seat.dataset.seatNumber);
        if (seats[seatNumber - 1] === 1) {
            seat.classList.add('booked'); // Mark seat as booked
        } else {
            seat.classList.remove('booked'); // Remove booking mark
        }
    });
}

// Function to create and display all seat elements
function createSeats() {
    const seatsContainer = document.getElementById('seatsContainer');
    seatsContainer.innerHTML = ''; // Clear existing seats

    seatsContainer.appendChild(createToiletContainer()); // Add toilet icons
    
    // Create rows of seats
    for (let row = 0; row < 11; row++) {
        seatsContainer.appendChild(createSeatRow(row * 7 + 1));
    }

    // Create and add the last row of seats
    const lastRow = document.createElement('div');
    lastRow.className = 'seat-row last-row';
    for (let i = 78; i <= 80; i++) {
        lastRow.appendChild(createSeat(i));
    }
    seatsContainer.appendChild(lastRow);

    seatsContainer.appendChild(createToiletContainer()); // Add toilet icons
}

// Function to create a row of seats
function createSeatRow(startSeat) {
    const row = document.createElement('div');
    row.className = 'seat-row';

    const leftGroup = createSeatGroup(startSeat, 3); // Create group of 3 seats
    const rightGroup = createSeatGroup(startSeat + 3, 3); // Create group of 3 seats
    const singleSeat = createSeat(startSeat + 6); // Create a single seat

    row.appendChild(leftGroup);
    row.appendChild(rightGroup);
    row.appendChild(singleSeat);

    return row;
}

// Function to create a group of seats
function createSeatGroup(start, count) {
    const group = document.createElement('div');
    group.className = 'seat-group';
    for (let i = start; i < start + count; i++) {
        group.appendChild(createSeat(i));
    }
    return group;
}

// Function to create an individual seat element
function createSeat(number) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = number; // Set seat number
    seat.dataset.seatNumber = number; // Store seat number in data attribute
    return seat;
}

// Function to create the toilet icons container
function createToiletContainer() {
    const container = document.createElement('div');
    container.className = 'toilet-container';
    container.innerHTML = '<div class="toilet">Toilet</div><div class="toilet">Toilet</div>';
    return container;
}

// Expose functions to the global scope for use in HTML event handlers
window.bookSeats = bookSeats;
window.loadSeats = loadSeats;
