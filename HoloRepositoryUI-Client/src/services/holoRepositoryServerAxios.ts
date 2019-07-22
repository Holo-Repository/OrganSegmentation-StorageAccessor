import axios from "axios";

const headers = {
  Accept: "application/json"
};

const apiVersion = 1;
const apiPrefix = `/api/v${apiVersion}`;

export const routes = {
  practitioners: "practitioners",
  patients: "patients",
  holograms: "holograms",
  pipelines: "pipelines",
  imagingStudySeries: "imagingStudySeries"
};

const holoRepositoryServerAxios = axios.create({
  baseURL: `http://localhost:3001${apiPrefix}`,
  timeout: 1000,
  headers
});

export default holoRepositoryServerAxios;
