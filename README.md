<h1 align="center">
  Phoebe
</h1>

This is a minimal [Gatsby](https://www.gatsbyjs.com/) theme for [Obsidian](https://obsidian.md) authoring.

First and foremost, this is a personal project and not meant to be deployed in any production builds.  The [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) was used as a base due to it's simplicity and commitment to using remark for Markdown parsing. A non comprehensive list of technologies used can be found below:

- [Obsidian](https://obsidian.md) - knowledge base management and markdown authoring
- [Gatsby](https://www.gatsbyjs.com) - to generate static web pages from MD
- [gatsby-starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog) - as a base theme
- [TailwindCSS](https://tailwindcss.com) - opinionated utility classes and states
- [TailwindUI](https://tailwindui.com) - for creating React based UI components
- [React](https://reactjs.org) - a fallback to create custom components
- [NGINX](https://www.nginx.com) - reverse proxy for serving the static files
- [Webhook](https://github.com/adnanh/webhook) - a lightweight webhook server for auto building
- [GitHub Actions](https://github.com/features/actions) - triggers Webhook on push 

## Install

1.  **Create a Gatsby site.**

    Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/part-0/#gatsby-cli)) to create a new site, specifying the blog starter.

    ```shell
    # create a new Gatsby site using the blog starter
    gatsby new my-blog-starter https://github.com/mpoon2/phoebe
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-blog-starter/
    gatsby develop
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries)._

    Open the `my-blog-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

4. (Optional) **Setup NGINX to serve the static files**

    Install NGINX using:

    ```shell
    sudo apt update
    sudo apt install -y nginx certbot python3-certbot-nginx
    ```

    Update `/etc/nginx/sites-available/mattycakes` using `sudo nano` with the following configuration, replacing `mattycakes` and `mattycakes.ca` with your own domain name:

    ```conf
    server {
        server_name mattycakes.ca;

        root /home/NESPi/mattycakes/phoebe/public;

        location / {
        }
    }
    ```

    Enable the config using:
    
    ```shell
    sudo ln -s ../sites-available/code-server /etc/nginx/sites-enabled/mattycakes
    sudo certbot --non-interactive --redirect --agree-tos --nginx -d mattycakes.ca -m matt@mattycakes.ca
    ```

5. (Optional) **Setup Webhook to run shell commands**

6. (Optional) **Setup GitHub Actions to trigger Webhook**


## File Structure Cheatsheet

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## Extra References

- [Code-server documententation](https://coder.com/docs/code-server/latest)
- [In-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/tutorial/)
- [Gatsby documentation](https://www.gatsbyjs.com/docs/)