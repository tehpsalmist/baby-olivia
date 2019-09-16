import React from 'react'

export const Height = ({ height, setHeight }) => {
  return <label className={`flex flex-col items-center text-xl`} htmlFor='height'>
    <span>Baby's height:</span>
    <span>
      <input
        tabIndex='2'
        className='guess-input'
        id='height'
        type='number'
        step='0.1'
        min={10}
        max={100}
        value={height}
        onChange={e => {
          const val = e.target.value

          if (val === '') return setHeight('')

          if (val.match(/[\d\.]+/) && Number(val) <= 100) {
            return setHeight(Number(e.target.value))
          }
        }}
      />
      &nbsp;inches
    </span>
  </label>
}
