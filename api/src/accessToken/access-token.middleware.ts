import { z } from 'zod'
import { db } from '../database/drizzle'
import { eq } from 'drizzle-orm'
import { accessToken } from './access-token.schema'
import { asyncHandler } from '../async-handler'
import { Handler } from 'express'

const accessTokenSchema = z.object({
  query: z.object({
    access_token: z
      .string()
      .transform(async (val) => {
        const result = await db.query.accessToken.findFirst({
          where: eq(accessToken.id, val),
        })

        if (result == null) return false

        const now = Date.now()
        const created = result.created?.getTime() ?? 0
        const elapsedSeconds = (now - created) / 1000
        const secondsToLive = result.ttl ?? 0
        const isValid = elapsedSeconds < secondsToLive

        return isValid
      })
      .pipe(z.literal<boolean>(true)),
  }),
})

export const accessTokenMiddleware: Handler = asyncHandler(
  async (req, res, next) => {
    if (['/api/users/login/', '/api/users/signup/'].includes(req.path))
      return next()

    const input = await accessTokenSchema.safeParseAsync(req)
    if (!input.success) {
      return res.status(401).send({
        error: {
          statusCode: 401,
          name: 'Error',
          message: 'Authorization Required',
          code: 'AUTHORIZATION_REQUIRED',
        },
      })
    }
    next()
  },
)
