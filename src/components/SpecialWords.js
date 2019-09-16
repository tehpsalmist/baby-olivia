import React from 'react'

export const SpecialWords = ({ specialWords, setSpecialWords }) => {
  return <label className='flex flex-col items-center text-xl' htmlFor='special-words'>
    Are there any special words you have for Olivia or her mom and dad?
    <textarea id='special-words' className='guess-input w-5/6' rows={3} value={specialWords} onChange={e => setSpecialWords(e.target.value)}></textarea>
  </label>
}
