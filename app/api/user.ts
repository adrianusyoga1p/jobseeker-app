export function apiUserGetList() {
  return api<User[]>({
    method: "GET",
    url: "/users",
  });
}
