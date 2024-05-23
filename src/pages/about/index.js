import React from 'react'
import PageHead from '../../components/page-head'
import Mission from '../home/mission'
import Motivation from './motivation'
import Founder from './founder'
import Team from './team'

function AboutUs() {
    document.title = "About | Stellar Dairies"
    return (
        <div>
            <PageHead title="About Us" />
            <div className='container mx-auto'>
                <Founder />
                {/* <Mission /> */}
            </div>

            <Motivation />

            <Team />
        </div>
    )
}

export default AboutUs
