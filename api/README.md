# My Application

I am in the process of migrating from lb3 to lb4, so forgive the mess.

# api

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

# Releasing new API version

## 1. Prepare a PR

Preferably the PR should be separated from the client (App/Electron) changes, and backward compatible with the previous version of the client.

## 2. Deploy the PR

### 2.1. Merge the PR in GitHub

### 2.2. Connect to DigitalOcean droplet

Open `time-track-drop-prod` droplet, and click `Console`

### 2.3. Pull `master` branch and rebuild the API

```sh
cd ~/time-track
git pull
pnpm i
cd api
pnpm build
```

### 2.4. Restart PM2 instance

> [!TIP]
> To inspect currently running instances, run:
>
> ```sh
> pm2 ls
> ```

```sh
pm2 restart all
```

## 3. Check the App and API

It is important to check if the update did not break the client apps (App and Electron app).
