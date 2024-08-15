import { useEffect, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';

import {
  fetchMovies,
  fetchTVShows,
  searchMovies,
  searchTVShows,
} from './query';
import { useMutation } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { DisplayData, DisplayType } from './types';

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );
  const [searchItem, setSearchItem] = useState('');
  const [movies, setMovies] = useState<DisplayData[]>([]);
  const [tvShows, setTvShows] = useState<DisplayData[]>([]);
  const [page, setPage] = useState<number>(1);

  const { mutate: movieMutation, isPending: isLoadingMovies } = useMutation({
    mutationKey: ['movies'],
    mutationFn: () => fetchMovies(page),
    onSuccess: (movieData) => setMovies(movieData.results),
  });

  const { mutate: tvShowMutation, isPending: isLoadingTvShows } = useMutation({
    mutationKey: ['tvshows'],
    mutationFn: () => fetchTVShows(page),
    onSuccess: (tvShowData) => setTvShows(tvShowData.results),
  });

  const { mutate: searchMovieMutation } = useMutation({
    mutationKey: ['searchMovie'],
    mutationFn: () => searchMovies(searchItem),
    onSuccess: (searchMovieData) => setMovies(searchMovieData.results),
  });

  const { mutate: searchTvShowMutation } = useMutation({
    mutationKey: ['searchTVShow'],
    mutationFn: () => searchTVShows(searchItem),
    onSuccess: (searchTvShowData) => setTvShows(searchTvShowData.results),
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page === 1) {
      return;
    }

    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = () => {
    if (!searchItem) {
      return;
    }

    displayType === DisplayType.Movies
      ? searchMovieMutation()
      : searchTvShowMutation();
  };

  const handleSetDisplayType = (displayType: DisplayType) => {
    setDisplayType(displayType);
    setPage(1);
  };

  useEffect(() => {
    if (!searchItem) {
      movieMutation();
      tvShowMutation();
    }
  }, [searchItem, page]);

  if (localStorage.getItem('guest_session_id') === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ marginTop: 50, height: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Input
            type="text"
            icon={'search'}
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Type to search"
            action={{ onClick: () => handleSearch() }}
          />
        </div>

        <Button.Group>
          <Button
            color={displayType === DisplayType.Movies ? 'blue' : undefined}
            onClick={() => handleSetDisplayType(DisplayType.Movies)}
          >
            Movies
          </Button>

          <Button
            color={displayType === DisplayType.TVShows ? 'blue' : undefined}
            onClick={() => handleSetDisplayType(DisplayType.TVShows)}
          >
            TV Shows
          </Button>
        </Button.Group>
        <div></div>
      </div>
      {isLoadingMovies || isLoadingTvShows ? (
        <div> Loading... </div>
      ) : (
        <>
          <div style={{ marginTop: 20 }}>
            {displayType === DisplayType.Movies ? (
              <ColumnDisplay
                data={movies}
                displayType={DisplayType.Movies}
                isRated={false}
              />
            ) : (
              <ColumnDisplay
                data={tvShows}
                displayType={DisplayType.TVShows}
                isRated={false}
              />
            )}
          </div>
          <div>
            <Button onClick={handlePreviousPage}>Previous</Button>
            <Button onClick={handleNextPage}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};
