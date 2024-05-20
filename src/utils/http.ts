import axios, { AxiosInstance } from "axios";
import { config } from "../constants/config";

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${config.apiKey}`
      }
    })
  }
}

const http = new Http().instance
export default http;