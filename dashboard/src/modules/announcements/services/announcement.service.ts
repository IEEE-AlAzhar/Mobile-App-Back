import CrudService from "configurations/crud.service";

export default class AnnouncementService extends CrudService {
  constructor() {
    super();
    this.initialize("/announcements");
  }
}
