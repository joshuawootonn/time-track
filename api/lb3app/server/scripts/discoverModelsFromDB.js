/***************************
This is a programmatic way of getting the models from database

*Note* This sucks at getting the relationships right. The docs say: 
'The discovery of model relations is limited to BelongsTo relations. Other relation types, for example HasMany, are not supported yet.'

1. Change datasource file 
2. Change const modelNames to find the tables you want
3. Run
4. Go through the created models deleteing the relations:{} contents at the bottom
5. Create the corresponding relations with 'lb relation'
6. These relations will be generated at the top in the options section
***************************/

const loopback = require('loopback')
const promisify = require('util').promisify
const fs = require('fs')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const mkdirp = promisify(require('mkdirp'))
const _ = require('lodash')

const DATASOURCE_NAME = 'db'
// Change this ------------------------------------------------
const dataSourceConfig = require('../datasources.json')
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME])

discover().then(
  (success) => process.exit(),
  (error) => {
    console.error('UNHANDLED ERROR:\n', error)
    process.exit(1)
  },
)

async function discover() {
  const options = { relations: true }
  const modelNames = [
    'authority',
    'crew',
    'employee',
    'shift',
    'activity',
    'project_task',
    'project',
    'task',
    'subcategory',
    'category',
    'dimension',
  ]
  let schemas = []
  for (let modelName of modelNames) {
    schemas.push(await db.discoverSchemas(modelName, options))
  }
  await mkdirp('../../common/models')

  let i = 0
  for (let schema of schemas) {
    await writeFile(
      `../../common/models/${modelNames[i]}.json`,
      JSON.stringify(
        schemas[0][`time-track-development.${modelNames[i]}`],
        null,
        2,
      ),
    )
    i++
  }

  // Expose models via REST API
  const configJson = await readFile('../model-config.json', 'utf-8')
  console.log('MODEL CONFIG', configJson)
  const config = JSON.parse(configJson)

  for (let modelName of modelNames) {
    config[_.chain(modelName).camelCase().upperFirst()] = {
      dataSource: DATASOURCE_NAME,
      public: true,
    }
  }

  await writeFile('../model-config.json', JSON.stringify(config, null, 2))
}
