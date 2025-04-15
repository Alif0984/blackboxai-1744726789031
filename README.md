
Built by https://www.blackbox.ai

---

```markdown
# SmartPark - Sistem Parkir Otomatis

SmartPark is an automated parking system that utilizes Automatic Number Plate Recognition (ANPR) technology and supports digital payment methods. This web application provides real-time monitoring of parking slots, efficient transaction management, and a user-friendly interface for managing parking activities.

## Project Overview

The SmartPark system aims to enhance the parking experience by allowing users to check in and out with the help of ANPR technology, monitor parking availability, and manage transactions effectively. This application is designed to be mobile-friendly and structured to provide quick access to essential features.

## Installation

To run the SmartPark web application locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/smartpark.git
   cd smartpark
   ```
   
2. **Open the `index.html` file in your web browser.**
   You can use any web server or open the file directly if testing locally.

## Usage

1. **Check In/Check Out:**
   - Choose the type of transaction (Check In or Check Out).
   - Use the ANPR camera feature to capture the vehicle plate number or enter it manually.
   - Enter additional details such as vehicle type, owner's name, and phone number.
   - Submit the form to complete the transaction.

2. **Dashboard:**
   - View the overall parking statistics including total slots, available slots, and today's revenue.
   - Check the real-time status of parking slots.

3. **Transaction History:**
   - Access the history of transactions to monitor past activities and financial records.

## Features

- **ANPR Technology:** Utilizes automatic recognition of vehicle license plates for seamless check-in/out.
- **Digital Payment Support:** Offers multiple payment options including QRIS and e-wallets.
- **Responsive Dashboard:** Displays essential statistics and grid of parking slots that updates in real-time.
- **Transaction History:** Filter and review the transaction history with various parameters.
- **User-Friendly Interface:** Clean and intuitive design for easy navigation across devices.

## Dependencies

The application relies on the following technologies:

- **Tailwind CSS** for styling (included via CDN)
- **Font Awesome** for icons (included via CDN)
- Basic HTML, CSS, and JavaScript for functionality

## Project Structure

```
smartpark/
├── app.js            # Main JavaScript file handling application logic
├── dashboard.html    # HTML for the dashboard view
├── history.html      # HTML for viewing transaction history
├── index.html        # Landing page of the application
├── transaction.html   # HTML for handling transactions
└── index.php         # Placeholder for potential backend integration
```

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Special thanks to the developers and designers of the libraries used in this project, enabling rapid development of modern web applications.
```