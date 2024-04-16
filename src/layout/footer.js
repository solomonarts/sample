import React from 'react'
import wave from "../assets/wave.png"

function Footer() {
    return (
        <div style={{ backgroundColor: "#16938436" }} className='relative'>
            <img src={wave} alt="wave" className='absolute top-0 w-full h-full' />
            <div className='container relative mx-auto'>
                <div className='py-16'>
                    <p>Footer elements</p>
                </div>
                <div className='p-4 text-center border-t'>
                    <p>Copyright {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
