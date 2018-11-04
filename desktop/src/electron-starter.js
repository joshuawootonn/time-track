// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const settings = require('electron-settings');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer');
const IPCConstants = require('./constants/ipc');

const SETTINGS = require('./constants/settings');

var Excel = require('exceljs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
 
  // and load the index.html of the app.
  // load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('ready', () => {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
    installExtension(extension)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on(IPCConstants.SET_CRED, (event, arg) => {
  settings.set(`${SETTINGS.USER_CRED}`, {
    username: arg.username,
    password: arg.password
  });
  event.returnValue = arg;
});

ipcMain.on(IPCConstants.GET_CRED, event => {
  const cred = {
    username: settings.get(`${SETTINGS.USER_CRED}.username`),
    password: settings.get(`${SETTINGS.USER_CRED}.password`)
  };
  event.returnValue = cred;
});

ipcMain.on(IPCConstants.CREATE_EXPORT, (event, arg) => {
  console.log('we out here', arg);

  const { data } = arg;

  var workbook = new Excel.Workbook();

  data.forEach(workSheetData => {
    var worksheet = workbook.addWorksheet(workSheetData.key, {
      pageSetup: { fitToPage: true }
    });

    workSheetData.header.forEach(headerData => {
      worksheet.addRow(headerData);      
    });

    workSheetData.summary.forEach(summaryData => {
      worksheet.addRow(summaryData);      
    });
    
    workSheetData.details.forEach(detailData => {
      worksheet.addRow(detailData);
    });

    workSheetData.sheetStyles[1].forEach(ele=> {
      worksheet.getRow(ele).font = {  size: 20, bold: true };
    });

    workSheetData.sheetStyles[2].forEach(ele=> {
      worksheet.getRow(ele).font = {  size:15, bold: true };
    });

    workSheetData.sheetStyles[3].forEach(ele=> {
      worksheet.getRow(ele).font = {  size: 13, bold: true };
    });
    worksheet.columns.forEach(column => {
      let maxWidth = 5;
      column.eachCell({ includeEmpty: false },(cell, rowNumber) => {
        if(rowNumber> workSheetData.sheetStyles.spacerRows + 9 && cell.text.length > maxWidth)
          maxWidth = cell.text.length;
      });
      column.width = maxWidth+2;
    });
  });


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


  try{
    workbook.xlsx.writeFile(arg.fileLocation).then(function() {
      event.returnValue = 'saved';
    });
  } catch(e) {
    event.returnValue = 'failed';
  }
});
