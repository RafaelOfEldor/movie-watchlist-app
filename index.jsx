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




function App() {
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>

          <Route path="/" element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              <Route path="browse" element={<Browse />}/>
              <Route path="discover" element={<HomePage />}/>
              <Route path="logout" element={<HomePage />}/>

              <Route element={<AuthContext />}>
              <Route element={<AuthorizedPage />}>
                <Route path="watchlist" element={<WatchlistPage />}/>
              </Route>

              <Route element={<AuthorizedPage />}>
                <Route path="settings" element={<HomePage />}/>
              </Route>

              <Route path="login" element={<LoginPage />}/>
              <Route path="signup" element={<SignupPage />}/>
            </Route>
            
          </Route>

          

          
        </Route>

        

        <Route path="*" element={<NotFOundPage />} />
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

