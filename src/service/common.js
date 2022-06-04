const AuthLocalStorage = {
  getCurrentUser: () => {
    const value = localStorage.getItem("currentUser");
    return JSON.parse(value);
  },
  setCurrentUser: (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },
  getAccessToken: () => {
    return localStorage.getItem("accessToken") || "";
  },
  removeToken: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
  },
};

const ErrorHandler = () => {};
