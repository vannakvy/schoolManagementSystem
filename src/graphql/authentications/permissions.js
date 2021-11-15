
import { shield, and } from "graphql-shield";
import { isAuthenticated, isAdmin } from './roles'
export const permissions = shield({

});