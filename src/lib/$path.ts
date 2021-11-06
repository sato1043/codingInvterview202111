/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  Home: {
    $url: (url?: { hash?: string }) => ({ pathname: '/Home' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
