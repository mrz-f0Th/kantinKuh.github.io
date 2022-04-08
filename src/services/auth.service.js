import http from "../http-common";
import authHeader from "../services/auth.header";

class AuthService {
  get_csrf() {
    return http.get("/csrf").then((ress) => {
      window.csrf = ress.data.toString();
      console.log(ress);
      console.log(window.csrf);
    });
  }

  login(user) {
    return http
      .post("/auth/login", {
        email: user.email,
        password: user.password,
      })
      .then(async (response) => {
        if (response.data.access_token) {
          localStorage.setItem("auth", JSON.stringify(response.data));
          await http
            .post("/auth/me", null, { headers: authHeader() })
            .then((ress) => {
              localStorage.setItem("me", JSON.stringify(ress.data));
            })
            .catch(() => console.log(authHeader));
        }
        return response.data;
      })
      .catch((e) => console.log(this.csrf));
  }
  logout() {
    return http
      .post("/auth/logout", null, {
        headers: authHeader(),
      })
      .then(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("me");
      });
  }
}

export default new AuthService();
