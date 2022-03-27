import http from "../http-common";

let csrf = ""

class AuthService {
  get_csrf() {
    return http.get('/csrf')
    .then((ress) => csrf = ress.data)
  }

  login(user) {
    return http
      .post("/auth/login", {
        _token: this.csrf,
        email: user.email,
        password: user.password,
      })
      .then((response) => console.log(response));
  }
}

export default new AuthService();
