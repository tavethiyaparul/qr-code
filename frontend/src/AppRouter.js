import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navbar'
// import VideoCall from './pages/VideoCall'
import Footer from './component/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import About from './pages/About'
import Error from './pages/Error'
import Qrcode from './pages/Qrcode'

function AppRouter() {
    return (
        <>
            <div className="App">
                <Router basename="/qr">
                    <Navbar />
                    <Routes>
                        {/* <Route path="/about" element={<About />} />
                        <Route path="/policy" element={<PrivacyPolicy />} /> */}
                        <Route path="/" element={<Qrcode />} />
                        <Route path="/error" element={<Error />} />
                    </Routes>
                    {/* <Footer /> */}
                </Router>
            </div>
        </>
    )
}

export default AppRouter
