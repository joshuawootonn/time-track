import { Request, Response } from 'express'
import path from 'path'
import { Server } from 'http'

import { once } from 'events'
import { ApplicationConfig } from '@loopback/core'
import { ApiApplication } from './application'
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { accessTokenMiddleware } from './accessToken/access-token.middleware'

export class ExpressServer {
  public readonly app: express.Application
  public readonly lbApp: ApiApplication
  private expressServer?: Server

  constructor(options: ApplicationConfig = {}) {
    this.app = express()
    this.lbApp = new ApiApplication(options)

    this.app.use(compression())
    this.app.use(cors())
    this.app.use(helmet())

    this.app.use(accessTokenMiddleware)

    this.app.get('/api/crew-summary', function (_req: Request, res: Response) {
      res.send('crew summary')
    })

    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/index.html'))
    })
    this.app.get('/health', function (_req: Request, res: Response) {
      res.send('good')
    })

    this.app.use('/api', this.lbApp.requestHandler)

    this.app.use(express.static('public'))
  }

  async boot() {
    await this.lbApp.boot()
  }

  public async start(): Promise<string> {
    await this.lbApp.start()
    const port = this.lbApp.restServer.config.port ?? 3000
    const host = this.lbApp.restServer.config.host || '127.0.0.1'
    this.expressServer = this.app.listen(port, host)
    await once(this.expressServer, 'listening')

    return `http://${host}:${port}`
  }

  // For testing purposes
  public async stop() {
    if (!this.expressServer) return
    await this.lbApp.stop()
    this.expressServer.close()
    await once(this.expressServer, 'close')
    this.expressServer = undefined
  }
}
