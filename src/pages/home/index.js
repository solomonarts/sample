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
                    <div className='container relative flex flex-col items-center gap-8 pt-48 mx-auto text-lg text-white pb-60 lg:flex-row'>
                        <div className='relative'>
                            <img src={product} alt="splash" className='relative object-contain' />
                        </div>
                        <div className='flex-1 max-w-xl'>
                            <h2 className='text-lg font-semibold tracking-wider uppercase leading-wide '>
                                A wide range of products<br />
                                <span className='text-6xl font-black tracking-widest main-color text-border'>Building Diversity</span></h2>
                            <p className='mt-3'>At Stellar Dairy Land, we are committed to staying at the forefront of technology to enhance every aspect of our business, from production to distribution to customer experience. Here are some of the cutting-edge technologies we leverage:
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
