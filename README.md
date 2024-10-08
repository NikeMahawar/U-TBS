# Train Seat Booking System

## Overview
The Train Seat Booking System is a web application designed to allow users to book train seats in a coach. The application interacts with Firebase Realtime Database to manage seat availability and bookings. It features a responsive UI that displays available and booked seats and provides functionality to book and clear seats.

## Features
- **View Available Seats**: Displays all seats with their booking status.
- **Book Seats**: Allows users to book a specified number of seats (1-7) and updates the seat status in real-time.
- **Error Handling**: Displays appropriate error messages if booking fails or if there are insufficient seats.
- **Seat Clearing**: Provides an option to clear all bookings and reset seat status.

## Technologies Used
- **HTML**: Structure of the web page.
- **CSS**: Styling for the web page.
- **JavaScript**: Functionality for seat booking and interaction with Firebase.
- **Firebase**: Real-time database for storing and managing seat bookings.
- **Toastr**: For displaying notification messages.
- **SweetAlert2**: For custom alert messages.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/train-seat-booking.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd train-seat-booking
   ```

3. **Open `index.html`**
   Open `index.html` in a web browser to view the application.

## Configuration

1. **Firebase Setup**
   - Replace the Firebase configuration in `script.js` with your own Firebase project credentials.

2. **Dependencies**
   - The project uses external libraries hosted via CDN, so no additional installation is required.

**Access the Live Demo**
   - The URL for the live demo will be provided once the project is deployed.

## Code Structure

- **`index.html`**: The main HTML file for the application.
- **`styles.css`**: The stylesheet for the application.
- **`script.js`**: The JavaScript file that handles the application logic and Firebase interactions.

## Live Demo
Access the live demo of the application [here](your-live-demo-url).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
