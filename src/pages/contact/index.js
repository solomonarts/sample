import React from 'react'
import PageHead from '../../components/page-head'

function Contact() {
    document.title = "Contact us | Stellar Dairies"
    return (
        <div>
            <PageHead title="Contact Us" />
            <div className='container flex flex-col gap-8 py-16 mx-auto lg:flex-row'>
                <div className='w-full lg:w-2/5'>
                    <p className='text-lg italic tint-color'>For more Information</p>
                    <h3 className='mt-3 mb-6 text-4xl font-black main-color'>Hey, let's talk!</h3>

                    <p className='my-6 text-lg'>If you have any questions or problems simply use the following contact details.</p>

                </div>
                <div className='flex-1'>
                    <h3 className='mt-3 mb-6 text-4xl font-bold main-color'>Send Us A Message</h3>
                    <p className='my-6 text-lg'>Please fill out the form below and our expert team will get back to you shortly.</p>
                </div>
            </div>
        </div>
    )
}

export default Contact
