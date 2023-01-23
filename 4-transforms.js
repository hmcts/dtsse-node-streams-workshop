
const fs = require('fs');
const { pipeline } = require('stream/promises'); // requires node 15!

const run = async () => {

  await pipeline(
    fs.createReadStream('Stops.csv'),
    async function* (source) {
      for await (const chunk of source) {
        yield chunk.toString().toUpperCase();
      }
    },
    fs.createWriteStream('Stops2.csv'),
  );

}

run().catch(console.error);

// extract the transform into a separate function
