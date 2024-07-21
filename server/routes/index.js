import express from "express";
import userRoutes from "./UserRoutes.js";
import taskRoutes from "./TicketRoutes.js";

const router = express.Router();

router.use("/user", userRoutes); //api/user/login
router.use("/task", taskRoutes);

export default router;