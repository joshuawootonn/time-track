// Modules to control application life and create native browser window
const electron = require('electron')
const { autoUpdater } = require('electron-updater')
const app = electron.app
const ipcMain = electron.ipcMain
const url = require('url')
const path = require('path')
const settings = require('electron-settings')
const log = require('electron-log')
const isDev = require('electron-is-dev')

const IPCConstants = {
  SET_CRED: 'set_cred',
  GET_CRED: 'get_cred',
  SET_ACCESS_TOKEN: 'set_access_token',
  GET_ACCESS_TOKEN: 'get_access_token',
  CREATE_EXPORT: 'create_export',
  TOGGLE_FULLSCREEN: `toggle_fullscreen`,
  IS_FULLSCREEN: `is_fullscreen`,
}

const SETTINGS = {
  ACCESS_TOKEN: 'access_token',
  USER_CRED: 'user_cred',
  WINDOW: `window`,
}

var Excel = require('exceljs')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new electron.BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, 'preload.js'),
    },
    fullscreen: settings.get(`${SETTINGS.WINDOW}.isFullScreen`),
    show: false,
  })

  mainWindow.setMenu(null)
  mainWindow.show()

  // and load the index.html of the app.
  // load the index.html of the app.
  const startUrl = isDev
    ? 'http://localhost:5173/'
    : `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(startUrl)
  })

  log.transports.file.level = 'debug'
  autoUpdater.logger = log
}

app.on('ready', createWindow)

var updateTimer
app.on(`ready`, function () {
  app.setAppUserModelId('com.electron.timetrack')
  log.info(`App ready and checking for updates.`)
  autoUpdater.checkForUpdatesAndNotify().then()

  updateTimer = setInterval(() => {
    log.info(`Checking for updates again`)
    autoUpdater.checkForUpdatesAndNotify().then()
  }, 1000 * 10 * 60)
})

app.on(`ready`, () => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require(`electron-devtools-installer`)
    ;[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
      installExtension(extension)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log(`An error occurred: `, err))
    })
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  clearInterval(updateTimer)
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Access Token stuff
 */

ipcMain.on(IPCConstants.SET_ACCESS_TOKEN, (event, arg) => {
  settings.set(SETTINGS.ACCESS_TOKEN, arg)
  log.info('access token received', arg, settings.get(SETTINGS.ACCESS_TOKEN))
  event.returnValue = arg
})

ipcMain.on(IPCConstants.GET_ACCESS_TOKEN, (event) => {
  const accessToken = settings.get(SETTINGS.ACCESS_TOKEN)
  event.returnValue = accessToken
})

/**
 * Full Screen stuff
 */
ipcMain.on(IPCConstants.TOGGLE_FULLSCREEN, (event, arg) => {
  var isFullScreen = mainWindow.isFullScreen()
  mainWindow.setFullScreen(!isFullScreen)

  settings.set(`${SETTINGS.WINDOW}`, {
    isFullScreen: !isFullScreen,
  })
  event.returnValue = !isFullScreen
})
ipcMain.on(IPCConstants.IS_FULLSCREEN, (event, arg) => {
  event.returnValue = mainWindow.isFullScreen()
})

/**
 * Export stuff
 */

ipcMain.on(IPCConstants.SET_CRED, (event, arg) => {
  settings.set(`${SETTINGS.USER_CRED}`, {
    ip: arg.ip,
    username: arg.username,
    password: arg.password,
  })
  event.returnValue = arg
})

ipcMain.on(IPCConstants.GET_CRED, (event) => {
  const cred = {
    ip: settings.get(`${SETTINGS.USER_CRED}.ip`),
    username: settings.get(`${SETTINGS.USER_CRED}.username`),
    password: settings.get(`${SETTINGS.USER_CRED}.password`),
  }
  event.returnValue = cred
})

ipcMain.on(IPCConstants.CREATE_EXPORT, (event, arg) => {
  //console.log('we out here', arg);

  const { data } = arg

  var workbook = new Excel.Workbook()

  data.forEach((workSheetData) => {
    var worksheet = workbook.addWorksheet(workSheetData.key, {
      pageSetup: { fitToPage: true },
    })

    workSheetData.header.forEach((headerData) => {
      worksheet.addRow(headerData)
    })

    workSheetData.summary.forEach((summaryData) => {
      worksheet.addRow(summaryData)
    })

    workSheetData.details.forEach((detailData) => {
      worksheet.addRow(detailData)
    })

    workSheetData.sheetStyles[1].forEach((ele) => {
      worksheet.getRow(ele).font = { size: 20, bold: true }
    })

    workSheetData.sheetStyles[2].forEach((ele) => {
      worksheet.getRow(ele).font = { size: 15, bold: true }
    })

    workSheetData.sheetStyles[3].forEach((ele) => {
      worksheet.getRow(ele).font = { size: 13, bold: true }
    })
    worksheet.columns.forEach((column) => {
      let maxWidth = 5
      column.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
        if (cell.text.length > maxWidth) maxWidth = cell.text.length
      })
      column.width = maxWidth + 2
    })
  })

  // // add column headers
  // worksheet.columns = [
  //   { header: 'Album', key: 'album' }, { header: 'Year', key: 'year' }
  // ];

  // // add row using keys
  // worksheet.addRow({ album: 'Taylor Swift', year: 2006 });

  // // add rows the dumb way
  // worksheet.addRow(['Fearless', 2008]);

  // // add an array of rows
  // var rows = [['Speak Now', 2010], { album: 'Red', year: 2012 }];
  // worksheet.addRows(rows);

  // // edit cells directly
  // worksheet.getCell('A6').value = '1989';
  // worksheet.getCell('B6').value = 2014;

  try {
    workbook.xlsx.writeFile(arg.fileLocation).then(function () {
      event.returnValue = 'saved'
    })
  } catch (e) {
    event.returnValue = 'failed'
  }
})
