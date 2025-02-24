import Footer from '@/component/Footer/Footer';
import Navbar from '@/component/Navbar/Navbar';
import React from 'react';

const Layout = ({children}) => {
    return (
        <div>
            <div style={{position: 'sticky', top: 0, zIndex: 1000}}>
            <Navbar/>
            </div>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}

export default Layout;