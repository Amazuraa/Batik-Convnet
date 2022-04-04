import type { NextPage } from 'next'

import React from 'react'
import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

const Layout:NextPage = ({ children }) => {
    return (
        <div>
            <Header></Header>

                <Navbar></Navbar>
            <main className="w-full antialiased bg-white">
                { children }
            </main>

            <Footer></Footer>
        </div>
    );
}

export default Layout