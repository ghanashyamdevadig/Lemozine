import Footer from '@/component/Footer/Footer';
import Navbar from '@/component/Navbar/Navbar';
import React from 'react';

const Layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}

export default Layout;