import React from 'react'

const navbar = () => {
  return (
    <>
      <nav className="flex justify-between bg-slate-900 text-white p-3">
        <div className="logo">
            <h1 className="font-bold text-xl mx-9">Taskify</h1>
        </div>
        <div className="list">
            <ul className="flex gap-6">
                <li className="cursor-pointer hover:font-bold transition-opacity">Home</li>
                <li className="cursor-pointer hover:font-bold transition-opacity mx-3">Your Task</li>
            </ul>
        </div>
      </nav>
    </>
  )
}

export default navbar
