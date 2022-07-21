import React from "react"
import { ReactKeycloakProvider } from "@react-keycloak/web"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Loading = () => (
  <div className="text-center py-8 block">
    <p>
      <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
    </p>
    <p>Initializing server size rendering...</p>
  </div>
)

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
