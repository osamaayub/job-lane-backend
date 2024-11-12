// Import Routes
const User = require('../routes/UserRoutes');
const Job = require('../routes/JobRoutes');
const Application = require('../routes/ApplicationRoutes');
const Admin = require('../routes/AdminRoutes');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config({ path: './config/config.env' });
const databaseConnection = require('../config/database');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('../middlewares/error');

// Database Connection

databaseConnection();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Initialize Express App
const app = express();

// Middleware Configuration
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(fileUpload({ useTempFiles: true }));

// CORS Configuration
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));



// API Routes
app.use("/api/v1", User);
app.use("/api/v1", Job);
app.use("/api/v1", Application);
app.use("/api/v1", Admin);

// Root Route
app.get("/", (req, res) => {
    res.json("I am working");
});

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


