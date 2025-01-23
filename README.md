# Resumin

**Resumin** is an open-source resume generator built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to create professional resumes effortlessly. Contributions are welcome to enhance its features and functionality.

## Features

- **User-Friendly Interface**: Craft resumes with an intuitive and straightforward interface.
- **Customizable Templates**: Choose from various templates to match your professional style.
- **Real-Time Preview**: See changes instantly as you edit your resume.
- **PDF Export**: Download your resume in PDF format for easy sharing.

## Technologies Used

- **Frontend**: React.js for building dynamic user interfaces.
- **Backend**: Node.js and Express.js for server-side operations.
- **Database**: MongoDB for storing user data.
- **Web Scraping**: Puppeteer for generating PDF exports.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/DeadpoolX7/Resumin.git
   cd Resumin
    ```
2. **Install dependencies**
   Navigate to both the `frontend` and `backend` directories and install the required packages:
   ```bash
   # In the frontend directory
    npm install

    # In the backend directory
    npm install
    ```
3. **Set up EnvironMent Variables**:
   Create a `.env` file in the `backend` directory with the following content:
   
   ```bash
      PORT=5000
    MONGO_URI=your_mongodb_connection_string

   ```
4. **Start the application**:
   Run the following command from `frontend` directory:
   ```bash
   npm run dev
   ```
Run the following command from `backend` directory:
```bash
npm start
```

## Contributing
1. Fork the repo.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add YourFeature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.
Please ensure your code adheres to the project's coding standards and includes appropriate documentation.
