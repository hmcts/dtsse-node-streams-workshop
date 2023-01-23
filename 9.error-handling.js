const { createReadStream } = require('fs');
const { createServer } = require('http');
const { pipeline } = require('stream');

// does not close the read stream
const server = createServer(
  (req, res) => {
    createReadStream('Stops.csv')
      .pipe(res)
      .on('error', err => console.error('Pipeline failed.', err));
  }
);

// handles errors for the whole pipeline
// const server = createServer(
//   (req, res) => {
//     pipeline(
//       createReadStream('Stops.csv'),
//       res,
//       err => {
//         if (err) {
//           console.error('Pipeline failed.', err);
//         }
//       }
//     );
//   }
// );

server.listen(3000);
