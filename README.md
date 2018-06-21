Installation
============

1. `git clone` 
1. `npm install`
1. `npm start`
1. `open http://localhost:3000` (if previous step didn't open)

Design
======

There is a header bar just read "Watto's Space Eporiume". When a given
route is not matched/recognized, it will redirected to `/starships`.

When the mouse is hover enter a starship in `/starships`, it will
scale up to 105% in 0.5 sec.  When the mouse is hover exit a starship,
it will shrink down to 95% in 0.5 sec.

When visiting the detail page `/starships/:id`, one can click the image 
to cycle through all the avaialable images. The last visible image is also
reflected on the `/starships` (list of all starships). clicking the button buy
will pop up an alert to my phone number to call.

Clicking the header bar text will forward the page to `/about` to 
give myself some info.

Routing
=======

1. /starships     show all the available starship available from Watto Space Eporium
1. /starships/:id show detail of a particular starship
1. /about         show my contact info

Stack
=====

1. use [create-react-app](https://github.com/facebookincubator/create-react-app). to 
   quickly setup babel, webpack, and hmr (parcel-bundle could be used, but it is a 
   bit cutting edge if there is time)
1. use https://swapi.co/api/, not https://demo7475333.mockable.io/spaceships. It is because
   the second one lack of 'id' or something to uniquely identify. Also, the first one also 
   has a rest api for each item. So it will make it easier to split between the list-view 
   vs detail-view. 
1. we create a image list on client side to match with each starship using the unique id.
   (images might not match exactly)
1. we use react-router-dom to make single page app (SPA) and help testing faster 
   (reloading the same page, clearing caches, and testing, over over again 
   during development)
1. use apollo-link-rest graphql to wrap rest api (easy to filter and specify data needed), 
   and using apollo-link-state, manage client side state management (in this case just 
   match the image with the starship) and apollo-cache-presistent to use localStorage.
1. `store.js` is the database. We are not using redux, which has a lot more boilerplate 
   then apollo-link-state. There are few advantages of using graphql state management. 
   a) just query/mutation to see the state changes. b) use chorme graphiql to experiment 
   query/mutation. c) also allow the client side data to migrate to backend side faster.
1. `sw.js` is service worker to speed up asset loading for faster response (especially 
   useful for large number of image files)and faster hot module reload along with 
   `manifest.json` to make progressive web app (PWA) 
1. image references are from https://www.starwars.com/databank/b-wing-fighter

