const React = require("react")
const { ReactKeycloakProvider } = require("@react-keycloak/web")

function wrapRootElement({ element }) {
  return (
    <ReactKeycloakProvider authClient={{}}>{element}</ReactKeycloakProvider>
  )
}

exports.wrapRootElement = wrapRootElement
