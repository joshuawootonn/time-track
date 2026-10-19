// PM2 config for the API on the DigitalOcean droplet.
// First time (replaces the hand-started process):
//   pm2 delete <old-name> && pm2 start ecosystem.config.js && pm2 save
// After editing this file:
//   pm2 restart ecosystem.config.js --update-env && pm2 save
module.exports = {
  apps: [
    {
      name: 'api',
      cwd: __dirname,
      script: 'dist/index.js',
      node_args: '-r source-map-support/register',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
