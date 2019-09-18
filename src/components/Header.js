import React from 'react'
import beachbaby from '../assets/beachbaby-square.jpg'

export const Header = props => {
  return <header className='flex flex-col items-center text-center py-4'>
    <h1 className='text-3xl mb-4'>
      <span className='domestic-manners'>Olivia Rae</span> is here!
    </h1>
    <h4>
      The Verdict:<br />8lbs. 2oz., 18.75in., with a birthday of 9/17 at 7:18PM!
    </h4>
    <img className='rounded-full w-5/6 max-w-90 shadow-lg mt-4' src={beachbaby} alt='Baby Olivia spots her first whale' />
    <a className='mt-6 p-4 text-xl bg-green-500 shadow-lg rounded' href='https://www.facebook.com/aljones3157/posts/10157798357397792' target='_blank'>See Pictures!</a>
  </header>
}
