import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-client-preset";
import {InMemoryCache} from "apollo-cache-inmemory";
import {RestLink} from "apollo-link-rest";
import {withClientState} from "apollo-link-state";

const cache = new InMemoryCache();

const make_img = (id, url) => ({id, url, __typename: "Image"});
export const images = [
  make_img("15", "/images/executor_class_ssd_final_demo_by_enterprise_e.jpg"),
  make_img("5", "/images/ILC-2.jpg"),
  make_img("9", "/images/1deathstar.jpeg"),
  make_img("10", "/images/MillenniumFalconTFA-Fathead.png"),
  make_img("11", "/images/Y-Wing-Fighter_0e78c9ae.jpeg"),
  make_img("12", "/images/X-Wing-Fighter_47c7c342.jpeg"),
  make_img("13", "/images/image_3aaf40b1.jpeg"),
  make_img("21", "/images/databank_slavei_01_169_8dc3102d.jpeg"),
  make_img("22", "/images/Imperial-Sentinel-Class-Shuttle_a2dc7d3b.jpeg"),
  make_img("23", "/images/nebulon-b-frigate_dce53bc2.jpeg"),
];

const state_link = withClientState({
  cache,
  defaults: {
    images: {
      results: images,
      __typename: "Images",
    },
  },
  typeDefs: `
     type Image {
       id: ID! 
       url: String!
     }
     type Images {
       results: [Image!]!
     }
     type Query {
       images: Images!
       image(id: ID!): Image!
     }
  `,
  resolvers: {
    Query: {
      images: (root, args, context, info) => {
        return {results: images};
      },
      image: (root, {id}, context, info) => {
        const img = images.find(i => i.id === id);
        return img;
      },
    },
  },
});

const rest_link = new RestLink({
  // uri: "https://demo7475333.mockable.io/spaceships",
  uri: "https://swapi.co/api/",
  typePatcher: {
    Images: (data, outerType, patchDeeper) => {
      if (data.results != null) {
        data.results = data.results.map(img => ({
          __typename: "Image",
          ...img,
        }));
      }
      return data;
    },
    Starships: (data, outerType, patchDeeper) => {
      if (data.results != null) {
        data.results = data.results.map(starship => ({
          __typename: "Starship",
          ...starship,
        }));
      }
      return data;
    },
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([state_link, rest_link]),
});

export default client;
