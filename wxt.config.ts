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
  },
});
