import { defineConfig } from 'inula';

export default defineConfig({
  title: '123',
  plugins: [
    require.resolve('@aluni/plugin-x'),
    require.resolve('@aluni/plugin-intl'),
  ],
});
