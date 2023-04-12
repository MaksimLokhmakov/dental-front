import axios from "../../core/axios";

export default {
  get: () => axios.get("/appointments"),
  add: (appointment) => axios.post("/appointments", appointment),
  delete: (id) => axios.delete(`/appointments/${id}`),
  update: (id, appointment) => axios.patch(`/appointments/${id}`, appointment),
};
