import http from "../http-common";

let csrf = "";

class AuthService {
  get_csrf() {
    return http.get("/csrf").then((ress) => (this.csrf = ress.data));
  }

  login(user) {
    return http
      .post("/auth/login", {
        _token: this.csrf,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("auth", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("auth");
  }
}

export default new AuthService();
