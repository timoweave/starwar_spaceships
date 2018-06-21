import React from "react";
import {Link as RouterLink} from "react-router-dom";
import styled from "styled-components";
import {Query as ApolloQuery} from "react-apollo";

export const extract_url_model = url => {
  const parts = url.split("/");
  parts.reverse();
  const [, model] = parts;
  return model;
};

export const Link = styled(RouterLink)`
  text-decoration: none;
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Query = ({children, ...props}) => (
  <ApolloQuery {...props}>
    {({loading, error, data}) => {
      if (loading) {
        return <div>loading</div>;
      }
      if (error) {
        return <div>Error!: {error}</div>;
      }
      return children(data);
    }}
  </ApolloQuery>
);
