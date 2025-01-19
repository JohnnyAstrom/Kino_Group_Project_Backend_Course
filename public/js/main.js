import { initHeader } from './header.js';
import { loadkids } from './kids.js';
import { loadMovieContent } from './movies.js';
import { buildDoc } from './infoModal.js';
import './footer.js';
import { updateDomWithAboutJson } from './about.js';

initHeader();

const checkKids = document.querySelector('.article-kids');

if (checkKids) {
  loadkids();
}

const checkMovies = document.querySelector('.movie-container');

if (checkMovies) {
  loadMovieContent();
}
if (document.querySelector('.info') || document.querySelector('.info-modal')) {
  buildDoc();
}
