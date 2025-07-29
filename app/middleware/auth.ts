import { defineNuxtRouteMiddleware, navigateTo } from "#app"

export default defineNuxtRouteMiddleware((to, from) => {
  // This is a placeholder for your authentication logic.
  // In a real application, you would check if the user is authenticated
  // and redirect them if they are not.

  const isAdmin = useAuthStore().isAdmin;

  console.log(`Navigating from ${from.path} to ${to.path}. Auth middleware running.`)

  // Example: If you wanted to redirect unauthenticated users to a login page:
  // const isAuthenticated = false // Replace with actual auth check
  if (!isAdmin && to.path.startsWith("/admin")) {
    // return navigateTo("/login")
  }
})
