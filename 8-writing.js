const fs = require("fs");
const { pipeline } = require('stream/promises'); // requires node 15!

const run = async () => {

  await pipeline(
    fs.createReadStream('Stops.csv', { highWaterMark: 100 }),
    async function* (source) {
      for await (const chunk of source) {
        for (let i = 0; i < 100000; i++) {
          ;
        }
        yield chunk;
      }
    },
    fs.createWriteStream('Stops2.csv')
  );

}

run().catch(console.error);

// run with /usr/bin/time -f %M node 8-writing.js
// change highWaterMark to 10000000
// what will happen to execution time and memory usage?
