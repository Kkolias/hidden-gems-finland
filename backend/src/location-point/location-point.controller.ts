import locationPointService from "./location-point.service";
import { Router } from "express";

const LOCATION_POINT_PREFIX = "/location-points";

const LOCATION_POINT_PATHS = {
  GET_ALL: `${LOCATION_POINT_PREFIX}/get-all`,
};

const router = Router();

function tryCatchWrapper(handler: (req: any, res: any) => Promise<void>) {
  return async (req: any, res: any) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

router.get(
  LOCATION_POINT_PATHS.GET_ALL,
  tryCatchWrapper(async (_req, res) => {
    const locationPoints = await locationPointService.getAllLocationPoints();
    res.json(locationPoints);
  }),
);

export default router;
