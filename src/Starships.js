import React from "react";

import "./Starships.css";
import {QUERY_SHIPS, QUERY_IMAGES} from "./store";
import {Query, Link, extract_url_model} from "./utils";

const Starships = props => {
  // TBD: we can then merge query_ships and query_images together, when
  // apollo support query of both @rest and @client at the same time,
  return (
    <Query query={QUERY_SHIPS}>
      {all_ships => {
        return (
          <Query query={QUERY_IMAGES}>
            {all_images => {
              const {images: {results: images}} = all_images;
              return (
                <div className="StarshipsContainer">
                  {all_ships.starships.results.map(({url, name}) => {
                    const model = extract_url_model(url);
                    const {url: image_url, selected} = images.find(
                      i => i.id === model,
                    );
                    return (
                      <div key={url}>
                        <Link to={`/starships/${model}`}>
                          <div className="StarshipsCard">
                            <img
                              alt={model}
                              width="100%"
                              crossOrigin="anonymous"
                              src={image_url[selected]}
                            />
                            <div className="StarshipsLabel">
                              <h1>{name}</h1>
                              <h2>{url}</h2>
                            </div>
                          </div>
                        </Link>
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
