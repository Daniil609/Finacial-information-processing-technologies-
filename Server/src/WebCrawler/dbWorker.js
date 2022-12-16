const { parentPort } = require('worker_threads');

const { DatabaseService } = require('../modules/shared/database/database.service');

const dbInstance = DatabaseService.getSequelize();

// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
// recieve crawled data from main thread
parentPort.once('message', (message) => {
  console.log('Recieved data from mainWorker...');
  dbInstance
    .query('Select 1 + 1 as result;')
    .then((res) => {
      console.log('TEST: db answer:', JSON.stringify(res));
      parentPort.postMessage('Data saved successfully');
    })
    .catch((err) => console.log(err));
});
