import http from "./httpService";

const apiEndpoint = "/users";

export function registerUser(user) {
  const { username: email, password, name } = user;

  return http.post(apiEndpoint, {
    email,
    password,
    name,
  });
}
