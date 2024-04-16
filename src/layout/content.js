import React from 'react'
import Header from './header'
import Home from '../pages/home'
import Footer from './footer'

function Content() {
    return (
        <div className='relative'>
            <Header />
            <div className='relative mt-[-70px]'>
                <Home />
            </div>

            <Footer />
        </div>
    )
}

export default Content
