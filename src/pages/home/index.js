import React from 'react'
import milk from "../../assets/milk_splash.png"
import product from "../../assets/product-banner.png"
import OurPrducts from './our-prducts'
import Mission from './mission'
import { Swiper, SwiperSlide } from 'swiper/react';


import bg from "../../assets/backgrounds/bg.jpg"
import bg1 from "../../assets/backgrounds/bg1.jpg"
import bg2 from "../../assets/backgrounds/bg2.jpg"
import bg3 from "../../assets/backgrounds/bg3.jpg"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';


import { Autoplay, Navigation, EffectFade, Thumbs, FreeMode } from 'swiper/modules';

function Home() {

    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

    const slides = [
        {
            background: bg,
            heading: "Welcome to Stellar Dairyland",
            title: <h2 className='font-semibold tracking-wider uppercase md:text-lg leading-wide '>
                Welcome to Stellar Dairyland<br />
                <span className='text-4xl font-black tracking-wider md:text-5xl main-color'>A deliciously healthy option</span></h2>
            , "description": "With a variety of flavors and variations, with Stellar, You can't go wrong."
        },
        {
            background: bg1,
            heading: "Community based",
            title: <h2 className='font-semibold tracking-wider uppercase md:text-lg leading-wide '>
                Community based<br />
                <span className='text-4xl font-black tracking-wider md:text-5xl main-color'>service delivery cycle.</span></h2>,
            "description": "By leveraging these technologies, we are able to deliver a superior yogurt experience that is convenient, sustainable, and always of the highest quality."
        },
        {
            background: bg2,
            heading: "A wide range of products",
            title: <h2 className='font-semibold tracking-wider uppercase md:text-lg leading-wide '>
                A wide range of products<br />
                <span className='text-4xl font-black tracking-wider md:text-5xl main-color'>Building Diversity</span></h2>,
            "description": "At Stellar Dairy Land, we are committed to staying at the forefront of technology to enhance every aspect of our business, from production to distribution to customer experience. Here are some of the cutting-edge technologies we leverage"
        },
        {
            background: bg3,
            heading: "Quality Products",
            title: <h2 className='font-semibold tracking-wider uppercase md:text-lg leading-wide '>
                Quality Products<br />
                <span className='text-4xl font-black tracking-widest md:text-6xl main-color'>Boost your Immunity</span></h2>,
            "description": "At Stellar Dairyland, we strive to bring quality products by conducting our production at high standards of hygiene. In addition, our milk is sourced directly from local farmers and pasteurized by us."
        }
    ]

    return (
        <div>
            <div className='relative'>
                <Swiper
                    className='relative'
                    slidesPerView={1}
                    effect={'fade'}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}

                    modules={[Autoplay, FreeMode, EffectFade, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                >
                    {slides.map((slide, i) => <SwiperSlide key={i}>
                        <div className='relative'>
                            <div className='absolute w-full h-full bg-center bg-no-repeat brightness-[35%]' style={{ backgroundImage: `url(${slide.background})` }}></div>

                            <div className='relative backdrop-blur-0'>
                                <div className='container flex flex-col items-center mx-auto text-lg text-white gap-y-8 pt-28 pb-36 md:pt-40 md:pb-60 lg:flex-row'>

                                    <div className='flex-1 max-w-2xl px-3 md:px-0'>
                                        {slide.title}
                                        <p className='mt-3 text-base md:text-lg'>{slide.description}</p>

                                        <button className='main-bg rounded-bl-3xl rounded-tr-3xl text-white px-14 pt-3 pb-3.5 text-sm mx-auto mt-6 font-medium'>Learn More</button>
                                    </div>

                                    <div className='relative'>
                                        <img src={product} alt="splash" className='relative object-contain' />
                                    </div>

                                </div>
                            </div>
                            <img src={milk} className='absolute bottom-0 w-full h-60' alt="milk splash" />
                        </div>
                    </SwiperSlide>)}
                </Swiper>

                <div className='flex justify-end mt-[-14rem] pe-16'>
                    <div className='max-w-3xl '>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            {slides.map((slide, i) => <SwiperSlide key={i}>
                                <div className='relative overflow-hidden rounded-full'>
                                    <img src={slide.background} alt="splash" className='relative object-cover aspect-[1/1]' />
                                    <p className='absolute bottom-0 px-12 py-2 text-sm text-center text-white bg-black/50 line-clamp-2'>{slide.heading}</p>
                                </div>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                </div>
            </div>


            <Mission />

            <OurPrducts />
        </div>
    )
}

export default Home
