import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-client-preset";
import {InMemoryCache} from "apollo-cache-inmemory";
import {RestLink} from "apollo-link-rest";
import {withClientState} from "apollo-link-state";
import {persistCache} from "apollo-cache-persist";
import gql from "graphql-tag";

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage,
});

const make_img = (id, url) => ({id, url, selected: 0, __typename: "Image"});
const images = [
  // TBD: should create graphql server to send image urls
  make_img("15", [
    "/images/executor_anon4_63.jpg",
    "/images/executor_class_ssd_final_demo_by_enterprise_e.jpg",
    "/images/executor-ansel-hsiao-anon4-58.jpg",
    "/images/executor04.jpg",
    "/images/executor_RB0009_Super_Star_Destroyer_v03_CamF_4K.jpg",
  ]),
  make_img("5", [
    "/images/ILC-2.jpg",
    "/images/ILC_968d12788960e0d767c12e2eb7ac1d83.jpg",
    "/images/ILC_Sentinel_negvv.png",
    "/images/ILC_TarkinLothalArrival.png",
    "/images/ILC_main-qimg-8346a2724740c283ab38d922af182d12-c.jpeg",
  ]),
  make_img("9", [
    "/images/death_star_48e990fd604d5aeb19a81b3843353dde.jpg",
    "/images/death_star_DSI_hdapproach.png",
    "/images/Death-Star-Construction-1.jpg",
    "/images/Death_Star_LaserConstruction.jpg",
    "/images/1deathstar.jpeg",
  ]),
  make_img("10", [
    "/images/MillenniumFalconTFA-Fathead.png",
    "/images/millennium-falcon-pewter-colectible-royal-selangor-903093-05.jpg",
    "/images/millennium-falcon-00.jpg",
    "/images/millennium_falcon_7a.jpg",
    "/images/millenniumfalcon_72_1_00_2048x2048.jpg",
    "/images/millennium-falcon-pewter-colectible-royal-selangor-903093-06.jpg",
  ]),
  make_img("11", [
    "/images/Y-Wing-Fighter_0e78c9ae.jpeg",
    "/images/Ywing-SWE.jpg",
    "/images/y-wing-1.jpg",
    "/images/y-wing-2_b47c5d3a.jpeg",
    "/images/y-wings_trenchrun.png",
    "/images/y-wing-Steps_Into_Shadow_10.jpg",
  ]),
  make_img("12", [
    "/images/X-Wing-Fighter_47c7c342.jpeg",
    "/images/x-wing-maxresdefault.jpg",
    "/images/X-Wing-777x437.jpg",
    "/images/x-wing-1b2fe2cd150f87c7d616da3f86ddff2a.jpg",
    "/images/x-wing-space-movies-black_background-748x421.jpg",
    "/images/x-wing-HoPuG.jpg",
    "/images/x-wing-40997.jpg",
    "/images/x-wing-fighter-3d-model-low-poly-rigged-max-obj-3ds-fbx-lwo-lw-lws-mtl.png",
    "/images/X-wing_SWGTCG.jpg",
  ]),
  make_img("13", [
    "/images/image_3aaf40b1.jpeg",
    "/images/tie_y2.jpg",
    "/images/tie_bandtie02.jpg",
    "/images/tei_Bandai-1-72-Star-Wars-TIE-interceptor-Plastic-model-Scale-model-building-toy-kids.jpg_640x640.jpg",
    "/images/tie_71RaYizVGdL._SL1500_.jpg",
    "/images/tie_fighter_advanced_scout_by_handofmanos-d6r717r.jpg",
    "/images/tie_darth_vader_battledamaged_tie_advanced_x1_by_volkerheide-dard596.jpg",
    "/images/tie-ansel-hsiao-x1-8.jpg",
    "/images/Tiex1-headon.jpg",
    "/images/tie-maxresdefault.jpg",
  ]),
  make_img("21", [
    "/images/databank_slavei_01_169_8dc3102d.jpeg",
    "/images/slave_crosssection.jpg",
    "/images/slave-1-in-action-star-wars-bounty-hunters-4441869-469-456.jpg",
    "/images/slave_empire-slave1-swinsider49.jpg",
    "/images/slave_446c9051fb3f7ebc49b18a35334a029a.jpg",
    "/images/slave_maxresdefault.jpg",
  ]),
  make_img("22", [
    "/images/Imperial-Sentinel-Class-Shuttle_a2dc7d3b.jpeg",
    "/images/imperial_shuttle1_wm_b68b586b-6cb3-4c00-a433-8b8e0c7b4088_grande.jpg",
    "/images/imperial-shuttle-3d-model-low-poly-animated-rigged-max-obj-3ds-fbx.jpg",
    "/images/imperial_18e0ebf77bfa6a6e07c44778bc0a5ae36689c853_00.jpg",
  ]),
  make_img("23", [
    "/images/nebulon-b-frigate_dce53bc2.jpeg",
    "/images/nebulon_4845e86b4240bc4e054336ae11d69067.jpg",
    "/images/nebulon_80c55e122e3b8489cc400738b57c2455--mad-the-ojays.jpg",
    "/images/nebulon_2015-12-03_at_9.46.26_pm.png",
    "/images/nebulon_EF76NEBBfrigate.jpg",
  ]),
];

export const QUERY_IMAGE = gql`
  query($model: String!) {
    image(id: $model) @client {
      id
      url
      selected
    }
  }
`;

export const QUERY_SHIP = gql`
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

export const QUERY_SHIPS = gql`
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

export const QUERY_IMAGES = gql`
  query {
    images @client {
      results {
        id
        url
        selected
      }
    }
  }
`;

export const NEXT_IMAGE = gql`
  mutation($id: String!) {
    nextImage(id: $id) @client
  }
`;

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
        const {images} = context.cache.readQuery({query: QUERY_IMAGES});
        return {results: images};
      },
      image: (root, {id}, context, info) => {
        const {images: {results}} = context.cache.readQuery({
          query: QUERY_IMAGES,
        });
        const img = results.find(i => i.id === id);
        return img;
      },
    },
    Mutation: {
      nextImage: (root, {id}, context) => {
        const {images: {results}} = context.cache.readQuery({
          query: QUERY_IMAGES,
        });
        const img = results.find(i => i.id === id);
        img.selected = (img.selected + 1) % img.url.length;
        const data = {
          images: {
            results,
            __typename: "Images",
          },
        };
        context.cache.writeData({data});
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
