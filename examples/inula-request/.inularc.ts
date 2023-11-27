import { defineConfig } from 'inula';

export default defineConfig({
  title: 'inula-request',
  plugins: [require.resolve('@aluni/plugin-request')],
});
