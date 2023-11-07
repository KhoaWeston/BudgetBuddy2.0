import express from "express";
// router object
const router = express.Router();

// Define your routes and corresponding controllers here 
 router.get("/test", testController);

export default router;
