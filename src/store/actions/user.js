export function setUser(user) {
  return {
    type: "@user/SET",
    user,
  };
}

export function logout() {
  return {
    type: "@user/LOGOUT",
  };
}