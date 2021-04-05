import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },
  delete(id) {
    return Api().delete(`/user/delete/${id}`,);
  },

  logout() {
    return Api().post("/logout");
  },

  all() {
    return Api().get('/users');
  },
  auth() {
    return Api().get("/user");
  },
  packages() {
    return Api().get("/user/packages");
  },
    pre_alerts() {
    return Api().get("/user/pre_alerts");
  },
  invoices() {
    return Api().get("/user/invoices");
  },
  activity() {
    return Api().get('/user/activity')
  }
};
