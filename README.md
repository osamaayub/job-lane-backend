# HubHive

<p align="center">
  <img src="https://socialify.git.ci/osamaayub/HubHive/image?forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Dark" alt="HubHive" width="640" height="320" />
</p>

[![Hits](https://hits.sh/github.com/osamaayub/HubHive.svg?color=116acc)](https://hits.sh/github.com/osamaayub/HubHive/)

**HubHive** is a full-stack job application portal built using the **MERN stack** to streamline the job application process for job seekers and employers.

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

HubHive enables job seekers to manage applications, employers to post job listings, and administrators to oversee platform data. This application demonstrates full-stack development, secure authentication, and responsive design for an intuitive user experience.

---

## Live Demo
**Will be updated shortly**
Check out the live demo here: [HubHive Live Demo](https://your-live-demo-url.com)

> **Note**: The live demo may be hosted on a free tier, so please allow a few seconds for initial loading.

---

## Features

- **User Authentication and Authorization**: Secure login, registration, and role-based access.
- **Job Search and Filtering**: Find jobs by Jobtitle, salary, and companyName and jobCategory.
- **Job Application Tracking**: save jobs, track applications, and monitor status.
- **Resume Management**: Upload and manage resumes.
- **Profile Management**: Update user profiles, change password and delete Account,save jobs.
- **Admin Dashboard**: Manage users, jobs, and applications.
- **Job Posting**: Employers can post job openings.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.

---

## Technologies Used

### Frontend
- **React.js**: User interface library.
- **Redux**: State management.
- **Tailwind CSS, Material UI, Mantine UI**: Modern and responsive styling.

### Backend
- **Node.js**: JavaScript runtime.
- **Express.js**: Server framework.

### Database
- **MongoDB**: NoSQL database for data storage.

### Cloud Services
- **Cloudinary**: Cloud storage for image handling.

### Additional Tools
- **Git & GitHub**: Version control and collaboration.

---

## Installation

### Prerequisites

Ensure you have the following installed:
-  **React.js**:[React](https://react.dev)
- **Node.js**: [Download from nodejs.org](https://nodejs.org)
- **MongoDB**: Use MongoDB Atlas or a local MongoDB instance. [Setup MongoDB](https://www.mongodb.com/)
- **Cloudinary Account**: [Sign up at cloudinary.com](https://cloudinary.com)

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/osamaayub/HubHive.git
   cd HubHive
2.  **Install Dependencies for Both Frontend and Backend:**
3.  
    npm install
    <hr>
4.  **Enviroment Configuration:**
  **create a .env file and add the following variables:**
     <hr>
   ```bash
    MongoDB_URI=""
    JWT_SECRET=""
   JWT_SECRET_EXPIRIES_IN=""
    CLOUDINARY_CLOUDNAME=""
   CLOUDINARY_API_SECRET=""
   PORT=" "
 ```
 <hr>
5. **Start the Development:**
       npm run dev
     The frontend will be accessible at http://localhost:5173.
      The backend will be accessible at http://localhost:portNumber (or the specified PORT in .env)
      <hr>
   
6. **Contributing:**
 Contributions are welcome! Feel free to submit issues, request new features, or create pull requests.

1. **Fork the repository.**
2. **Create your feature branch (git checkout -b feature/AmazingFeature)**.
3. **Commit your changes (git commit -m 'Add some AmazingFeature')**.
4. **Push to the branch (git push origin feature/AmazingFeature).**
5. **Open a pull request.**
