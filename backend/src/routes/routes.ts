import express from "express";
import locationPointController from "../location-point/location-point.controller";

const router = express.Router();

router.use(locationPointController);

export default router;
