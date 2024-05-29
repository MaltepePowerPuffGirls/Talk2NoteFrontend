import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MDBlock = ({ markdownText }) => {
  return (
    markdownText &&
    <div className="w-full border-2 border-[#A899D9] rounded relative px-12 py-8 mt-8 flex items-center justify-center">
      <Markdown className="prose prose-invert !w-full" remarkPlugins={[remarkGfm]}>{markdownText}</Markdown>
    </div>
  )
}

export default MDBlock
