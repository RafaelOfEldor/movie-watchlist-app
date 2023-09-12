import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import Sidebar from "/components/SideBar"
import HomePageLayout from "./pages/HomePageLayout"
import HomePage from "./pages/HomePage"
import AuthorizedPage from "./pages/AuthorizedPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { AuthContext } from "/components/AuthContext"
import Browse from "./pages/Browse"
import NotFOundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import DiscoverPage from './pages/DiscoverPage';
import MovieInfoPage from './pages/MovieInfoPage';




function App() {
  
  /*                                                       !!!   TO DO    !!!                                                                                          */
  /*
                                                          HIGH PRIORITY

  pagination on the discover page and homepage for rotation of movies

  making background blurry and stopping scroll when selecting a movie

  Seems that increasingthe amount of pages directly correleates lag and bad performance. Maybe because it updates every single route that uses the fetch request.
  Potential solution: make it so that only browse changes fetch request base on changing the page. This works too because the search will be in browse, whereas
  discover and homepage will only use specific categories and filters

                                                          LOW PRIORITY

  Adding a movie specific page with more info(actors, release date etc.), pictures, and trailers as well as link to imdb

  navigation history for when you click on read more and want to go back

  styling the login and create user forms and pages better
  
  just overall styling and maybe look into performance*/
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          
          <Route element={<AuthContext />}>

            <Route path="/" element={<HomePageLayout />}>

              <Route index element={<HomePage />} />
              <Route path="browse/:search" element={<Browse />}/>
              <Route path="discover" element={<DiscoverPage />}/>
              <Route path="browse/movies/:movieId" element={<MovieInfoPage />}/>

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

