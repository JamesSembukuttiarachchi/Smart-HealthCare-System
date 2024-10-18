import express from "express";

import {
  signupHospital,
  loginHospital,
  getAllHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController";

const router = express.Router();

router.post("/hospitals/signup", signupHospital);
router.post("/hospitals/login", loginHospital);
router.get("/hospitals", getAllHospitals);
router.post("/hospitals", createHospital); // Route for creating a new hospital
router.put("/hospitals/:id", updateHospital); // Route for updating a hospital
router.delete("/hospitals/:id", deleteHospital); // Route for deleting a hospital

export default router;
