import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MDBlock = ({ markdownText }) => {
  return (
    markdownText &&
    <div className="w-full border-2 border-[#A899D9] rounded justify-start relative px-12 py-5 mt-8">
      <Markdown className="prose prose-invert" remarkPlugins={[remarkGfm]}>{markdownText}</Markdown>
    </div>
  )
}

export default MDBlock
