const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 1,
        max: 8
    },

    avatar: {
        public_id: {
            type: String,
            required: true

        },
        url: {
            type: String,
            required: true

        },
    },

    role: {
        type: String,
        enum: ["applicant", "admin"],
        default: "applicant"
    },

    skills: [
        {
            type: String
        }
    ],

    resume: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },

    },
    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    appliedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }


}, { timestamp: true })

const User = mongoose.model('User', UserSchema)
module.exports = User