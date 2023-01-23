const https = require('https');
const fs = require('fs');

const output = fs.createWriteStream('Stops.csv');

https.get('https://raw.githubusercontent.com/linusnorton/workshop-node-streams/master/Stops.csv', res => {
  res.pipe(output);
  res.on("end", () => console.log('Done!'));
});

// Pipe the response to an additional file
