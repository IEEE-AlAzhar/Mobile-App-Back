import CrudService from "configurations/crud.service";

export default class AchievementService extends CrudService {
  parentUrl: string;

  constructor() {
    super();
    this.initialize("/achievements", "users/");
  }
}
