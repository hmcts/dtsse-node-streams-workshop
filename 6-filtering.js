
const fs = require('fs');
const { pipeline } = require('stream/promises');

const run = async () => {

  await pipeline(
    fs.createReadStream('Stops.csv'),
    async function* (source) {

      for await (const chunk of source) {
        if (chunk.includes('Edinburgh')) {
          yield chunk;
        } else {
          yield '';
        }
      }

    },
    fs.createWriteStream('Stops2.csv')
  );

}

run().catch(console.error);

// What might the issues of this approach be? Check the file size
