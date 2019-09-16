import React from 'react'

export const SequenceArrows = ({ sequence, index, setCurrentView }) => {
  const increment = () => {
    setCurrentView(index + 1)
  }

  const decrement = () => {
    setCurrentView(index - 1)
  }
  return <>
    <svg className='absolute' style={{ left: '-99999px' }}>
      <filter id='dropshadow' width='140%' x='-20%' height='130%'>
        <feGaussianBlur in='SourceAlpha' stdDeviation='3' />{/*  <!-- stdDeviation is how much to blur --> */}
        <feOffset dx='2' dy='2' result='offsetblur' />
        <feComponentTransfer>
          <feFuncA type='linear' slope='0.3' />{/*  <!-- slope is the opacity of the shadow --> */}
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />{/*  <!-- this contains the offset blurred image --> */}
          <feMergeNode in='SourceGraphic' />{/*  <!-- this contains the element that the filter is applied to --> */}
        </feMerge>
      </filter>
    </svg>
    {index > 0 && <div
      tabIndex='1'
      style={{ width: '40px', height: '80px', transform: 'translateY(-50%)' }}
      className='absolute ml-3 left-0 md:left-unset md:right-full cursor-pointer top-1/2'
      onClick={e => decrement()}
      onKeyPress={e => e.which === 13 && decrement()}
    >
      <svg
        viewBox='0 0 100 200'
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-current fill-transparent text-green-500'>
        <path d='M 85,185 L 15,100 L 85,15' style={{ filter: 'url(#dropshadow)' }} strokeWidth='15' strokeLinecap='round' />
      </svg>
    </div>}
    {index < sequence.length - 1 && <div
      tabIndex='1009'
      style={{ width: '40px', height: '80px', transform: 'translateY(-50%)' }}
      className='absolute mr-3 right-0 md:left-full cursor-pointer top-1/2'
      onClick={e => increment()}
      onKeyPress={e => e.which === 13 && increment()}
    >
      <svg
        viewBox='0 0 100 200'
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-current fill-transparent text-green-500'>
        <path d='M 15,185 L 85,100 L 15,15' style={{ filter: 'url(#dropshadow)' }} strokeWidth='15' strokeLinecap='round' />
      </svg>
    </div>}
  </>
}
