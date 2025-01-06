import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: [
    '@wxt-dev/module-react',
    '@wxt-dev/auto-icons',
    '@wxt-dev/i18n/module',
  ],
  srcDir: 'src',
  manifest: {
    name: '__MSG_extension_name__',
    description: '__MSG_extension_description__',
    default_locale: 'en',
    permissions: ['storage'],
    browser_specific_settings: {
      gecko: {
        id: '{2daebd81-4db3-58e1-b210-4909f11f7990}',
      },
    },
  },
  manifestVersion: 3,
});
