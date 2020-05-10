import CrudService from "configurations/crud.service";

export default class UserService extends CrudService {
  constructor() {
    super();
    this.initialize("/users");

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(cred: { code: string }) {
    let response = await this._http.post(`${this.url}/login`, cred);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    return response;
  }

  async logout() {
    let response = await this._http.get(`${this.url}/logout`);

    localStorage.setItem("user", null);
    localStorage.removeItem("token");

    return response;
  }

  isUserLoggedIn() {
    if (localStorage.getItem("token")) return true;
    else return false;
  }

  async getById(id: string) {
    let { data: record } = await this._http.get(`${this.url}/me/${id}`);
    return record;
  }
}
