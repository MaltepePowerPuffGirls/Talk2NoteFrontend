import React from 'react'
import { FaMicrophone, FaSquare } from 'react-icons/fa'

const RecordBlock = ({isListening, value, setValue, startStopListening, sendBlock, changeStatus}) => {
  
  return (
    <div className="relative">
    <h2 className="text-[#909090] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold text-3xl">
      {isListening && value.length < 1
        ? "Go ahead, we're listening"
        : !isListening
        ? "Start Speaking"
        : ""}
    </h2>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full h-64 border-2 border-[#A899D9] px-12 py-8 rounded flex items-center relative justify-center bg-transparent focus:outline-none resize-none custom-scrollbar overflow-auto"
      disabled
    />
    <div
      className="mic-icon cursor-pointer absolute -bottom-[32px] left-1/2 -translate-x-1/2 rounded-full w-16 h-16 flex items-center justify-center"
      style={{
        background: isListening
          ? "linear-gradient(to top right, #ED213A 7%, #93291E 94%)"
          : "linear-gradient(to top right, #F4C4F3 7%, #FC67FA 94%)",
      }}
    >
      {isListening ? (
        <FaSquare
          onClick={()=>{
            sendBlock()
            startStopListening()
          }}
          className="text-white w-[2em] h-[2em]"
        />
      ) : (
        <FaMicrophone
          onClick={()=>{
            startStopListening()
            changeStatus("RECORDING"); // Bu satırı güncelleyelim
          }}
          className="text-[#9900B1] w-[2.5em] h-[2.5em]"
        />
      )}
    </div>
    <div className="absolute bottom-3 right-3 text-[#A899D9]">{value.length}/1000</div>
  </div>
  )
}

export default RecordBlock
