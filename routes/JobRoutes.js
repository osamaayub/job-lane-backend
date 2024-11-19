const express = require('express')
const upload = require('../utils/multer');
const { isAuthenticated, authorizationRoles } = require('../middlewares/auth')
const {
  createJob,
   allJobs, 
   oneJob, 
   saveJob, 
   getSavedJobs
  } = require('../controllers/JobControllers');
const router = express.Router()


router.route("/create/job")
.post(isAuthenticated, authorizationRoles("admin"),
upload.single('companyLogo'),  createJob)

router.route("/jobs").get(allJobs) ;

router.route("/job/:id").get(oneJob) ;

router.route("/saveJob/:id").get(isAuthenticated,saveJob) ;

router.route("/getSavedJobs").get(isAuthenticated, getSavedJobs) ;

module.exports = router ;
