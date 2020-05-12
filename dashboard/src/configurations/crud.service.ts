import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

instance.defaults.headers.common["x-access-token"] = localStorage.getItem(
  "token"
);

export default class CrudService {
  _http: typeof axios;
  url: string;
  parentUrl?: string;

  constructor() {
    this._http = instance as typeof axios;

    this.initialize = this.initialize.bind(this);
    this.list = this.list.bind(this);
  }

  initialize(url: string, parentUrl = "") {
    this.url = url;
    this.parentUrl = parentUrl;
  }

  async list(parentId?: string) {
    let reqUrl =
      this.parentUrl || parentId
        ? `${this.parentUrl + parentId}${this.url}/list`
        : `${this.url}/list`;

    let { data: records } = await this._http.get(reqUrl);
    return records;
  }

  async getById(id: string, parentId?: string) {
    let reqUrl =
      this.parentUrl || parentId
        ? `${this.parentUrl + parentId}${this.url}/${id}`
        : `${this.url}/${id}`;

    let { data: record } = await this._http.get(reqUrl);
    return record;
  }

  async create(item: any, parentId?: string) {
    let reqUrl =
      this.parentUrl || parentId
        ? `${this.parentUrl + parentId}${this.url}/new`
        : `${this.url}/new`;

    let { data: record } = await this._http.post(reqUrl, item);
    return record;
  }

  async update(id: string, item: any) {
    let reqUrl = this.parentUrl
      ? `${this.parentUrl}${this.url}/${id}`
      : `${this.url}/${id}`;

    let { data: record } = await this._http.put(reqUrl, item);
    return record;
  }

  async delete(id: string, parentId?: string) {
    let reqUrl =
      this.parentUrl || parentId
        ? `${this.parentUrl + parentId}${this.url}/${id}`
        : `${this.url}/${id}`;

    let { data } = await this._http.delete(reqUrl);
    return data;
  }
}
