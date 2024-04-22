import React from 'react'
import Header from './header'
import Home from '../pages/home'
import Footer from './footer'
import { Route, Routes } from 'react-router-dom'
import Products from '../pages/products'
import AboutUs from '../pages/about'
import Contact from '../pages/contact'
import Reseller from '../pages/reseller'

function Content() {
    return (
        <div className='relative'>
            <Header />
            <div className='relative mt-[-70px]'>
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path='products' element={<Products />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='reseller' element={<Reseller />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </div>

            <Footer />
        </div>
    )
}

export default Content
