import { Router } from "express";
import { dnsRequestController } from "../controllers/dns.controllers";

const router = Router()
router.post("/", dnsRequestController)
export default router