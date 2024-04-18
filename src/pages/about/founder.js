import React from 'react'
import about from "../../assets/about-stella2.png"
import { Fade, Slide } from 'react-awesome-reveal'

function Founder() {
    return (
        <div className='grid items-center grid-cols-1 gap-10 mt-16 lg:grid-cols-2'>

            <div className='w-full text-base md:text-lg'>
                <Slide triggerOnce direction='up'>
                    <p className='text-lg italic tint-color'>About Founder</p>
                    <h3 className='mt-3 mb-6 text-4xl font-black uppercase main-color'>story of our founder</h3>

                    <p>Steller's journey began with a simple mission from our CEO, Viola Stellah Mbuga, a mother of three children, to relieve her second child from constant constipation while weaning . A friend introduced Viola to probiotic drops to add to the baby's food, which were so expensive and unsustainable.</p>

                    <p className='my-3 italic'>"However, I discovered that all my children loved yoghurt, so I introduced it as a meal in their menu and later discovered probiotic yogurt, which was a bit more expensive in comparison to regular yogurt."</p>

                    <p>An uncle later introduced Viola to homemade probiotic yogurt that was not only affordable but also healthy and preservative-free. He relocated out of the city, leaving behind unserved clients like her.</p>

                </Slide></div>
            <div className='flex justify-center'>
                <Fade triggerOnce>
                    <img src={about} alt="" />
                </Fade>
            </div>
        </div>
    )
}

export default Founder
