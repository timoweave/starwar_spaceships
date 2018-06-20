import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import "./Starship.css";
import formatter from "currency-formatter";

const Starship = props => {
  const {match: {params: {model}}} = props;
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
        const {image: {url}} = data;

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
                    <h1>{name}</h1>
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
                    <table>
                      <tr>
                        <td>model</td>
                        <td>{model}</td>
                      </tr>
                      <tr>
                        <td>make</td>
                        <td>{manufacturer}</td>
                      </tr>
                      <tr>
                        <td>speed</td>
                        <td>
                          {formatter.format(max_atmosphering_speed, {
                            symbol: " ",
                            format: "%v",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>cost</td>
                        <td>
                          {formatter.format(cost_in_credits, {
                            locale: "en-US",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>length</td>
                        <td>
                          {formatter.format(length, {
                            symbol: " ",
                            format: "%v",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>class</td>
                        <td>{starship_class}</td>
                      </tr>
                      <tr>
                        <td>hyperdrive</td>
                        <td>{hyperdrive_rating}</td>
                      </tr>
                      <tr>
                        <td>consumable</td>
                        <td>{consumables}</td>
                      </tr>
                      <tr>
                        <td>passengers</td>
                        <td>
                          {formatter.format(passengers, {
                            symbol: " ",
                            precision: 0,
                            format: "%v",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>crew</td>
                        <td>
                          {formatter.format(crew, {
                            symbol: " ",
                            precision: 0,
                            format: "%v",
                          })}
                        </td>
                      </tr>
                    </table>
                    <button onClick={() => alert("Call 404-821-2161 now!")}>
                      buy
                    </button>
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
