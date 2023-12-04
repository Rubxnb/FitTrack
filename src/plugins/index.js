/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import store from '@/store';
import { setupCalendar } from 'v-calendar';

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(store)
    .use(setupCalendar, {})
}
