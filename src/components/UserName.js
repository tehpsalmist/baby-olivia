import React from 'react'

export const UserName = ({ name, setName }) => {
  return <label className={`flex flex-col items-center text-xl`} htmlFor='name'>
    <span>Your Name:</span>
    <input tabIndex='2' className='guess-input w-5/6' id='name' value={name} onChange={e => setName(e.target.value)} />
  </label>
}
