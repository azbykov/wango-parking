import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import StartParkingPage from './pages/StartParkingPage'
// import StopParkingPage from './pages/StopParkingPage'
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<StartParkingPage />} />
                    {/*<Route path="stop" element={<StopParkingPage />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
