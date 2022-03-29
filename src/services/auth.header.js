export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("auth"));
  if (user && user.access_token) {
    return { Authorization: "Bearer " + user.access_token };
  } else {
    return {};
  }
}
