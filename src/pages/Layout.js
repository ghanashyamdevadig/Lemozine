import Footer from '@/component/Footer/Footer';
import Header from '@/component/Navbar/Header';
import React from 'react';

const Layout = ({children}) => {
    return (
        <div>
            <div style={{position: 'sticky', top: 0, zIndex: 1000}}>
            <Header />
            </div>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}

export default Layout;