import { Router } from "express";
import { createForm, listForms, getForm, updateForm, deleteForm } from "../controllers/form.controller.js";

const router = Router();

router.post("/", createForm);
router.get("/", listForms);
router.get("/:id", getForm);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
