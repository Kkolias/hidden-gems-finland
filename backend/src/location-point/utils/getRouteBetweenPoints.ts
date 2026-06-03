import { OPENROUTESERVICE_URL } from "../../constants/directions-api.const";
import { ROUTE_API_KEY } from "../../constants/env.const";

interface InputCoordinates {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface RouteResponse {
  features: {
    properties: {
      segments: {
        distance: number;
        duration: number;
      }[];
      summary: { distance: number; duration: number };
    };
    geometry: {
      type: "LineString";
      coordinates: [number, number][];
    };
  }[];
}

export interface DirectionRouteResult {
  data: {
    distance: number;
    duration: number;
    geometry: {
      type: "LineString";
      coordinates: [number, number][];
    };
  } | null;
  error?: string;
}

export async function getRouteBetweenPoints(
  coordinates: InputCoordinates,
): Promise<DirectionRouteResult> {
  const { startLat, startLng, endLat, endLng } = coordinates;
  const response = await fetch(OPENROUTESERVICE_URL, {
    method: "POST",
    headers: {
      Authorization: ROUTE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinates: [
        [startLng, startLat],
        [endLng, endLat],
      ],
    }),
  });

  if (!response.ok) {
    return {
      data: null,
      error: "Error getting route. Try again later.",
    };
  }

  const data: RouteResponse = await response.json();
  const route = data.features?.[0];
  if (!route) {
    return {
      data: null,
      error:
        "No route found between the points. Try moving points closer to roads.",
    };
  }

  return {
    data: {
      distance: route.properties.summary.distance,
      duration: route.properties.summary.duration,
      geometry: route.geometry,
    },
  };
}
