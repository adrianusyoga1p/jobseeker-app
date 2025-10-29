export default defineNuxtRouteMiddleware((to) => {
  const { isLogin, user } = useAuthStore();
  const loginPath = "/auth/sign-in";

  if (!isLogin && to.path !== loginPath) {
    if (to.meta.layout === "default" || to.path.startsWith("/auth")) {
      return;
    }
    return navigateTo(loginPath);
  }

  if (isLogin) {
    const isAdmin = user?.role === "admin";
    const initAppPath = "/app/job-list";
    const initAdminPath = "/admin/job-list";

    if (to.path.startsWith("/auth")) {
      return isAdmin ? navigateTo(initAdminPath) : navigateTo(initAppPath);
    }

    if (to.path.startsWith(initAdminPath) && !isAdmin) {
      return navigateTo(initAppPath);
    }

    if (to.path.startsWith(initAppPath) && isAdmin)
      return navigateTo(initAdminPath);
  }
});
