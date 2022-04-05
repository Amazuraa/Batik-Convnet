import { constants } from 'buffer'
import { useEffect, useState } from 'react'

// -- a technique to change className props
let loaderSettings = {
    default: {
        loader: 'grid',
        page: 'hidden',
    },
    display: {
        loader: 'hidden',
        page: '',
    }
}

const Motifs = () => {
    const [loaderStyle, setLoader] = useState(loaderSettings.default.loader)
    const [pageStyle, setPage] = useState(loaderSettings.default.page)

    const loading: ReturnType<typeof setTimeout> = setTimeout(() => {
        setLoader(loaderSettings.display.loader)
        setPage(loaderSettings.display.page)

    }, 500)

    useEffect(() => {
        clearTimeout(loading);
    },[]);

    return (
        <section className="header relative pt-52 pb-20 items-center flex font-press-start">
            <div className="container mx-auto items-center flex flex-wrap">
                <div className={'w-full h-80 justify-items-center ' + loaderStyle}>
                    <div className="w-16 h-16 rounded-full animate-spin self-center
                                    border-8 border-dashed border-cyan-500 border-t-transparent">
                    </div>
                </div>

                <div className={'w-full px-20 ' + pageStyle}>
                    <div className="grid grid-cols-5 gap-x-5 gap-y-6 w-full">
                        <div className="col-span-3 h-52 md:h-80 w-11/12">
                            <h1 className="font-press-start font-semibold text-5xl text-blueGray-600">
                                Batik Motifs as learning model
                            </h1>
                            <p className="mt-7 text-xl leading-relaxed text-blueGray-500 font-alegreya">
                                Simple implementation of Batik motifs identifier using Convnet on top of
                                Tensorflow as a base building blocks for Machine Learning model.
                            </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>
                        <div className="col-span-1 bg-rose-700 rounded-xl h-52 md:h-80">
                            <img src="https://a0.muscache.com/im/pictures/a433b4d0-8183-4523-b4c5-99b81c5729c1.jpg?im_w=320" 
                                className="rounded-t-xl h-60 w-full object-cover" />

                            <p className=" text-sm md:text-2xl text-center text-gray-50 py-5 px-3"> Bandung </p>
                        </div>

                    </div>
                </div>
            
            </div>
        </section>
    );
}

export default Motifs