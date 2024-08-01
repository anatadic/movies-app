import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';

import { fetchMovies, fetchTVShows } from './query';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';
import { DisplayType } from './types';

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ['tvshows'],
    queryFn: fetchTVShows,
  });

  if (localStorage.getItem('guest_session_id') === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <div style={{ marginTop: 50, height: 'auto' }}>
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
      {isLoadingMovies || isLoadingTvShows ? (
        <div> Loading... </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData.results}
              displayType={DisplayType.Movies}
              isRated={false}
            />
          ) : (
            <ColumnDisplay
              data={tvShowData.results}
              displayType={DisplayType.TVShows}
              isRated={false}
            />
          )}
        </div>
      )}
    </div>
  );
};
