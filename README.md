# HealthPredict: AI-Powered Disease Prediction System

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
</div>

**HealthPredict** is an intelligent web application designed to provide preliminary disease predictions based on user-submitted symptoms. Leveraging a powerful Large Language Model (LLM), this tool offers a user-friendly interface for patients to input their details and symptoms, receiving instant, AI-driven insights into potential health conditions.

This application was developed as a final-year B.E. Computer Science and Engineering megaproject.

## ✨ Features

-   **Intuitive User Workflow:** A step-by-step process to enter patient information and symptoms.
-   **Voice-to-Text Symptom Entry:** Users can speak their symptoms, which are automatically transcribed into text using the Web Speech API.
-   **AI-Powered Predictions:** Integrates with the OpenRouter API (using the Grok model) to analyze symptoms and predict potential diseases.
-   **Detailed & Actionable Results:** Displays a list of possible diseases with accuracy percentages, detailed descriptions, severity levels, recovery time estimates, and recommended medications, diet, and precautions.
-   **Persistent Patient Data:** Securely saves patient history in a MongoDB database, preventing duplicate entries based on phone numbers.
-   **Responsive & Modern UI:** Built with React and Tailwind CSS, featuring smooth animations with Framer Motion for an engaging user experience.
-   **Full-Stack Architecture:** A robust backend built with Node.js and Express.js serves a RESTful API for all frontend operations.

## 🛠️ Tech Stack

| Category      | Technology                                                                                             |
| :------------ | :----------------------------------------------------------------------------------------------------- |
| **Frontend**  | React.js, Vite, React Router, Tailwind CSS, Framer Motion, Axios                                       |
| **Backend**   | Node.js, Express.js, Mongoose                                                                          |
| **Database**  | MongoDB                                                                                                |
| **AI Service**| OpenRouter API (Grok Model)                                                                            |
| **Deployment**| (Add your deployment platforms here, e.g., Vercel for Frontend, Render for Backend)                    |

## 📂 Project Structure

The project is organized into two main directories in a monorepo-style structure:

```
.
├── backend/      # Node.js, Express, and Mongoose API
└── frontend/     # React, Vite, and Tailwind CSS client application
```

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a connection string from MongoDB Atlas.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MAHAMMAD-INSAF/AI-Disease-prediction.git
    cd AI-Disease-prediction
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    npm install
    ```
    -   Create a `.env` file in the `backend` directory.
    -   Copy the contents from `.env.example` into your new `.env` file.
    -   Update the `MONGO_URI` and `DEEPMED_API_KEY` with your own credentials.

3.  **Set up the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    # From the /backend directory
    node server.js
    ```
    The backend will be running on `http://localhost:5000` (or the port specified in your `.env` file).

2.  **Start the Frontend Development Server:**
    ```bash
    # From the /frontend directory
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

## ⚙️ Environment Variables

The backend requires the following environment variables, which should be placed in a `.env` file in the `/backend` directory.

-   `PORT`: The port on which the Express server will run (e.g., `5000`).
-   `MONGO_URI`: Your MongoDB connection string.
-   `DEEPMED_API_KEY`: Your API key from OpenRouter.

An example file (`.env.example`) is provided in the backend directory.



