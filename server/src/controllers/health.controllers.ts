import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
    const data = {
        Status: "Healthy",
        timestamp: new Date().toISOString(),
    }
    res.status(200).json(data)
}