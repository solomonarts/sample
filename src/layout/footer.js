import React from 'react'
import wave from "../assets/wave.png"
import logo from "../assets/logo.png"

function Footer() {
    return (
        <div style={{ backgroundColor: "#16938436" }} className='relative'>
            <img src={wave} alt="wave" className='absolute top-0 w-full h-full' />
            <div className='container relative mx-auto'>
                <div className='grid grid-cols-2 gap-8 py-16'>
                    <div>
                        <img src={logo} alt="Stellar Dairies" className='h-20' />
                        <p className='mt-5 text-lg'>At Stellar Dairyland, we strive to bring quality products by conducting our production at high standards of hygiene. In addition, our milk is sourced directly from local farmers and pasteurized by us. We use top-of-the-range culture and ingredients to ensure we have the best quality of products.</p>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>
                            <h2 className='mb-3 text-lg font-medium'>Links</h2>
                            <p>Footer elements</p>
                        </div>
                        <div>
                            <h2 className='mb-3 text-lg font-medium'>Contacts</h2>
                            <p>Footer elements</p>
                        </div>
                    </div>
                </div>
                <div className='p-4 text-center border-t'>
                    <p>Copyright {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
