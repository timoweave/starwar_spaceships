import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import "./Starship.css";

const Starship = props => {
  const {
    match: {
      params: {model},
    },
  } = props;
  const query_image = gql`
    query($model: String!) {
      image(id: $model) @client {
        url
      }
    }
  `;
  const query_ship = gql`
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
    <Query query={query_image} variables={{model}}>
      {({loading, error, data}) => {
        if (loading || error) {
          return loading ? <h4>Loading...</h4> : <h4>{error.message}</h4>;
        }
        const {
          image: {url},
        } = data;

        return (
          <Query query={query_ship} variables={{model}}>
            {({loading, error, data}) => {
              if (loading || error) {
                return loading ? <h4>Loading...</h4> : <h4>{error.message}</h4>;
              }
              const {starship} = data;

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
                <div className="StarshipContainer">
                  <div className="StarshipLeft">
                    <h1>
                      {name} ({props.match.params.model})
                    </h1>
                    <img alt={model} src={url} width="100%" />
                    <p>
                      Consequat nisl, vel pretium lectus quam id leo in vitae
                      turpis massa sed elementum tempus egestas sed sed risus
                      pretium quam vulputate dignissim suspendisse! A diam
                      maecenas sed enim ut sem viverra aliquet eget sit amet
                      tellus cras adipiscing enim eu turpis egestas pretium
                      aenean pharetra, magna ac placerat!
                    </p>
                  </div>
                  <div className="StarshipRight">
                    <h1>Tech Specs</h1>
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
                  <div className="StarshipBuy">
                    <input name="" type="button" value="Buy" />
                  </div>
                </div>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default Starship;
