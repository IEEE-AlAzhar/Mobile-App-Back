import CrudService from "configurations/crud.service";

export default class CommitteeService extends CrudService {
  constructor() {
    super();
    this.initialize("/committees");
  }
}
