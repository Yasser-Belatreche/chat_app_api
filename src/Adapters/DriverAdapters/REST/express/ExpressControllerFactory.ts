import { Request, Response } from "express";
import { ControllerFunction } from "../@types/RequestReponse.interfaces";

const makeExpressController = (controller: ControllerFunction) => {
  return async (req: Request, res: Response) => {
    const result = await controller({ body: req.body, headers: req.headers });

    const { status, ...rest } = result;
    res.status(result.status as number).json(rest);
  };
};

export { makeExpressController };
