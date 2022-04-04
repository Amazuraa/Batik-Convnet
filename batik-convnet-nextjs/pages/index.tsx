import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'

const handleChange = () => {
  axios
    .get("http://127.0.0.1:3030/batik/list", {headers: 
          {  
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'}
          })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
};

// -- spinner props
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

const Home: NextPage = () => {
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
    <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className={'w-full h-80 justify-items-center ' + loaderStyle}>
            <div className="w-16 h-16 rounded-full animate-spin self-center
                            border-8 border-dashed border-cyan-500 border-t-transparent">
            </div>
        </div>

        <div className={"w-full md:w-8/12 lg:w-6/12 xl:w-6/12 pl-20 " + pageStyle}>
          <div className="pt-32 sm:pt-0">
            <h1 className="font-press-start font-semibold text-5xl text-blueGray-600">
              Batik Convnet Identifier
            </h1>
            <p className="mt-7 text-xl leading-relaxed text-blueGray-500 font-alegreya">
              Simple implementation of Batik motifs identifier using Convnet on top of
              Tensorflow as a base building blocks for Machine Learning model.
            </p>
            <p className="mt-4 text-xl leading-relaxed text-blueGray-500 font-alegreya">
              This project is focusing on comparing how effective are the two 
              Edge Detection methods such as Canny and Sobel Operator to identify each 
              Batik motifs on Convnet.
            </p>

            <div className="mt-12">
              <a
                onClick={handleChange}
                className="min-w-auto w-40
                            bg-blue-500 p-3 px-4 rounded 
                            hover:bg-blue-500 
                            transition-colors duration-30 
                            hover:animate-pulse ease-out 
                            text-white font-semibold cursor-pointer"
              >
                Let's Identify
              </a>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-0 b-auto right-0 pt-16 z-0 sm:w-5/12 -mt-48 sm:mt-0 w-4/12 max-h-500-px"
        src="/img/pattern_nextjs.png"
        alt="..."
      />
    </section>
  )
}

export default Home
