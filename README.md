# HealthPredict: AI-Powered Disease Prediction System

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
</div>

**HealthPredict** is an intelligent web application designed to provide preliminary disease predictions based on user-submitted symptoms. Leveraging a powerful Large Language Model (LLM), this tool offers a user-friendly interface for patients to input their details and symptoms, receiving instant, AI-driven insights into potential health conditions.


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
    The backend will be running on `http://localhost:5000` (or the port specified in  `.env` file).

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



<<<<<<< HEAD
=======
-   **`POST /api/predict`**
    -   **Description:** Submits patient information and symptoms to get a disease prediction. It also saves or updates the patient record in the database.
    -   **Request Body:**
        ```json
        {
          "name": "John Doe",
          "phone": "1234567890",
          "address": "123 Main St, Anytown",
          "gender": "Male",
          "symptoms": "fever, cough, headache"
        }
        ```
    -   **Response:** A JSON object containing the AI-generated prediction details.
>>>>>>> 54351fb5546d15ba8770166a0095dd7ef7790883
