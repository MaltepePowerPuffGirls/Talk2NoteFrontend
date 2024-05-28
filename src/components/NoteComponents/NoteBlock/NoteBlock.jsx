import React from 'react'

const NoteBlock = ({text}) => {
  return (
    <div className="w-full border-2 border-[#A899D9] rounded justify-start relative px-12 py-5 mt-8">
    <p className="mt-5">
      {text}
    </p>
  </div>
  )
}

export default NoteBlock
