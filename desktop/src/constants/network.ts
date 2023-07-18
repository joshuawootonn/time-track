import { getCred } from './storage'

export const HOST = (): string => {
  const cred = getCred()

  if (cred == null) return ''

  return `${cred.ip}/api`
}
