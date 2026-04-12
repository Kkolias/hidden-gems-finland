import { db } from "../database";
import oldMarkers from "../../old-markers.json";

interface OldMarker {
  type: string;
  properties: {
    Name: string;
    description: string;
    gx_media_links: null | string;
    "Article describing the cave at": null;
    Photo: null | string;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number]; // longitude, latitude, altitude
  };
}

async function convertOldMarkersToLocationPoints() {
  const oldPoints = oldMarkers as OldMarker[];
  console.log("Converted now saving to database...");

  const locationPoints = oldPoints.map((marker) => ({
    name: marker.properties?.description || 'Unnamed Location',
    description: marker?.properties?.Name || null,
    category: null,
    latitude: marker.geometry.coordinates[1],
    longitude: marker.geometry.coordinates[0],
    image_url: marker.properties?.gx_media_links || null,
  }));

  await db.insertInto("location_points").values(locationPoints).execute();
}

convertOldMarkersToLocationPoints()
  .then(() => {
    console.log(
      "Old markers have been converted and inserted into the database.",
    );
  })
  .catch((error) => {
    console.error("Error occurred while converting old markers:", error);
  });
