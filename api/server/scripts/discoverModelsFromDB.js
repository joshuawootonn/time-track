const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const _ = require('lodash');

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
  const options = { relations: true };

  // Discover models and relations

  const modelNames = ['authority', 'crew','employee','shift','activity','project_task', 'project', 'task', 'subcategory','category', 'dimension'];

  let schemas = [];


  for (let modelName of modelNames) {
    schemas.push(await db.discoverSchemas(modelName, options))
  }

  // Create model definition files
  await mkdirp('../../common/models');
 
  let i = 0;
  for (let schema of schemas) {
    await writeFile(
      `../../common/models/${modelNames[i]}.json`,
      JSON.stringify(schemas[0][`time-track-development.${modelNames[i]}`], null, 2)
    );
    i++;
  }


  // Expose models via REST API
  const configJson = await readFile('../model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);

  for(let modelName of modelNames){
    config[_.chain(modelName).camelCase().upperFirst()] = { dataSource: DATASOURCE_NAME, public: true }
  }
  
  await writeFile(
    '../model-config.json',
    JSON.stringify(config, null, 2)
  );
}

