import React from 'react'

export const Email = ({ email, setEmail }) => {
  return <label className='flex flex-col items-center text-xl' htmlFor='email'>
    <p className='max-w-xs md:max-w-sm text-center'>
      All predictions will be aggregated and ranked to see who won!
      <br />
      <br />
      Where should we send the final results when baby comes?
    </p>
    <input id='email' className='guess-input w-5/6 placeholder-gray-600' placeholder='optional@not-required.com' value={email} onChange={e => setEmail(e.target.value)} />
  </label>
}
