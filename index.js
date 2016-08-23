import app from './app.js';

app.get('/', (request, response) => {
  response.send('Hello world');
});

app.listen(3000);
