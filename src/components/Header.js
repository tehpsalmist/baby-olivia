import React from 'react'
import beachbaby from '../assets/beachbaby-square.jpg'

export const Header = props => {
  return <header className='flex flex-col items-center text-center py-4'>
    <h1 className='text-3xl mb-4'>
      <span className='domestic-manners'>Olivia Rae</span> is almost here!
    </h1>
    <h4>
      How big will she be? When will she arrive? Who is her favorite power ranger? So many questions!
    </h4>
    <img className='rounded-full w-5/6 max-w-90 shadow-lg mt-4' src={beachbaby} alt='Baby Olivia spots her first whale' />
  </header>
}
