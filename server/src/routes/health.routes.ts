import { Router } from "express"
import { healthCheck } from "../controllers/health.controllers"

const router = Router()

router.get("/check", healthCheck)

export default router