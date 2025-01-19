import axios from 'axios';

jest.mock('axios');

describe('Movie API', () => {
  it('should return an array of movies', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Movie 1', intro: 'Intro text 1' },
        { id: 2, title: 'Movie 2', intro: 'Intro text 2' },
      ],
    });

    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBe(2);
    expect(response.data[0].title).toBe('Movie 1');
    expect(response.data[0].intro).toBe('Intro text 1');
  });

  it('should handle error if movie is not found', async () => {
    axios.get.mockRejectedValue(new Error('Movie not found'));

    try {
      await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies/999');
    } catch (error) {
      expect(error.message).toBe('Movie not found');
    }
  });
});
