import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Sidebar from "./components/SideBar"
import HomePageLayout from "./pages/HomePageLayout"
import HomePage from "./pages/HomePage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="/" element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
          </Route>
          <Route path="browse" element={<HomePage />}/>
          <Route path="discover" element={<HomePage />}/>
          <Route path="watchlist" element={<HomePage />}/>
          <Route path="settings" element={<HomePage />}/>
          <Route path="logout" element={<HomePage />}/>
        </Route>
        <Route path="/sss" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);