import cs from '@/assets/lang/cs.json'
import en from '@/assets/lang/en.json'
import it from '@/assets/lang/it.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, cs, it },
  warnHtmlMessage: false,
}))
