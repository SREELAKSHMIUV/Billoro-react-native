import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://faew.backend.webwic.com",
});