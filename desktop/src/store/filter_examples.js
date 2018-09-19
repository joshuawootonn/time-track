const include = { "include" : "activities", "where" : { 
  "clockIndate": {
    "between" : ["2018-08-21","2018-08-23"]
    }
  }  
}

const date = { "where" :{"clockIndate": {"lte" : "new Date('2018-08-23T23:50:20.000Z')"}}}

const dateWorking = { "where" :{"clockInDate": {"lte" : "2018-07-23T04:49:17.000Z"}}}