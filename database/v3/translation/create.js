async function main() {
  const mysql = require('mysql2/promise');
  const constants = require('./constants');

  const newConnection = await mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    database: constants.NEW_DATABASE,
    password: constants.PASS
  })
  // CREATE DATABASE
  try{
    await newConnection.execute(`DROP SCHEMA IF EXISTS ${constants.NEW_DATABASE};`)
    await newConnection.execute(`CREATE SCHEMA IF NOT EXISTS ${constants.NEW_DATABASE} DEFAULT CHARACTER SET utf8 ;`)   
    console.log('Database Created');
  }catch(e){
    console.log('Error', e)
  }
  
  // ACL
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACL_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACL_TABLE}(
        \`id\` int(11) NOT NULL AUTO_INCREMENT, 
        \`model\` varchar(512) DEFAULT NULL,
        \`property\` varchar(512) DEFAULT NULL,
        \`accessType\` varchar(512) DEFAULT NULL,
        \`permission\` varchar(512) DEFAULT NULL,
        \`principalType\` varchar(512) DEFAULT NULL,
        \`principalId\` varchar(512) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;`)    
    console.log('ACL Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // AccessToken
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACCESS_TOKEN_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACCESS_TOKEN_TABLE}(
      \`id\` varchar(255) NOT NULL,
      \`ttl\` int(11) DEFAULT NULL,
      \`scopes\` text,
      \`created\` datetime DEFAULT NULL,
      \`userId\` int(11) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;`)    
    console.log('AccessToken Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // User
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_USER_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_USER_TABLE}(
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`realm\` varchar(512) DEFAULT NULL,
      \`username\` varchar(512) DEFAULT NULL,
      \`password\` varchar(512) NOT NULL,
      \`email\` varchar(512) NOT NULL,
      \`emailVerified\` tinyint(1) DEFAULT NULL,
      \`verificationToken\` varchar(512) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB ;`)    
    console.log('AccessToken Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // Role
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ROLE_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ROLE_TABLE}(
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`name\` varchar(512) NOT NULL,
      \`description\` varchar(512) DEFAULT NULL,
      \`created\` datetime DEFAULT NULL,
      \`modified\` datetime DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB ;`)    
    console.log('AccessToken Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // RoleMapping
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ROLE_MAPPING_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ROLE_MAPPING_TABLE}(
      \`id\` int(11) NOT NULL AUTO_INCREMENT,
      \`principalType\` varchar(512) DEFAULT NULL,
      \`principalId\` varchar(255) DEFAULT NULL,
      \`roleId\` int(11) DEFAULT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`principalId\` (\`principalId\`)
    ) ENGINE=InnoDB;`)    
    console.log('AccessToken Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // authority
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_AUTHORITY_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_AUTHORITY_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`type\` VARCHAR(45) NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`type_UNIQUE\` (\`type\` ASC))
    ENGINE = InnoDB;`)    
    console.log('Authority Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // crew
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_CREW_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_CREW_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(45) NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`name_UNIQUE\` (\`name\` ASC))
    ENGINE = InnoDB;`)    
    console.log('Crew Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // employee
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_EMPLOYEE_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_EMPLOYEE_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`first_name\` VARCHAR(45) NOT NULL,
      \`last_name\` VARCHAR(45) NOT NULL,
      \`pin\` INT NOT NULL,
      \`is_employed\` TINYINT NOT NULL DEFAULT 1,
      \`is_working\` TINYINT NOT NULL,
      \`authority_id\` INT NOT NULL,
      \`crew_id\` INT NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`pin_UNIQUE\` (\`pin\` ASC),
      INDEX \`fk_employee_authority1_idx\` (\`authority_id\` ASC),
      INDEX \`fk_employee_crew1_idx\` (\`crew_id\` ASC),
      CONSTRAINT \`fk_employee_authority1\`
        FOREIGN KEY (\`authority_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`authority\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_employee_crew1\`
        FOREIGN KEY (\`crew_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`crew\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('Employee Table Created');
  }catch(e){
    console.log('Error', e)
  }


  // shift
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_SHIFT_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_SHIFT_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`clock_in_date\` DATETIME NULL,
      \`clock_out_date\` DATETIME NULL,
      \`length\` INT NULL,
      \`lunch\` INT NULL,
      \`employee_id\` INT NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_shift_employee1_idx\` (\`employee_id\` ASC),
      CONSTRAINT \`fk_shift_employee1\`
        FOREIGN KEY (\`employee_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`employee\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('Shift Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // category
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_CATEGORY_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_CATEGORY_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`type\` VARCHAR(45) NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`type_UNIQUE\` (\`type\` ASC))
    ENGINE = InnoDB;`)    
    console.log('Category Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // dimension
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_DIMENSION_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_DIMENSION_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`type\` VARCHAR(45) NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`type_UNIQUE\` (\`type\` ASC))
    ENGINE = InnoDB;`)    
    console.log('Dimension Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // subcategory
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_SUBCATEGORY_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_SUBCATEGORY_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`type\` VARCHAR(45) NOT NULL,
      \`category_id\` INT NOT NULL,
      \`dimension_id\` INT NOT NULL,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`type_UNIQUE\` (\`type\` ASC),
      INDEX \`fk_subcategory_category1_idx\` (\`category_id\` ASC),
      INDEX \`fk_subcategory_dimension1_idx\` (\`dimension_id\` ASC),
      CONSTRAINT \`fk_subcategory_category1\`
        FOREIGN KEY (\`category_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`category\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_subcategory_dimension1\`
        FOREIGN KEY (\`dimension_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`dimension\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('Subcategory Table Created');
  }catch(e){
    console.log('Error', e)
  }


  // task
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_TASK_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_TASK_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(45) NOT NULL,
      \`is_active\` TINYINT NOT NULL DEFAULT 1,
      \`subcategory_id\` INT NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_task_subcategory1_idx\` (\`subcategory_id\` ASC),
      CONSTRAINT \`fk_task_subcategory1\`
        FOREIGN KEY (\`subcategory_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`subcategory\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('Task Table Created');
  }catch(e){
    console.log('Error', e)
  }


  // project
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(180) NOT NULL,
      \`is_active\` TINYINT NOT NULL DEFAULT 1,
      \`date\` DATETIME NOT NULL,
      PRIMARY KEY (\`id\`))
    ENGINE = InnoDB;`)    
    console.log('Project Table Created');
  }catch(e){
    console.log('Error', e)
  }


  // project_task
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TASK_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TASK_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`task_id\` INT NOT NULL,
      \`project_id\` INT NOT NULL,
      \`quantity\` INT NULL,
      \`estimate_time\` INT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`fk_task_has_project_project1_idx\` (\`project_id\` ASC),
      INDEX \`fk_task_has_project_task1_idx\` (\`task_id\` ASC),
      CONSTRAINT \`fk_task_has_project_task1\`
        FOREIGN KEY (\`task_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`task\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_task_has_project_project1\`
        FOREIGN KEY (\`project_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`project\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('ProjectTask Table Created');
  }catch(e){
    console.log('Error', e)
  }


  // activity
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACTIVITY_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACTIVITY_TABLE}(
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`length\` INT NOT NULL,
      \`description\` VARCHAR(180) NULL,
      \`shift_id\` INT NOT NULL,
      \`project_task_id\` INT NOT NULL,
      INDEX \`fk_table1_shift1_idx\` (\`shift_id\` ASC),
      PRIMARY KEY (\`id\`),
      INDEX \`fk_activity_project_task1_idx\` (\`project_task_id\` ASC),
      CONSTRAINT \`fk_table1_shift1\`
        FOREIGN KEY (\`shift_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`shift\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT \`fk_activity_project_task1\`
        FOREIGN KEY (\`project_task_id\`)
        REFERENCES \`${constants.NEW_DATABASE}\`.\`project_task\` (\`id\`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB;`)    
    console.log('Activity Table Created');
  }catch(e){
    console.log('Error', e)
  }


 
  newConnection.close();
}

main();