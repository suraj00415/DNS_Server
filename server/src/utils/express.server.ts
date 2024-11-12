import express, { Express } from "express"
import healthRouter from "../routes/health.routes"
import dnsRouter from "../routes/dns.routes"
import bodyParser from "body-parser"
import cors from 'cors'

export const app: Express = express()
app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.use("/api/v1/health", healthRouter)
app.use("/api/v1/dns", dnsRouter)