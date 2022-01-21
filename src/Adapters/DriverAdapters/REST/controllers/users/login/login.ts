import { Request, Response } from "express";

const login = (req: Request, res: Response) => {
  try {
    res.status(200).json({ success: true, data: "success" });
  } catch (error) {}
};

export { login };
