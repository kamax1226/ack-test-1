import { roles, permissions } from '~/directives'

const { GraphQLScalarType, Kind } = require('graphql');

const randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const queryTypes = `
  type Query {
    _test31: Int
    test32: EmailAddress @${roles.is.user}
    test33: String @${permissions.can.read.user_profile}
    test34: User @${roles.is.user}
    test4 (profile: String): Int
    test5 (profile: String): Int
  }
`;

export const queryResolvers = {
  Query: {
    _test31: () => {
      return randomIntFromInterval(1, 100);
    },
    test32: () => {
      return 'info@test.com';
    },
    test33: () => {
      return 'READ USER_PROFILE';
    },
    test34: () => {
      return 'USER';
    },
    test4: async (_, { profile }) => {
      return profile.length;
    },
    test5: (_, { profile }) => {
      try {
        if (profile && profile != undefined && profile.length >= 8) {
          return profile.length;
        } else {
          throw new Error("Input is not valid");
        }

      } catch (e) {

      }
    }
  },
};
