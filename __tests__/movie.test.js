import request from 'supertest';
import app from '../server';

describe('Movie Pages (SSR)', () => {
  it('Return the correct movie title', async () => {
    const movieId = 1;
    const response = await request(app).get(`/movie/${movieId}`);

    expect(response.text).toContain('<h1>Isle of dogs</h1>');
  });

  it('Return a 404 page for a non-existent movie', async () => {
    const movieId = 99999;
    const response = await request(app).get(`/movie/${movieId}`);

    expect(response.status).toBe(404);
    expect(response.text).toContain('The movie could not be found');
  });
});
