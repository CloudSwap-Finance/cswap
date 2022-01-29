const CSWAP_EXTENDED = 'https://cswap.finance/cswap-extended.json'
const CSWAP_TOP100 = 'https://cswap.finance/cswap-top-100.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // CSWAP_TOP100,
  // CSWAP_EXTENDED,
  // ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
