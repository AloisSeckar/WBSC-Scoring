import cs from '@/assets/lang/cs.json'
import en from '@/assets/lang/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, cs },
  warnHtmlMessage: false,
}))
