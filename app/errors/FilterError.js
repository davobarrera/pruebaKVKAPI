export default class FilterError extends Error {
    constructor(message) {
      super(message);
      this.name = "FilterError"; 
    }
  }