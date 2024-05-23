import React from 'react'
import post from "../../assets/post.png"
import { Slide } from 'react-awesome-reveal'

function Mission() {
    return (
        <div className='container flex flex-col-reverse items-center gap-10 pt-16 pb-2 mx-auto md:flex-row'>

            <div className='w-full'>
                <Slide triggerOnce direction='up'>
                    <img src={post} alt="Mission" className='' />
                </Slide>
            </div>
            <div className='w-full text-base md:text-lg'>
                <Slide triggerOnce direction='right'>
                    <p className='text-lg italic tint-color'>About Stellar Dairies</p>
                    <h3 className='my-3 text-4xl font-black main-color'>WE CREATE THE BEST DAIRY PRODUCTS</h3>
                    {/* <p className='mt-3'>With a background in manufacturing engineering and facing unemployment, Out CEO quickly jumped into training for yoghurt production and later birthed Stellar Dairyland. The rest is history as they say.</p> */}

                    <div className='mt-6 mb-4'>
                        <h2 className='text-lg font-bold main-color'>Vision</h2>
                        <p>To be the leading producer of premium milk products such pro-biotic yoghurt, mala, flavored milk in Kenya, and beyond.</p>
                    </div>
                    <div>
                        <h2 className='text-lg font-bold main-color'>Quality</h2>
                        <p>At Stellar Dairyland, we strive to bring quality products by conducting our production at high standards of hygiene. In addition, our milk is sourced directly from local farmers and pasteurized by us. We use top-of-the-range culture and ingredients to ensure we have the best quality of products.</p>
                    </div>
                </Slide>
            </div>
        </div>
    )
}

export default Mission
