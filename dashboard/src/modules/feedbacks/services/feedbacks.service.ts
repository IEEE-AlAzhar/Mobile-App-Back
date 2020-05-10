import CrudService from "configurations/crud.service";

export default class FeedbackService extends CrudService {
  parentUrl: string;

  constructor() {
    super();
    this.initialize("/feedbacks", "users/");
  }
}
