export const fetchMovies = async (page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },
    }
  );

  return res.json();
};

export const fetchTVShows = async (page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },
    }
  );

  return res.json();
};

export const searchMovies = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },
    }
  );

  return res.json();
};

export const searchTVShows = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },
    }
  );

  return res.json();
};
