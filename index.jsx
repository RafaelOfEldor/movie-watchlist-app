import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Sidebar from "./components/SideBar"
import HomePageLayout from "./pages/HomePageLayout"
import HomePage from "./pages/HomePage"
import AuthorizedPage from "./pages/AuthorizedPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { AuthContext } from "./components/AuthContext"
import Browse from "./pages/Browse"
import NotFOundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import DiscoverPage from './pages/DiscoverPage';




function App() {
  
  /*                                                       !!!   TO DO    !!!                                                                                          */
  /*
                                                          HIGH PRIORITY

  The current homepage is the way i want the discovery page to be, with the added functionality of being able to see all the movies
  of the different genres. I want the homepage to be a nice looking page with the current most trending movie as a big individually-customized banner,
  with a "what's new rotation" as well as some other things that aren't too important to be specific about. 

  I also want to create a better user experience when clicking add to watchlist, or remove from watchlist, as well as good redirects and navigations
  for instance redirecting after adding to or removing wathclist, redirecting from login without intended-path,
  and redirecting to browse when entering in search or if you click the search icon, depends on how i end up styling/routing homepage and discovery page
  
  fixing search parameters. Only thing required is when you write something into searchbar it shows /browse?search="searchText"

  making background blurry and stopping scroll when selecting a movie

  Seems that increasingthe amount of pages directly correleates lag and bad performance. Maybe because it updates every single route that uses the fetch request.
  Potential solution: make it so that only browse changes fetch request base on changing the page. This works too because the search will be in browse, whereas
  discover and homepage will only use specific categories and filters

                                                          LOW PRIORITY

  Adding a movie specific page with more info(actors, release date etc.), pictures, and trailers as well as link to imdb

  styling the login and create user forms and pages better
  
  just overall styling and maybe look into performance*/
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          
          <Route element={<AuthContext />}>

            <Route path="/" element={<HomePageLayout />}>

              <Route index element={<HomePage />} />
              <Route path="browse" element={<Browse />}/>
              <Route path="discover" element={<DiscoverPage />}/>

                <Route element={<AuthorizedPage />}>
                  <Route path="watchlist" element={<WatchlistPage />}/>
                </Route>

                <Route element={<AuthorizedPage />}>
                  <Route path="settings" element={<HomePage />}/>
                </Route>

            </Route>

            <Route path="login" element={<LoginPage />}/>
            <Route path="signup" element={<SignupPage />}/>

          </Route>

          <Route path="*" element={<NotFOundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

