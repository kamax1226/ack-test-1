export const queryTypes = `
  type Query {
    connection: String!
    _checkAuth: String
  }
`;

export const queryResolvers = {
  Query: {
    connection: () => 'Connected',
    _checkAuth: (_, args, context) =>
      `Authorized | CurentUserId ${context.user.id}!`
  }
};
