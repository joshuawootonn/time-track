# API

I am in the process of migrating from lb3 to lb4, so forgive the mess.

## PM2 setup (one-time per droplet)

The API runs under PM2 using `api/ecosystem.config.js` (process name `api`, timestamped logs, etc).

PM2 remembers the options it was started with, so this only needs to be done once.
After that, `pm2 restart all` keeps the same settings.

```sh
cd ~/time-track/api
pm2 ls                         # find the old hand-started process, if any
pm2 delete <old-name>
pm2 start ecosystem.config.js
pm2 save                       # restore this setup after a droplet reboot
```

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
cd api
pnpm i
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

> [!IMPORTANT]
>
> If `ecosystem.config.js` has changed, do the following to apply them during the restart:
>
> ```sh
> pm2 restart ecosystem.config.js --update-env
> pm2 save
> ```

## 3. Check the App and API

### 3.1. API logs

Log files can be found here:

- `~/.pm2/logs/api-out.log`
- `~/.pm2/logs/api-error.log`

To get last N messages from the log, run this:

```sh
pm2 logs api --lines 50 --nostream
```

### 3.2. App and Electron app

It is important to check if the update did not break the client apps (App and Electron app).
