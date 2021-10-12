import { roles, permissions } from '../../../directives';

export const types = `
  type User {
    id: String!
    name: String
    username: String
    email: String @${roles.is.admin}
  }`;

export const typeResolvers = {
  //
};
