import { ADMIN_KEY } from "../constants/env.const";
import { LocationPointUpdate, NewLocationPoint } from "../types/db";
import { isAdmin } from "../utils/isAdmin";
import locationPointService from "./location-point.service";
import { Router, Request } from "express";

const LOCATION_POINT_PREFIX = "/location-points";

const LOCATION_POINT_PATHS = {
  GET_ALL: `${LOCATION_POINT_PREFIX}/get-all`,
  CREATE: `${LOCATION_POINT_PREFIX}/create`,
  UPDATE: `${LOCATION_POINT_PREFIX}/update`,
  CHECK_LOCATIONS: `${LOCATION_POINT_PREFIX}/check-locations`,
  TEST: `${LOCATION_POINT_PREFIX}/test`,
};

const router = Router();

function tryCatchWrapper(
  handler: (req: any, res: any) => Promise<void>,
  useAuth = false,
) {
  return async (req: any, res: any) => {
    if (useAuth) {
      if (!isAdmin(req)) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
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

router.post(
  LOCATION_POINT_PATHS.CHECK_LOCATIONS,
  tryCatchWrapper(async (_req, res) => {
    const result = await locationPointService.checkPointNameAndDescription();
    res.json(result);
  }, true /* useAuth */),
);

router.get(
  LOCATION_POINT_PATHS.TEST,
  tryCatchWrapper(async (req, res) => {
    res.json({
      message: "Test successful",
      timestamp: new Date().toISOString(),
    });
  }, true /* useAuth */),
);

export default router;
