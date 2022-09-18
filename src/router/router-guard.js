import { auth } from "../boot/firebase";

export default (to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    return next("/");
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    return next("/login");
  }

  return next();
};
