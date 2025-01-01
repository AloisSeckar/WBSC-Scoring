import cs from '@/assets/lang/cs.json'
import en from '@/assets/lang/en.json'
import it from '@/assets/lang/it.json'

export default defineI18nConfig(() => ({
  legacy: false,
  strategy: 'no_prefix',
  locales: ['en', 'cs', 'it'],
  locale: 'en',
  defaultLocale: 'en',
  fallbackLocale: 'en',
  messages: { en, cs, it },
  warnHtmlMessage: false,
}))
