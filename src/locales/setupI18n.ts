import type { App } from 'vue';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from './localeSetting';
import { useLocaleStoreWithOut } from './store';

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<any> {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as any;
  app.use(i18n);
}
