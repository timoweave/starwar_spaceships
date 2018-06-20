import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Link} from "react-router-dom";
import styled from "styled-components";

import Starship from "./Starship";
import "./Starships.css";

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Starships = props => {
  // TBD: we can then merge query_ships and query_images together, when
  // apollo support query of both @rest and @client at the same time,
  const query_ships = gql`
    query {
      starships @rest(type: "Starships", path: "starships") {
        count
        results {
          name
          url
        }
      }
    }
  `;
  const query_images = gql`
    query {
      images @client {
        results {
          id
          url
        }
      }
    }
  `;

  return (
    <Query query={query_ships}>
      {({loading, error, data: ships}) => {
        if (loading || error) {
          return loading ? <h4>Loading ships...</h4> : <h4>{error.message}</h4>;
        }

        return (
          <Query query={query_images}>
            {({loading, error, data}) => {
              if (loading || error) {
                return loading ? (
                  <h4>Loading images...</h4>
                ) : (
                  <h4>{error.message}</h4>
                );
              }
              const {images: {results: images}} = data;

              return (
                <div className="StarshipsContainer">
                  {ships.starships.results.map(({url, name}) => {
                    const parts = url.split("/");
                    parts.reverse();
                    const [_, model] = parts;
                    const {url: image_url} = images.find(i => i.id === model);

                    return (
                      <div key={url}>
                        <StyledLink to={`/starships/${model}`}>
                          <div className="StarshipsCard">
                            <img
                              alt={model}
                              width="100%"
                              crossOrigin="anonymous"
                              src={image_url}
                            />
                            <div className="StarshipsLabel">
                              <h1>{name}</h1>
                              <h2>{url}</h2>
                            </div>
                          </div>
                        </StyledLink>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default Starships;
