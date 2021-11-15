import { rule } from "graphql-shield";

export const isAuthenticated = rule()(async (parents, args, { req }, info) => {
  if (req.isAuth) {
    return true
  }
  return new Error("You need to login to do this action")
})

export const isAdmin = rule()(async (parents, args, { req }, info) => {
  if (req.role === "ADMIN") {
    return true
  }
  return new Error("You need to be in the admin role")
})

