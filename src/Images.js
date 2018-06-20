import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const Images = props => {
  const query = gql`
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
    <Query query={query}>
      {({loading, error, data}) => {
        if (loading) {
          return <h4>Loading...</h4>;
        }
        if (error) {
          return <h4>{error.message}</h4>;
        }
        const {images: {results}} = data;
        return (
          <div>
            {results.map(img => (
              <div>
                <img width="10%" key={img.id} alt={img.id} src={img.url} />
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Images;
