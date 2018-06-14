const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));

const DATASOURCE_NAME = 'db';
const dataSourceConfig = require('../datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);


discover().then(
  success => process.exit(),
  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1); },
);


async function discover() {
  // It's important to pass the same "options" object to all calls
  // of dataSource.discoverSchemas(), it allows the method to cache
  // discovered related models
  const options = {relations: true};

  // Discover models and relations
  const authoritySchemas = await db.discoverSchemas('authority', options);
  const crewSchemas = await db.discoverSchemas('crew', options);
  const employeeSchemas = await db.discoverSchemas('EMPLOYEE', options);
  const shiftSchemas = await db.discoverSchemas('SHIFT', options);
  const activitySchemas = await db.discoverSchemas('ACTIVITY', options);
  const projectTaskSchemas = await db.discoverSchemas('PROJECT_TASK', options);
  const projectSchemas = await db.discoverSchemas('PROJECT', options);
  const taskSchemas = await db.discoverSchemas('TASK', options);
  const subcategorySchemas = await db.discoverSchemas('SUBCATEGORY', options);
  const categorySchemas = await db.discoverSchemas('CATEGORY', options);
  const dimensionSchemas = await db.discoverSchemas('DIMENSION', options);

  // Create model definition files
  await mkdirp('../../common/models');
  await writeFile(
    '../../common/models/authority.json',
    JSON.stringify(authoritySchemas['time-track-development.authority'], null, 2)    
  );
  await writeFile(
    '../../common/models/crew.json',
    JSON.stringify(crewSchemas['time-track-development.crew'], null, 2)    
  );
  
  // Expose models via REST API
  const configJson = await readFile('../model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.authority = {dataSource: DATASOURCE_NAME, public: true};
  config.crew = {dataSource: DATASOURCE_NAME, public: true};
  await writeFile(
    '../model-config.json',
    JSON.stringify(config, null, 2)
  );
}