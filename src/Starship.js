import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const Starship = props => {
  console.log({props});
  const {match: {params: {model}}} = props;
  const query = gql`
    query($model: String!) {
      starship(id: $model) @rest(type: "Starship", path: "starships/:id") {
        MGLT
        cargo_capacity
        consumables
        cost_in_credits
        crew
        hyperdrive_rating
        length
        manufacturer
        max_atmosphering_speed
        model
        name
        passengers
        starship_class
      }
    }
  `;

  return (
    <Query query={query} variables={{model}}>
      {({loading, error, data}) => {
        if (loading) {
          return <h4>Loading...</h4>;
        }
        if (error) {
          return <h4>{error.message}</h4>;
        }
        const {starship} = data;
        console.log({starship});

        const {
          name,
          model,
          manufacturer,
          cost_in_credits,
          max_atmosphering_speed,
          crew,
          consumables,
          hyperdrive_rating,
          passengers,
          starship_class,
          length,
        } = starship;
        return (
          <div>
            <h1>
              {name} ({props.match.params.model})
            </h1>
            <p>model: {model}</p>
            <p>make: {manufacturer}</p>
            <p>speed: {max_atmosphering_speed}</p>
            <p>cost: {cost_in_credits}</p>
            <p>length: {length}</p>
            <p>class: {starship_class}</p>
            <p>hyperdriver: {hyperdrive_rating}</p>
            <p>consumable: {consumables}</p>
            <p>passengers: {passengers}</p>
            <p>crew: {crew}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default Starship;
