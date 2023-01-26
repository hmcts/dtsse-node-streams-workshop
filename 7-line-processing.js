
const fs = require('fs');
const { pipeline } = require('stream/promises'); // requires node 15!
const readline = require('readline');

const run = async () => {

  await pipeline(
    fs.createReadStream('Stops.csv'),
    async function* (source) {
      let content = '';

      for await (const chunk of source) {
        const indexOfNewLine = chunk.indexOf('\n');

        if (indexOfNewLine !== -1) {
          yield content + chunk.substring(0, indexOfNewLine);
          content = '';
        }

        content += chunk.substring(indexOfNewLine + 1);
      }

      yield content;
    },
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

// what happens if you have more than one \n in a chunk?

// const run = async () => {
//   const input = fs.createReadStream('Stops.csv');
//
//   await pipeline(
//     readline.createInterface({ input }),
//     async function* (source) {
//       for await (const chunk of source) {
//         if (chunk.includes('Edinburgh')) {
//           yield chunk;
//         } else {
//           yield '';
//         }
//       }
//     },
//     fs.createWriteStream('Stops2.csv')
//   );
//
// }
