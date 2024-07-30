import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { ColumnDisplay } from './column-display';

import { fetchMovies, fetchTVShows } from './query';
import { useQueries, useQuery } from '@tanstack/react-query';

export enum DisplayType {
  Movies = 'movies',
  TVShows = 'tvshows',
}

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
            />
          ) : (
            <ColumnDisplay
              data={tvShowData.results}
              displayType={DisplayType.TVShows}
            />
          )}
        </div>
      )}
    </div>
  );
};
