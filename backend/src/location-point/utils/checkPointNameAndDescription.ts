import repositoryService from "../../repository/repository-service";

// tsekkaa onko nimi lyhyempi kuin description jolloin voi olettaa että alkuperäisessä nämä on väärinpäin syötetty

const UNNAMED_LOCATION = "Unnamed Location";

export async function checkPointNameAndDescription(): Promise<{
  affected: number;
}> {
  const locations = await repositoryService.locationPointStore.findAll();

  const locationsToUpdate = locations?.filter((loc) => {
    const nameLength = loc?.name?.length || 0;
    const descriptionLength = loc?.description?.length || 0;

    if (loc?.name === UNNAMED_LOCATION && descriptionLength > 0) return true;

    if (!nameLength || !descriptionLength) return false;

    return nameLength > descriptionLength;
  });

  if (!locationsToUpdate?.length) {
    return { affected: 0 };
  }

  const updatePayload = locationsToUpdate
    ?.map((loc) => {
      if (loc?.name === UNNAMED_LOCATION) {
        return {
          id: loc.id,
          name: loc.description,
          description: "",
        };
      }

      return {
        id: loc.id,
        name: loc.description,
        description: loc.name,
      };
    })
    ?.filter((i) => i) as { id: number; name: string; description: string }[];

  await repositoryService.locationPointStore.updateListNameAndDescription(
    updatePayload,
  );

  return { affected: updatePayload.length };
}
