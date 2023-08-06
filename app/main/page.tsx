import Input_ from '@/components/Input_'
import React from 'react'

function Input() {
  return (
    <div className='p-2 rounded-full flex justify-between bg-[#19191d] mx-4 my-2 text-gray-500' >
      <input type="text" className='bg-transparent w-full rounded-full placeholder focus:outline-none px-2' placeholder='Send a message...' />
      <button className='bg-white w-10 h-10 rounded-full mx-1'></button>
      <button className="bg-white w-10 h-10 rounded-full mx-1"></button>
    </div>
  )
}

function Page() {
  return (
    <div className="bg-[#1c1b22] w-full h-full flex-col justify-around">
      <div className='h-max'></div>
      <Input />
    </div>
  )
}

export default Page
