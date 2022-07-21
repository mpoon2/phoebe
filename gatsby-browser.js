//gatsby-browser.js
import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import keycloak from "./src/components/keycloak"

// NORMALIZE CSS ACROSS ALL BROWSERS
import "./src/styles/normalize.css"
// TAILWIND CSS IMPORT
import "./src/styles/global.css"
// PALETTE FOR COLOUR STYLING
import "./src/styles/palette.css"
// BASE STYLING
import "./src/styles/style.css"
// DARK MODE FOR BASE STYLING
import "./src/styles/dark.css"
// PRIMSJS HIGHLIGHTING
import("./src/styles/prismjs/nord-light.scss")
import("./src/styles/prismjs/nord-dark.scss")
// KATEX CSS FILE
import(`katex/dist/katex.min.css`)

const Loading = () => <div>Loading Keycloak</div>

// Wrap everything inside KeycloakProvider
export const wrapRootElement = ({ element }) => {
  return (
    <ReactKeycloakProvider authClient={keycloak} LoadingComponent={<Loading />}>
      {element}
    </ReactKeycloakProvider>
  )
}
