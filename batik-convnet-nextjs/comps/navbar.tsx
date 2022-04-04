import Image from 'next/image'
import Link from 'next/link'
import type { NextPage } from 'next'


const Navbar:NextPage = () => {
    return (
        <div className="flex flex-col">
          <nav className="flex justify-around py-4 bg-white/50 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">

            <div className="flex items-center">
                <Link href="/">
                <a className="cursor-pointer">
                    <h3 className="text-2xl font-medium text-blue-500">
                        <img
                            className="h-10 object-cover"
                            alt="img"
                            src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
                        />
                    </h3>
                </a>
                </Link>
            </div>

            <div className="items-center hidden w-80 lg:flex"></div>

            <div className="flex items-center space-x-6 font-alegreya text-lg">
                <Link href="/motifs">
                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Batik Motifs
                </a>
                </Link>
                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Algorithm
                </a>
                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    About
                </a>
            </div>
          </nav>
        </div>
    );
}

export default Navbar