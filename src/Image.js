import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";

const Image = props => {
  const {match: {params: {id}}} = props;
  const query = gql`
    query($id: String!) {
      image(id: $id) @client {
        id
        url
      }
    }
  `;

  return (
    <Query query={query} variables={{id}}>
      {({loading, error, data}) => {
        if (loading) {
          return <h4>Loading...</h4>;
        }
        if (error) {
          return <h4>{error.message}</h4>;
        }
        const {image: {id, url}} = data;
        return (
          <div>
            <img alt={id} width="50%" src={url} />
          </div>
        );
      }}
    </Query>
  );
};

export default Image;
