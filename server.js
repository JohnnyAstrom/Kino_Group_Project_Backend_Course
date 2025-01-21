import express from 'express';
import axios from 'axios';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

const app = express();
const port = 5080;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/kids', (req, res) => {
  res.render('kids');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    const movies = response.data;

    res.render('movies', { movies });
  } catch (error) {
    res.status(500).send('Something went wrong while downloading movies');
  }
});

app.get('/movie/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`);
    const movie = response.data.data;
    const introHtml = md.render(movie.attributes.intro);
    res.render('movie', { movie, introHtml });
  } catch (error) {
    res.status(404).send('The movie could not be found');
  }
});

app.listen(port, () => {
  console.log(`The server runs on http://localhost:${port}`);
});
