# Budget Tracker

## Description
Budget Tracker is a web application designed to help people manage their finances more effectively. By providing tools to budget and save money, Budget Tracker enables users to keep a close eye on their income and expenses. This visibility into financial habits empowers users to make informed decisions, see where their money is going, and identify opportunities to save.

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB

## Getting Started

### Prerequisites
Before you begin, ensure you have installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Setup Instructions
Follow these steps to get your development environment set up:

1. **Clone the repository**
    ```
    git clone https://github.com/munizp1/budget-tracker-app.git
    cd budget-tracker-app
    ```

2. **Install Backend Dependencies**
   - Navigate to the backend directory and install dependencies:
        ```
        cd server
        npm install
        ```

3. **Install Frontend Dependencies**
   - In a new terminal window, navigate to the frontend directory and install dependencies:
        ```
        cd client
        npm install
        ```

4. **Set Up Environment Variables**
   - Create a `.env` file in the server directory based on the `.env.example` template. Fill in your MongoDB URI and any other necessary configurations. Example content for your `.env` file:
     ```
     MONGODB_URI=mongodb+srv://pmuniz159:la7vk0hDq20VxF0z@budgettrackerdevelopmen.8qvwdbr.mongodb.net/?retryWrites=true&w=majority&appName=BudgetTrackerDevelopment
     PORT=3000
     ```

5. **Run the Application**
   - Start the backend server from the server directory:
        ```
        npm start
        ```
   - In a new terminal, navigate to the client directory and start the frontend application:
        ```
        cd client
        npm start
        ```
    The application should now be running on `localhost:3000` for the frontend. Ensure the backend server is also running as it serves the API requests from the frontend.

## Contribution Guidelines
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Project Structure
Here is a basic overview of our project's structure:

budget-tracker-app/

├── client/ # React frontend application

├── server/ # Node.js + Express backend API

    └── models/ # MongoDB models


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Hat tip to anyone whose code was used
- Inspiration
- etc
