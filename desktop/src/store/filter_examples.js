const include = { "include" : "activities", "where" : { 
  "clockIndate": {
    "between" : ["2018-08-21","2018-08-23"]
    }
  }  
}

const date = { "where" :{"clockIndate": {"lte" : "new Date('2018-08-23T23:50:20.000Z')"}}}

const dateWorking = { "where" :{"clockInDate": {"lte" : "2018-07-23T04:49:17.000Z"}}}

const dateWorkingwithand = { "where" :{"and" :[{"clockInDate": {"lte" : "2018-07-25T04:49:17.000Z"}},{"clockInDate": {"gte" : "2018-07-30T04:49:17.000Z"}}]}}

const dateWorkingwithbetween = { "where" :{"clockInDate": {"between": ["2018-07-24T04:49:17.000Z","2018-07-30T04:49:17.000Z"]}}}