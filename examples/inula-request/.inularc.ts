import { defineConfig } from 'inula';

export default defineConfig({
  title: 'inula-request',
  openAPI: [
    {
      schemaPath:
        'https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json',
      projectName: 'antdpro',
      mock: true,
    },
  ],
});
