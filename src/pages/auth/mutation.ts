export const mutationLogin = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzNhNmYzNGNmNTA3ODE1MzY1ZjNiNjg1MmE4MGU0MyIsIm5iZiI6MTcyMjI1MzMxNS41MDI2OTQsInN1YiI6IjY2YTc3N2U1YjhhOThhMzQ3Y2E1M2E1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gZdgyrzvEhDakQ2kWnCCP9wEkdq4KVzT_-tFKN2lKN8`,
      },
    }
  );

  return res.json();
};
