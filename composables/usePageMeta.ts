export const WBSC_TYPE = 'website'
export const WBSC_URL = 'https://wbsc-scoring.netlify.app'
export const WBSC_TITLE = 'WBSC Scoring Creator'
export const WBSC_DSCR = 'Visualization of WBSC baseball/softball scoring system for educational purposes'

export type MetaDef = {
  type?: 'website' | 'article'
  url?: string | Ref<string>
  title?: string | Ref<string>
  dscr?: string | Ref<string>
}

export const WBSC_PAGE_META: MetaDef = {
  type: WBSC_TYPE,
  url: WBSC_URL,
  title: WBSC_TITLE,
  dscr: WBSC_DSCR,
}

export function usePageMeta(meta: MetaDef) {
  return useSeoMeta({
    title: meta?.title || WBSC_TITLE,
    description: meta?.dscr || WBSC_DSCR,
    ogType: meta?.type || WBSC_TYPE,
    ogUrl: meta?.url || WBSC_URL,
    ogTitle: meta?.title || WBSC_TITLE,
    ogDescription: meta?.dscr || WBSC_DSCR,
    ogImage: 'https://wbsc-scoring.netlify.app/demo.png',
    twitterCard: 'summary_large_image',
  })
}

export function getPageTitle(route: string) {
  const title = WBSC_TITLE
  switch (route) {
    case '/help':
      return title + ' - Help'
    case '/project':
      return title + ' - Project'
    case '/report':
      return title + ' - Report'
    default:
      return title
  }
}
