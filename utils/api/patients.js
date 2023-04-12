import axios from "../../core/axios";

export default {
  get: () => axios.get("/patients"),
  add: (patient) => axios.post("/patients", patient),
  show: (id) => axios.get(`/patients/${id}`),
  delete: (id) => axios.delete(`/patients/${id}`),
  update: (id, patient) => axios.patch(`/patients/${id}`, patient),
};
