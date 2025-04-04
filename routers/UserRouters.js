const express= require('express')

const {auth,getAllUsers, createUser,getUserByName,updateUserById,UpdateAllUserByEmail,deleteUserById ,login,deleteAllUsers}=require('../controllers/UserController')
 
const router = express.Router();
router.get('/users',auth, getAllUsers);
router.post('/createUser',createUser)
router.post('/users',getUserByName)
router.put('/updateUser/:id',updateUserById)
router.put('/updateallUser',UpdateAllUserByEmail)
router.delete('/deleteUser/:id',deleteUserById)
router.post('/login',login)
router.get('/auth',auth)
router.delete('/deletAllUsers',deleteAllUsers)
module.exports= router;




