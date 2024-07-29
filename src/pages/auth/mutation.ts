export const mutationLogin = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      },
    }
  );

  return res.json();
};
