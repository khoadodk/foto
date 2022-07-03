import React from 'react'
import {Circles} from 'react-loader-spinner'

function Spinner({msg}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        color="#00BFFF"
        height={50}
        width={50}
      />  
      <p className="text-lg text-center p-2">{msg}</p>
    </div>
  )
}

export default Spinner