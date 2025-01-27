import app from './server.js';

const port = 5080;

app.listen(port, () => {
  console.log(`The server runs on http://localhost:${port}`);
});
