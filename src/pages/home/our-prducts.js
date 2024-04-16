import React from 'react'
import product from "../../assets/products/product.jpg"
import product1 from "../../assets/products/product1.jpg"
import product2 from "../../assets/products/product2.jpg"
import bg from "../../assets/Shop1.jpg"

function OurPrducts() {
    const products = [
        { image: product, title: "Creamy Vanilla" },
        { image: product1, title: "Luscious Strawberry" },
        { image: product2, title: "Natural Yoghurt" },
        { image: product, title: "Mango Flavor" },
        { image: product1, title: "Passion Flavor" },
        { image: product2, title: "Blackcurrant Flavor" },
    ]
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className='bg-no-repeat bg-cover'>
            <div className='container py-20 mx-auto'>
                <h2 className='mt-10 text-4xl font-bold text-center'>Our Products</h2>

                <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {products.map((p, i) => <div key={i} className='px-4 pt-6 pb-2 bg-white rounded-xl'>
                        <img src={p.image} alt={p.title} className='aspect-[3/2] object-contain' />
                        <div className='p-3'>
                            <h3 className='mt-3 text-lg font-medium text-center'>{p.title}</h3>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default OurPrducts
