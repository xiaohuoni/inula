import { createStore } from 'inula';

export default createStore({
  id: 'hello',
  actions: {
    changeName: (state) => {
      state.title = 'openinula';
    },
  },
  state: {
    title: 'inulajs',
  },
});
