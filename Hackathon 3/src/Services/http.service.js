import http from "../http-common";

export const CheckLogin = (email) => {
  return http.get(`/user/${email}`);
};

export const getAllDataPlans = () => {
  return http.get(`/datapack`);
};
export const getAllCallPlans = () => {
  return http.get(`/callpack`);
};
// export const getAllDays = (email) => {
//   return http.get(`/user/${email}`);
// };
// export const getAllTask = () => {
//   return http.get(`/tasks`);
// };
// export const CreateNewEvent = (data) => {
//   return http.post(`/tasks/`, data);
// };
// export const DeleteEvent = (id) => {
//   return http.delete(`/tasks/${id}`);
// };

// export const updateTask = (id, data) => {
//   return http.put(`/tasks/${id}`, data);
// };
