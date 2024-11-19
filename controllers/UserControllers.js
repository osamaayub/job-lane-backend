const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const {hashPassword,comparePassword}=require("../utils");
const { createToken } = require('../middlewares/auth')
const cloudinary = require('cloudinary').v2;



const register = async (req, res) => {

    try {
        const { name, email, password, skills } = req.body;
          
        const avatarFile = req.files && req.files.avatar ?req.files.avatar[0].path:null;
        const resumeFile = req.files && req.files.resume ? req.files.resume[0].path : null;
        // Upload avatar to Cloudinary
        const avatarUpload = await cloudinary.uploader.upload(avatarFile, {
            folder: 'avatar',
            crop:'scale'
        });

        // Upload resume to Cloudinary (use resource_type: 'raw' for PDFs)
        const resumeUpload = await cloudinary.uploader.upload(resumeFile, {
            folder: 'resume',
        });

        // Hash the password
        const hashPass = await hashPassword(password);

        // Create the user with avatar and resume URLs
        const user = await User.create({
            name,
            email,
            password: hashPass,
            avatar: {
                public_id: avatarUpload.public_id,
                url: avatarUpload.secure_url,
            },
            skills,
            resume: {
                public_id: resumeUpload.public_id,
                url: resumeUpload.secure_url,
            },
        });

        // Create a token for the user
        const token = createToken(user._id, user.email);

        // Send the response with token and user data
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
            token,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
};











//login

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                sucess: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = comparePassword(password,user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = createToken(user._id, user.email)

        res.status(200).json({
            success: true,
            message: "User logged In Successfully",
            token
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const isLogin = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        } else {
            return res.status(200).json({
                success: true,
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const me = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "user not found"
            })

        }
        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Fetch the user based on ID from the request
        const user = await User.findById(req.user._id);

        // Retrieve the stored hashed password
        const userPassword = user.password;

        // Check if the provided old password matches the stored password
        const isMatch = await comparePassword(oldPassword, userPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // Check if the new password is the same as the old password
        if (newPassword === oldPassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password",
            });
        }

        // Ensure newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        // Hash the new password
        const hashPass = await hashPassword(newPassword, 10);

        // Update the user's password and save
        user.password = hashPass;
        await user.save();

        res.status(200).json({
            success: true,
            message: "User password changed successfully",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newSkills } = req.body;
        // Validate required fields
        if (!newName || !newEmail || !newSkills) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, and Skills are required"
            });
        }

        // Validate and access uploaded files
        const newAvatar = req.files && req.files.newAvatar ? req.files.newAvatar[0].path : null;
        const newResume = req.files && req.files.newResume ? req.files.newResume[0].path : null;
        // Upload files to Cloudinary if they exist
        let avatarUpload, resumeUpload;

        
            avatarUpload = await cloudinary.uploader.upload(newAvatar, {
                folder: 'avatar',
                crop: "scale"
            });
            resumeUpload = await cloudinary.uploader.upload(newResume, {
                folder: 'resume',
            });
            //check if the user is valid or not
         if(!req.user._id && req.user){
            return res.status(400).json({
                sucess:false,
                message:"Invalid UserId"
            })
        }

        // Find user and update profile using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    name: newName,
                    email: newEmail,
                    skills: newSkills,
                    avatar: avatarUpload ? {
                        public_id: avatarUpload.public_id,
                        url: avatarUpload.secure_url
                    } : undefined,
                    resume: resumeUpload ? {
                        public_id: resumeUpload.public_id,
                        url: resumeUpload.secure_url
                    } : undefined
                }
            },
            { new: true }  // Return the updated user document
        );
           //if the user does not exists
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later."
        });
    }
};






const deleteAccount = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const isMatch = await comparePassword(req.body.password, user.password);

        

        if (!isMatch) {
           await User.findByIdAndDelete(req.user._id);
        } else {
            return res.status(400).json({
                success: false,
                message: "Password does not match !"

            })
        }


        res.status(200).json({
            success: true,
            message: "Account Deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
module.exports={
    register,
    login,
    isLogin,
    changePassword,
    deleteAccount,
    me,
    updateProfile
}
