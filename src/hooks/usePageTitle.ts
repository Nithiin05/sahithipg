import { useEffect } from 'react'

const SITE = 'INI-CET Preparation'
export const DEFAULT_TITLE = 'INI-CET AIIMS Preparation | PYQs, Clinical MCQs & Mock Tests'

/** Sets the browser tab title; pass nothing for the home/default title. */
export function usePageTitle(name?: string) {
  useEffect(() => {
    document.title = name ? `${name} | ${SITE}` : DEFAULT_TITLE
  }, [name])
}
