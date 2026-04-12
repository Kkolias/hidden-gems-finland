import locationPointStore  from "./location-point-store";




export class RepositoryService {
  readonly locationPointStore = locationPointStore;
}

export default new RepositoryService();