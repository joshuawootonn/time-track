import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { accessToken } from './access-token.schema'

export const accessTokenZodSchema = createSelectSchema(accessToken)

export type AccessToken = z.infer<typeof accessTokenZodSchema>
