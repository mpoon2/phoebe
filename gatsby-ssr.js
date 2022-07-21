import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"

const Loading = () => <div>Initializing server side rendering...</div>

export const wrapRootElement = ({ element }) => {
  return (
    <ReactKeycloakProvider
      authClient={{}} //an empty object instead of the keycloak instance for the static HTML pages
      initOptions={{
        onLoad: "login-required",
      }}
      LoadingComponent={<Loading />}
    >
      {element}
    </ReactKeycloakProvider>
  )
}
