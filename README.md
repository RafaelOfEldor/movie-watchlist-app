
Website showcasing all the code:


https://watcherofmovies.netlify.app/


Also: If you're making changes keep in mind that for some dumb reason the localhost website that runs the code from editor and the project in github render differently.
Perhaps there's some difference in runtime or a built in limit or something, for the watchlist movies as well as the initial bunch of fetch-requests, it is optimal for the localhost
to have a condition where said useEffects only run based off of a ref being higher than 0. The ref is initialized as 0 and then increments 1 after each render, such that the fetch-requests
and rendering of watchlist elements only happen once at launch/when project is saved