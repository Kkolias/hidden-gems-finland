import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { LocationPointUpdate, NewLocationPoint } from "../types/db";
import { isAdmin } from "../utils/isAdmin";
import locationPointService from "./location-point.service";
import { Router, Request } from "express";
import { validateBody } from "../utils/validateBody";
import {
  CreateLocationDto,
  LocationPointIdDto,
  UpdateLocationDto,
} from "./dto/location-point.dto";
import { getRouteBetweenPoints } from "./utils/getRouteBetweenPoints";

const LOCATION_POINT_PREFIX = "/location-points";

const LOCATION_POINT_PATHS = {
  GET_ALL: `${LOCATION_POINT_PREFIX}/get-all`,
  CREATE: `${LOCATION_POINT_PREFIX}/create`,
  UPDATE: `${LOCATION_POINT_PREFIX}/update`,
  CHECK_LOCATIONS: `${LOCATION_POINT_PREFIX}/check-locations`,
  TEST: `${LOCATION_POINT_PREFIX}/test`,
  GET_ROUTE: `${LOCATION_POINT_PREFIX}/get-route`,
  UPVOTE_POINT: `${LOCATION_POINT_PREFIX}/upvote`,
  REMOVE_UPVOTE_POINT: `${LOCATION_POINT_PREFIX}/remove-upvote`,
};

const MINUTE_IN_MS = 60 * 1000;
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

const createLimiter = rateLimit({
  windowMs: HOUR_IN_MS,
  limit: 5,
  message: { error: "Too many locations created, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return ipKeyGenerator(req.ip || "");
  },
});

const updateLimiter = rateLimit({
  windowMs: MINUTE_IN_MS,
  limit: 5,
  message: { error: "Too many update requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return ipKeyGenerator(req.ip || "");
  },
});

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
  createLimiter,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    const location = body?.location as NewLocationPoint;

    const errors = await validateBody(CreateLocationDto, location);
    if (errors) {
      return res
        .status(400)
        .json({ error: "Invalid payload", details: errors });
    }

    const locationPoints =
      await locationPointService.createLocationPoint(location);
    res.json(locationPoints);
  }),
);

router.post(
  LOCATION_POINT_PATHS.UPDATE,
  updateLimiter,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    const location = body?.location as LocationPointUpdate;

    const errors = await validateBody(UpdateLocationDto, location);
    if (errors) {
      return res
        .status(400)
        .json({ error: "Invalid payload", details: errors });
    }

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

router.get(
  LOCATION_POINT_PATHS.GET_ROUTE,
  tryCatchWrapper(async (req, res) => {
    const coordinates = {
      startLat: parseFloat(req.query.startLat as string),
      startLng: parseFloat(req.query.startLng as string),
      endLat: parseFloat(req.query.endLat as string),
      endLng: parseFloat(req.query.endLng as string),
    };

    const locationPoints = await getRouteBetweenPoints(coordinates);
    res.json(locationPoints);
  }),
);

router.post(
  LOCATION_POINT_PATHS.UPVOTE_POINT,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    const id = body?.id as number;

    const errors = await validateBody(LocationPointIdDto, { id });
    if (errors) {
      return res
        .status(400)
        .json({ error: "Invalid payload", details: errors });
    }

    const updatedPoint = await locationPointService.upvoteLocationPoint(id);
    res.json(updatedPoint);
  }),
);

router.post(
  LOCATION_POINT_PATHS.REMOVE_UPVOTE_POINT,
  tryCatchWrapper(async (req: Request, res) => {
    const body = req?.body as any;
    const id = body?.id as number;

    const errors = await validateBody(LocationPointIdDto, { id });
    if (errors) {
      return res
        .status(400)
        .json({ error: "Invalid payload", details: errors });
    }

    const updatedPoint =
      await locationPointService.removeUpvoteLocationPoint(id);
    res.json(updatedPoint);
  }),
);

export default router;
