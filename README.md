# Time Track

[![Coverage Status](https://coveralls.io/repos/github/joshuawootonn/time-track/badge.svg)](https://coveralls.io/github/joshuawootonn/time-track)

### About

Time Track is a program primarily written for All American Concrete Inc. It is designed to document employee cost.

### Purpose

The reason for this accumulation of data is to be more accurate in expense estimation in the pursuit of efficiency.

### Usage

Coming soon! This is in the works

### Releasing new Electron version of Desktop app

#### Prerequisites (one-time instruction)

1. [Add GH_TOKEN](https://github.com/settings/tokens/new) to your environment based on the instructions [in electron-builder's docs](https://www.electron.build/auto-update.html#githuboptions-publishconfiguration).

1. Install `yarn`:

   ```sh
   npm install --global yarn
   ```

1. For creating a release you'd need both Windows and Mac machines.

#### Creating new release

1. Make sure to pull recent `master`.

1. Switch to the `desktop` folder.

1. Delete all `node_modules` folder. This step is needed for `yarn` to run correctly after `pnpm` or `npm` was used.

   ```sh
   rm -rf node_modules
   ```

1. Run `yarn` to install `node_modules` back:

   ```sh
   yarn
   ```

1. Update version in `desktop/package.json` (do not commit yet)

1. Build the electron app using the following commands.

   - On Windows:

   ```sh
   yarn run dist-win
   ```

   - On Mac:

   ```sh
   yarn run dist-mac
   ```

   If the commands above complete successfully, there will be a `Draft` release created in the project's [`Releases` section](https://github.com/joshuawootonn/time-track/releases).

1. Check if the application runs correctly. Open the [`Releases` section](https://github.com/joshuawootonn/time-track/releases), find a `Draft` release. In its `Assets` section, download and install the draft version of the app and make sure it works. After you are done, install a previous version of the app, to check the autoupdate later.

1. Open the [`Releases` section](https://github.com/joshuawootonn/time-track/releases), find a `Draft` release and click `Edit` button.

1. Write release notes, or use auto-populate. Make sure all deliverables are uploaded. Publish the release.

#### Testing auto-update

1. Install and run locally the previous version.

1. Open a log file (you can do it in the browser, by navigating to the file path). Logs is located at %AppData%\timetrack\log.log

1. Close out TimeTrack locally

1. Run TimeTrack and make sure it shows the upgrade notification. You might need to restart it to get a new version.

#### Updating a version in `desktop/package.json`

After completing all the steps above, make sure the version is updated in the `desktop/package.json` file, commit and merge it as a new PR (it should have only one file, `desktop/package.json`).

### Help

For more usage help try [my website](http://joshuawootonn.com), or my email(joshuawootonn@gmail.com)

Cheers!<br />
Josh
