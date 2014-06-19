# App Server #
The App-store would have its own server, separate from the API server but based on the same framework and code-base (ExpressJS + Gamify)

## Storage ##
Themes and widgets would be stored on a CDN.

That keeps 3rd party files away from pagevamp's own server (security threat), while making those files cheap to store, fast to deliver and completely static.

It also outsource the scalability concerns to the CDN provider.

## Data structure ##

