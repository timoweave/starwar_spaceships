Installation
############

`git clone`
`npm install`
`npm start`

Behavioral/Styling
##################

There is a header bar just read "Watto's Space Eporiume". When a given
route is not matched/recognized, it will redirected to `/starships`.

When the mouse is hover enter a starship in `/starships`, it will
scale up to 105% in 0.5 sec.  When the mouse is hover exit a starship,
it will shrink down to 95% in 0.5 sec.

Routing
#######
1. starships   show all the available starship available from Watto Space Eporium
1. starships/:id show detail of a particular starship
1. images  (misc) show list of images for starships
1. images/:id (misc) show one image
1. about (misc) show my info

Stack
#####

1. use [create-react-app](https://github.com/facebookincubator/create-react-app). to 
   quickly setup babel, webpack, and hmr (parcel-bundle could be used, but it is a 
   bit cutting edge if there is time)
1. use apollo-link-rest graphql to wrap rest api (easy to filter and specify data needed), 
   and using apollo-link-state, manage client side state management (in this case just 
   match the image with the starship) and apollo-cache-presistent to use localStorage.
1. add service worker to speed up asset loading for faster response and faster hot module reload.
   (especially useful for large number of image files)
1. image reference are from https://www.starwars.com/databank/b-wing-fighter
1. api https://swapi.co/api/ and https://demo7475333.mockable.io/spaceships

This project was bootstrapped with 
