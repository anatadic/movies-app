import { Form, Card, Grid, GridColumn, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { rateMovie, rateTvShow } from './mutation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DisplayData, DisplayType, Props } from './types';

export const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [rating, setRating] = useState<number>(0);

  const onSuccess = () => {
    toast.success('Succesfully rated!');
  };

  const onError = () => {
    toast.error('Something went wrong!');
  };

  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ['rateMovie'],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess,
    onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ['rateTvShow'],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess,
    onError,
  });

  const rate = (id: number) => {
    if (rating < 1 || rating > 10) {
      toast.error('Rating must be between 1 and 10');
      return;
    }

    displayType === DisplayType.Movies
      ? rateMovieMutation(id)
      : rateTvShowMutation(id);
  };

  if (!data?.length) {
    return <p>No data to show</p>;
  }

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
                style={{ height: 820 }}
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
              {isRated && <Label>Your Rating: {displayData.rating} </Label>}
            </Link>
            <Form style={{ marginTop: 10 }}>
              <Form.Group inline>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    onChange={(e) => setRating(Number(e.target.value))}
                    action={{
                      color: 'violet',
                      labelPosition: 'right',
                      icon: 'star',
                      content: 'Rate',
                      onClick: () => rate(displayData.id),
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </GridColumn>
      ))}
    </Grid>
  );
};
