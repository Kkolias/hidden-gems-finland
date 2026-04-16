import { LocationPointUpdate, NewLocationPoint } from "../types/db";
import locationPointService from "./location-point.service";
import { Router } from "express";

const LOCATION_POINT_PREFIX = "/location-points";

const LOCATION_POINT_PATHS = {
  GET_ALL: `${LOCATION_POINT_PREFIX}/get-all`,
  CREATE: `${LOCATION_POINT_PREFIX}/create`,
  UPDATE: `${LOCATION_POINT_PREFIX}/update`,
};

const router = Router();

function tryCatchWrapper(handler: (req: any, res: any) => Promise<void>) {
  return async (req: any, res: any) => {
    console.log("HERE", req)
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

router.post(
  LOCATION_POINT_PATHS.CREATE,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    console.log("BODY", body)
    const location = body?.location as NewLocationPoint;
    const locationPoints =
      await locationPointService.createLocationPoint(location);
    res.json(locationPoints);
  }),
);

router.post(
  LOCATION_POINT_PATHS.UPDATE,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    const location = body?.location as LocationPointUpdate;
    const locationPoints =
      await locationPointService.updateLocationPoint(location);
    res.json(locationPoints);
  }),
);

export default router;
