importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js",
);

if (workbox) {
  workbox.routing.registerRoute(
    new RegExp(".*.js"),
    workbox.strategies.networkFirst(),
  );

  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "css-cache",
    }),
  );

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|ico)/,
    workbox.strategies.cacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  console.log("workbox configured");
}
