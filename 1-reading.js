// streams are event emitters

const https = require('https');

https.get('https://raw.githubusercontent.com/hmcts/dtsse-node-streams-workshop/master/Stops.csv', res => {

  res.on('data', data => {
    console.log(data);
    // console.log(data.toString('utf8'));
  });

  res.on('end', () => console.log('Done!'));

});

// Check this code with and without the toString() call
