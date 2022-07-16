import React from "react"
import { graphql } from "gatsby"
import Footer from "../components/footer"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { SignIn } from "@clerk/clerk-react"

// Render the sign in component in your
// custom sign in page.
const SignInPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Login Page" />
      <SignIn />
      <Footer />
    </Layout>
  )
}

export default SignInPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
