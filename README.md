# QuizApp 

A full-stack web-based quiz platform designed to help students practice technical subjects through interactive quizzes, AI-assisted question generation, and performance tracking.

Overview

QuizApp is a full-stack quiz management and assessment platform built with **React, Node.js, Express.js, and MongoDB**.

The application provides separate experiences for **students and administrators**. Students can register, log in, select quizzes based on technical categories, attempt quizzes, and view their results. Administrators can manage questions and quizzes, monitor student performance, and use AI-assisted functionality to generate quiz content.

The application also includes a structured question dataset covering multiple computer science and technical topics.

##  Features

### Student Features

* User registration and login
* Secure authentication
* Browse quizzes by category
* Attempt timed quizzes
* Submit quiz answers and receive results
* Track quiz performance
* View quiz attempt history
* Practice questions across multiple technical domains

###  Admin Features

* Admin authentication
* Admin dashboard
* Create and manage quizzes
* Add and manage questions
* Manage students
* View quiz results
* Analyze student performance
* Manage quiz categories

###  AI-Powered Features

* AI-assisted quiz/question generation
* AI-based question processing
* Quiz category matching
* Fallback question mechanism when AI-generated content is unavailable
* Structured question generation for different technical topics

## Available Technical Topics

The application contains question datasets covering topics such as:

* Python
* Java
* JavaScript
* Data Structures and Algorithms
* DBMS
* SQL
* Operating Systems
* Computer Networks
* Object-Oriented Programming
* Machine Learning
* Deep Learning
* Artificial Intelligence
* NLP
* LLM concepts
* Prompt Engineering
* Docker & DevOps
* REST APIs
* System Design
* Mathematics for AI
* Data Science
* Engineering Mathematics

##  Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### AI

* AI-powered question generation
* AI service integration
* Prompt-based question generation

### Development Tools

* Git
* GitHub
* npm
* VS Code

##  Project Structure

```text
QuizApp/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── capstone images/
│
├── .gitignore
└── README.md
```

##  Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
REST API
 │
 ▼
Node.js + Express Backend
 │
 ├── Authentication
 ├── Quiz Management
 ├── Question Management
 ├── Quiz Attempts
 ├── Analytics
 └── AI Services
 │
 ▼
MongoDB
```

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/Pravalika1-5/QuizApp.git
cd QuizApp
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder.

Add the required configuration values for:

```text
MongoDB connection
JWT authentication
AI API configuration
Server configuration
```

Refer to `.env.example` for the required variable names.

**Do not commit your `.env` file or API keys to GitHub.**

### 4. Start the backend

```bash
npm start
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
npm run dev
```

The frontend will then be available through the local Vite development server.

##  Screenshots

### Login

Add your login screenshot here.

### Student Dashboard

Add your student dashboard screenshot here.

### Quiz Interface

Add your quiz-taking screenshot here.

### Admin Dashboard

Add your admin dashboard screenshot here.

### AI Question Generator

Add your AI generator screenshot here.

##  Project Highlights

* Full-stack MERN-style architecture
* Role-based student and administrator functionality
* RESTful backend APIs
* MongoDB-based data persistence
* AI-assisted question generation
* Structured technical question datasets
* Quiz attempt and result management
* Modular backend architecture using controllers, routes, services, models, and middleware
* React-based componentized frontend

##  Future Improvements

* Deploy the application using cloud services
* Add advanced performance analytics and visualizations
* Improve AI-generated question validation
* Add difficulty-based adaptive quizzes
* Add leaderboard functionality
* Add automated testing
* Implement CI/CD pipeline
* Add stronger security and production-level monitoring

##  Author

**Pravalika Manthri**

GitHub: [Pravalika1-5](https://github.com/Pravalika1-5)

---

If you find this project useful, consider giving it a star!
