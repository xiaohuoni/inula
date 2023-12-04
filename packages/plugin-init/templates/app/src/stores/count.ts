import { createStore } from 'inula';

export default createStore({
  id: 'count',
  actions: {
    addition: (state) => {
      state.number += 1;
    },
    subtraction: (state) => {
      state.number -= 1;
    },
  },
  state: {
    number: 0,
  },
});
