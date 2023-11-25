## React-Suspend with data-loading

There are these different modes how the page data are loaded:

-   [Classic way without Suspense](http://localhost:3000/restful): **All or nothing**: Fetching all data in place within a `useEffect()` + props-drilling
-   [One global Suspense](http://localhost:3000/wait-for-all):
    **Waiting until all**: **Waiting until** all data got fetched
-   ["Waterfall"](http://localhost:3000/waterfall): **Incremental Loading**: More than 1 Suspense in the tree hierarchy:
-   [Side-by-Side](http://localhost:3000/side-by-side): Show both: incremental loading and wait-for-all

![screenshot.png](public/screenshot-side-to-side.png)

On the right side, there is a Cache-loading inspector ["hitchcock"](https://github.com/pomber/hitchcock#readme) by [@pombo](https://github.com/pomber), based on the work of Jared Palmer

## Purpose: React Suspense - demo

List the `(feature) branches` of a GitHub repository with its `last commit's`

-   build status-es
-   linked PR
-   commit message and author
-   linked deployment

## Getting started

After invoking this in a shell

    git clone https://github.com/lowsky/react-suspense-meetup-demo
    cd react-suspense-meetup-demo

    yarn

then set up the `github-token` (see below: [Setup GitHub Token](#setupgithubtoken) )

before starting local dev mode via:

    yarn dev

This runs **Next.js** in **dev-mode**

Now, you can open the home [http://localhost:3000](http://localhost:3000) in your browser.

Have fun!

### setupGithubToken

You **need to create your own github-token** (see https://github.com/settings/tokens/) and
store it locally in `.env` file

    # create an .env file with this content ...
    GITHUB_TOKEN=XXX

    # ... and replace the XXX with your API key
    # typically something like
    # GITHUB_TOKEN=ghp_....

## Stack

-   [Next.js](https://nextjs.org/)
-   [ChakraUI](https://chakra-ui.com/) ~~[Bulma](https://bulma.io/)~~
-   React
-   React.Cache
-   React.Suspend
-   [Typescript](https://www.typescriptlang.org/)

## License

Licensed under the Apache License 2.0, Copyright ©️ 2023 Robert Hostlowsky. See [LICENSE](LICENSE) for more information.
