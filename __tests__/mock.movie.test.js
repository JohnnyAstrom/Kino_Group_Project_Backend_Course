import axios from 'axios';

jest.mock('axios');

describe('Movie API (Mocked Requests)', () => {
  it('Return an array of movies', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Isle of dogs',
          intro: `An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.`,
        },
        {
          id: 2,
          title: 'Encanto',
          intro: `A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.`,
        },
        {
          id: 3,
          title: 'The Shawshank Redemption',
          intro: `Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.`,
        },
      ],
    });

    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');

    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBe(3);
    expect(response.data[0].title).toBe('Isle of dogs');
    expect(response.data[2].intro).toBe(
      `Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.`
    );
  });

  it('Handle error if movie is not found', async () => {
    axios.get.mockRejectedValue(new Error('Movie not found'));

    try {
      await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies/99999');
    } catch (error) {
      expect(error.message).toBe('Movie not found');
    }
  });
});
