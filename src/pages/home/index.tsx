import { useEffect, useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';

import {
  fetchMovies,
  fetchTVShows,
  searchMovies,
  searchTVShows,
} from './query';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { DisplayData, DisplayType } from './types';

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );
  const [searchItem, setSearchItem] = useState('');
  const [movies, setMovies] = useState<DisplayData[]>([]);
  const [tvShows, setTvShows] = useState<DisplayData[]>([]);

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ['tvshows'],
    queryFn: fetchTVShows,
  });

  const { mutate: searchMovieMutation, data: searchMovieData } = useMutation({
    mutationKey: ['searchMovie'],
    mutationFn: () => searchMovies(searchItem),
  });

  const { mutate: searchTvShowMutation, data: searchTvShowData } = useMutation({
    mutationKey: ['searchTVShow'],
    mutationFn: () => searchTVShows(searchItem),
  });

  const handleSearch = async () => {
    displayType === DisplayType.Movies
      ? searchMovieMutation()
      : searchTvShowMutation();

    displayType === DisplayType.Movies
      ? setMovies(searchMovieData?.results)
      : setTvShows(searchTvShowData?.results);
  };

  useEffect(() => {
    if (!searchItem) {
      setMovies(movieData?.results);
      setTvShows(tvShowData?.results);
    }
  }, [searchItem, movieData, tvShowData]);

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
            onClick={() => setDisplayType(DisplayType.Movies)}
          >
            Movies
          </Button>

          <Button
            color={displayType === DisplayType.TVShows ? 'blue' : undefined}
            onClick={() => setDisplayType(DisplayType.TVShows)}
          >
            TV Shows
          </Button>
        </Button.Group>
        <div></div>
      </div>
      {isLoadingMovies || isLoadingTvShows ? (
        <div> Loading... </div>
      ) : (
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
      )}
    </div>
  );
};
