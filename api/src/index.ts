import { ApplicationConfig } from './application'
import { ExpressServer } from './express-server'

export * from './application'

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options)
  await server.boot()
  const address = await server.start()

  console.log(`Server is running at ${address}`)
}

if (require.main === module) {
  const config: ApplicationConfig = {
    rest: {
      port: process.env.PORT ?? 4000,
      host: process.env.HOST ?? 'localhost',
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      // Use the LB4 application as a route. It should not be listening.
      listenOnStart: false,
    },
    lb3app: {
      mode: 'fullApp',
    },
  }
  main(config).catch((err) => {
    console.error('Cannot start the application.', err)
    process.exit(1)
  })
}
