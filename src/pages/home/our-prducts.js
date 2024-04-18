import React from 'react'
import bg from "../../assets/Shop1.jpg"
import { products } from '../../constants/data'
import { Link } from 'react-router-dom'

function OurPrducts() {

    return (
        <div style={{ backgroundImage: `url(${bg})` }} className='bg-no-repeat bg-cover'>
            <div className='container py-20 mx-auto'>
                <h2 className='mt-10 text-4xl font-bold text-center'>Our Products</h2>

                <div className='grid grid-cols-2 gap-4 mt-10 md:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {products.slice(0, 10).map((p, i) => <div key={i} className='pt-6 bg-white rounded-xl'>
                        <img src={p.image} alt={p.title} className='aspect-[3/2] object-contain' />
                        <div className='p-3'>
                            <h3 className='mt-3 text-sm font-medium text-center line-clamp-1 sm:text-base'>{p.title}</h3>
                        </div>
                    </div>)}
                </div>

                <div className='flex justify-center'>
                    <Link to="/products" >
                        <p className='px-12 py-3 mt-10 text-white rounded-tr-3xl main-bg'>View more</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OurPrducts
