import React from "react";
import {Mutation} from "react-apollo";

import "./Starship.css";
import formatter from "currency-formatter";
import {QUERY_IMAGE, QUERY_SHIP} from "./store";
import {NEXT_IMAGE} from "./store";
import {Query} from "./utils";

const Starship = props => {
  const {match: {params: {model}}} = props;

  return (
    <Query query={QUERY_IMAGE} variables={{model}}>
      {data => {
        const {image: {url, selected}} = data;
        return (
          <Query query={QUERY_SHIP} variables={{model}}>
            {data => {
              const {starship} = data;
              const {
                name,
                model: model_name,
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
                    <Mutation mutation={NEXT_IMAGE}>
                      {nextImage => (
                        <div className="StarshipImage">
                          <img
                            alt={model_name}
                            src={url[selected]}
                            width="100%"
                            onClick={() => nextImage({variables: {id: model}})}
                          />
                          <div className="StarshipImageInstruction">
                            click to see next image
                          </div>
                        </div>
                      )}
                    </Mutation>
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
                      <tbody>
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
                      </tbody>
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
