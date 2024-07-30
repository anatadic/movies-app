import { Card, Grid, GridColumn } from 'semantic-ui-react';
import { DisplayType } from '.';
import { Link } from 'react-router-dom';

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
}

export const ColumnDisplay = (props: Props) => {
  const { data, displayType } = props;

  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <GridColumn key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${
                displayType === DisplayType.Movies ? 'movie' : 'tvshow'
              }/${displayData.id}`}
            >
              <Card
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  displayType === DisplayType.Movies
                    ? displayData.title
                    : displayData.name
                }
                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                description={displayData.overview.slice(0, 350) + '...'}
              />
            </Link>
          </Card.Group>
        </GridColumn>
      ))}
    </Grid>
  );
};
