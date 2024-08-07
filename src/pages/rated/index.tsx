import { useState } from 'react';
import { Container, Header, Loader, Menu, Segment } from 'semantic-ui-react';
import { useQuery } from '@tanstack/react-query';
import { fetchRatedMovies, fetchRatedTvShows } from './query';
import { ColumnDisplay } from '../home/column-display';
import { Navigate } from 'react-router-dom';
import { DisplayType } from '../home/types';

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ['ratedMovies'],
    queryFn: fetchRatedMovies,
  });

  const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
    queryKey: ['ratedTvShows'],
    queryFn: fetchRatedTvShows,
  });

  if (isLoadingRatedMovies || isLoadingRatedTvShows) {
    return <Loader active />;
  }

  if (localStorage.getItem('guest_session_id') === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTabs === DisplayType.TVShows}
          onClick={() => setActiveTabs(DisplayType.TVShows)}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies ? (
          <div>
            <Header as={'h2'}>Rated Movies</Header>
            <ColumnDisplay
              data={ratedMovies.results}
              displayType={DisplayType.Movies}
              isRated
            />
          </div>
        ) : (
          <div>
            <Header as={'h2'}>Rated TV Shows</Header>
            <ColumnDisplay
              data={ratedTvShows.results}
              displayType={DisplayType.TVShows}
              isRated
            />
          </div>
        )}
      </Segment>
    </Container>
  );
};
