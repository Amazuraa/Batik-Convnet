import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

// -- Upload to Server
const handleChange = (file:File) => {
  let data:FormData = new FormData()
  data.append("fileInput", file)

  let header = {
    headers: {  
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }

  axios
    .post("http://127.0.0.1:3030/batik/identify", data, header)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
};

// -- Loading props
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
//#region -- Loading setup

  const [loaderStyle, setLoader] = useState(loaderSettings.default.loader)
  const [pageStyle, setPage] = useState(loaderSettings.default.page)

  const loading: ReturnType<typeof setTimeout> = setTimeout(() => {
      setLoader(loaderSettings.display.loader)
      setPage(loaderSettings.display.page)
  }, 500)

  useEffect(() => {
      clearTimeout(loading);
  },[]);

//#endregion

//#region -- Upload Setup

  const [image, setImage] = useState<File>()
  const [ObjectURL, setObjectURL] = useState("")
  const [inputSetup, setInputSetup] = useState({
    plusBtn: '',
    timesBtn: 'hidden'
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const removeUpload = () => {
    setImage(undefined)
    setObjectURL("")

    setInputSetup({
      plusBtn: '',
      timesBtn: 'hidden'
    })
  }

  const clickUpload = () => {
    if (inputRef.current)
      inputRef.current.click()
  }

  const showUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]

      setImage(e.target.files[0])
      setObjectURL(URL.createObjectURL(i))

      setInputSetup({
        plusBtn: 'hidden',
        timesBtn: ''
      })
    }
  }

  const fileUpload = () => {
    if (image)
      handleChange(image)
  }

//#endregion

  // -- Icons setup
  const plus = <FontAwesomeIcon icon={faSquarePlus} color="#3b82f6" />
  const times = <FontAwesomeIcon icon={faTimesCircle} color="orange" />

  const [mode, setMode] = useState({
    mainMode: '',
    formMode: 'hidden'
  })

  const startMode = () => {
    setMode({
      mainMode: 'hidden',
      formMode: ''
    })
  }

  const reverseMode = () => {
    setMode({
      mainMode: '',
      formMode: 'hidden'
    })
  }

  return (
    <section className="header relative pt-52 pb-20 items-center flex">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className={'w-full h-80 justify-items-center ' + loaderStyle}>
            <div className="w-16 h-16 rounded-full animate-spin self-center
                            border-8 border-dashed border-cyan-500 border-t-transparent">
            </div>
        </div>

        <div className={"w-full md:w-8/12 lg:w-6/12 xl:w-6/12 pl-20 pb-10 " + pageStyle}>
          <div className="pt-32 sm:pt-0">
            <h1 className="font-press-start font-semibold text-5xl text-blueGray-600">
              Batik Convnet Identifier
            </h1>
            <p className={"mt-7 text-xl leading-relaxed text-blueGray-500 font-alegreya " + mode.formMode}>
              Upload your desire images of Batik motif below to identify each one of them. 
              We recommend to upload high resolution images for better result
            </p>
            <p className={"mt-7 text-xl leading-relaxed text-blueGray-500 font-alegreya " + mode.mainMode}>
              Simple implementation of Batik motifs identifier using Convnet on top of
              Tensorflow as a base building blocks for Machine Learning model.
            </p>
            <p className={"mt-4 text-xl leading-relaxed text-blueGray-500 font-alegreya " + mode.mainMode}>
              This project is focusing on comparing how effective are the two 
              Edge Detection methods such as Canny and Sobel Operator to identify each 
              Batik motifs on Convnet.
            </p>

            <button
              onClick={startMode}
              className={'min-w-auto w-40 mt-12 bg-blue-500 p-3 px-4 rounded hover:bg-blue-500 transition-colors duration-30 hover:animate-pulse ease-out text-white font-semibold cursor-pointer ' + mode.mainMode}
            >
              Let's Identify
            </button>

            <div className={"p-4 mt-7 border-dashed border-2 border-[#c7d4df54] w-full h-52 bg-whtie m-auto rounded-lg grid grid-cols-3 gap-x-5 " + mode.formMode}>
              
              <div className="col-span-1 bg-[#f0f8ff] border-2 border-dashed border-[#c7d4df] rounded-xl h-full w-40">
                <div className="h-full w-full relative ">
                  <img src={ObjectURL} className={"absolute object-cover h-full w-full rounded-xl opacity-75 hover:opacity-100 cursor-pointer " + inputSetup.timesBtn} />
                  <button className={'bg-white rounded-full p-1 w-8 h-8 z-1 absolute right-[-8px] top-[-8px] hover:scale-125 duration-150 ' + inputSetup.timesBtn}
                          onClick={removeUpload}>
                    {times}
                  </button>
                  <div className='flex justify-center h-full flex-col'> 
                    <button className={'rounded bg-transparent w-16 h-16 z-10 flex items-center self-center hover:scale-110 duration-200 ' + inputSetup.plusBtn}
                            onClick={clickUpload}>
                      {plus}
                    </button>
                  </div>
                </div> 
              </div>

              <div className="col-span-1 bg-[#f0f8ff] border-2 border-dashed border-[#c7d4df] rounded-xl h-full w-40">
              </div>
              <div className="col-span-1 bg-[#f0f8ff] border-2 border-dashed border-[#c7d4df] rounded-xl h-full w-40">
              </div>
            </div>

            <div className={"mt-7 " + mode.formMode}>
              <input type="file" accept="image/png, image/gif, image/jpeg" className='hidden'
                     onChange={showUpload} 
                     ref={inputRef} />
              <button
                onClick={fileUpload}
                className="min-w-auto w-40
                            bg-blue-500 p-3 px-4 rounded 
                            hover:bg-blue-500 
                            transition-colors duration-30 
                            hover:animate-pulse ease-out 
                            text-white font-semibold cursor-pointer"
              >
                Identify Motifs
              </button>
              <button
                onClick={reverseMode}
                className="min-w-auto w-20 ml-2
                            bg-slate-500 p-3 px-4 rounded 
                            hover:bg-slate-500 
                            transition-colors duration-30 
                            hover:animate-pulse ease-out 
                            text-white font-semibold cursor-pointer"
              >
                Cancel
              </button>
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
