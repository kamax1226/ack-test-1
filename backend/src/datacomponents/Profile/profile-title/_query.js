function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const queryTypes = `
  type Query {
    _test31: Int
  }
`;

export const queryResolvers = {
  Query: {
    _test31: () => {
      return randomIntFromInterval(1, 100);
    }
  },
};
