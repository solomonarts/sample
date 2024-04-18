import React from 'react'
import PageHead from '../../components/page-head'
import ProductsList from './products-list'

function Products() {
    document.title = "Products | Stellar Dairies"
    return (
        <div>
            <PageHead title="Our Products" />
            <div className='container flex flex-row gap-5 py-10 mx-auto'>
                <div className='hidden w-80 border-e md:block'>
                    <p className='p-4 border-b'>Product categories</p>
                </div>
                <ProductsList />
            </div>
        </div>
    )
}

export default Products
