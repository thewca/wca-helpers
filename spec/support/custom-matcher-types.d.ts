declare namespace jasmine {
  interface Matchers<T> {
    toHaveRanking(expected?: number, expectationFailOutput?: any): boolean;
  }
}
