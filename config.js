const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://mattycakes.ca",
    gaTrackingId: null,
    trailingSlash: false,
  },
  sidebar: {
    forcedNavOrder: [
      "/academic", // add trailing slash if enabled above
      "/ramblings",
    ],
    collapsedNav: [
      "/ramblings", // add trailing slash if enabled above
    ],
    links: [{ text: "Hasura", link: "https://hasura.io" }],
    frontLine: false,
    ignoreIndex: false,
  },
}

module.exports = config
