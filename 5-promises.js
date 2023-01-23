
const fs = require('fs');
const { pipeline } = require('stream/promises'); // requires node 15!

const transform = async (chunk) => {
  return chunk.toString().toUpperCase();
};

const run = async () => {

  await pipeline(
    fs.createReadStream('Stops.csv'),
    async function* (source) {
      for await (const chunk of source) {
        yield await transform(chunk);
      }
    },
    fs.createWriteStream('Stops2.csv')
  );

}

run().catch(console.error);

// compare the performance of this with 4-transforms.js
