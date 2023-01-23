const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises'); // requires node 15!

const run = () => {
  fs.createReadStream('Stops.csv')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('Stops.csv.gz'))
    .on('finish', () => console.log('Done!'));

  console.log('End');
}

run();

// const runAsync = async () => {
//   await pipeline(
//     fs.createReadStream('Stops.csv'),
//     zlib.createGzip(),
//     fs.createWriteStream('Stops.csv.gz').on('finish', () => console.log('Done!')),
//   );
//
//   console.log('End');
// }
//
// runAsync().catch(console.error);

// Guess the order of the output of run and runAsync
