import React from 'react'
import ultrasound from '../assets/ultrasound-square.jpg'

export const AlreadyGuessed = ({ setGuessMade, mightNotHaveGuessed }) => {
  return <section className='flex flex-col items-center'>
    <h2 className='text-2xl md:text-4xl mb-8 text-center'>Thanks for participating! ❤️</h2>
    <img className='rounded-full w-5/6 max-w-90 shadow-lg mb-4' src={ultrasound} alt='beebee sans atmosphere' />
    {mightNotHaveGuessed && <div className='flex flex-col items-center'>
      <p>Didn't actually guess yet?</p>
      <button className='rounded p-2 bg-green-500 shadow-md' onClick={e => setGuessMade(false)}>
        Make Your Prediction
      </button>
    </div>}
  </section>
}
