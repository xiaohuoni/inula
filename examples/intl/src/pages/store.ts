import { createStore } from 'inula';

export default createStore({
  id: 'hello12',
  actions: {
    changeName: (state) => {
      state.title = 'openinula';
    },
  },
  state: {
    title: 'inulajs',
  },
});
