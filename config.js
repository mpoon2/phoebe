const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://mattycakes.ca/",
    gaTrackingId: null,
    trailingSlash: true,
  },
  sidebar: {
    forcedNavOrder: [
      "/academic/", // add trailing slash if enabled above,
      "/journal/",
      "/personal/",
      "/ramblings/",
      "/CHANGELOG",
    ],
    collapsedNav: [
      "/journal/", // add trailing slash if enabled above
    ],
    links: [
      { text: "Phoebe v0.1.0", link: "https://github.com/mpoon2/phoebe" },
    ],
    frontLine: false,
    ignoreIndex: false,
  },
}

module.exports = config
