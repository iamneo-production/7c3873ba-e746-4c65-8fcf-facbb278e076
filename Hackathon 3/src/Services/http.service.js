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

export const postCheckoutData = (checkoutData) => {
  return http.post("/checkoutHistory", checkoutData);
};

export const getCheckoutHistory = (user) => {
  return http.get(`/checkoutHistory`, { params: { user } });
};
