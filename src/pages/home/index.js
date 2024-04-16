import React from 'react'
import bg from "../../assets/bg1.jpg"
import milk from "../../assets/milk_splash.png"
import product from "../../assets/product-banner.png"
import OurPrducts from './our-prducts'
import Mission from './mission'

function Home() {
    return (
        <div>
            <div className='relative'>
                <div className='absolute w-full h-full bg-center bg-no-repeat brightness-[50%]' style={{ backgroundImage: `url(${bg})` }}></div>

                <div className='backdrop-blur'>
                    <div className='container relative flex flex-col items-center mx-auto text-lg text-white gap-y-8 pt-28 pb-36 md:pt-48 md:pb-64 lg:flex-row'>
                        <div className='relative'>
                            <img src={product} alt="splash" className='relative object-contain' />
                        </div>
                        <div className='flex-1 max-w-xl px-3 md:px-0'>
                            <h2 className='font-semibold tracking-wider uppercase md:text-lg leading-wide '>
                                A wide range of products<br />
                                <span className='text-4xl font-black tracking-widest md:text-6xl main-color'>Building Diversity</span></h2>
                            <p className='mt-3 text-base md:text-lg'>At Stellar Dairy Land, we are committed to staying at the forefront of technology to enhance every aspect of our business, from production to distribution to customer experience. Here are some of the cutting-edge technologies we leverage:
                            </p>

                            <button className='main-bg rounded-bl-3xl rounded-tr-3xl text-white px-14 pt-3 pb-3.5 text-sm mx-auto mt-6 font-medium'>Learn More</button>
                        </div>

                    </div>
                </div>


                {/* <div style={{ backgroundImage: `url(${milk})` }} className='absolute bottom-0 w-full bg-center bg-no-repeat bg-cover h-96'></div> */}
                <img src={milk} className='absolute bottom-0 w-full' alt="milk splash" />
            </div>

            <Mission />

            <OurPrducts />
        </div>
    )
}

export default Home
