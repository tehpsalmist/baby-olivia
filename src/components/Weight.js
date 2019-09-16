import React from 'react'

export const Weight = ({ setPounds, setOunces, pounds, ounces }) => {
  return <div className={`flex flex-col items-center text-xl`}>
    <span>Baby's weight:</span>
    <label htmlFor='pounds'>
      <input
        tabIndex='2'
        className='guess-input'
        id='pounds'
        type='number'
        step='1'
        min={4}
        max={20}
        pattern='[0-9]*'
        value={pounds}
        onChange={e => {
          const val = e.target.value

          if (val === '') return setPounds('')

          if (val.match(/\d+/) && Number(val) <= 20) {
            return setPounds(Number(e.target.value))
          }
        }}
      />
      &nbsp;pounds
    </label>
    <label>
      <input
        tabIndex='3'
        className='guess-input'
        id='ounces'
        type='number'
        step='1'
        min={0}
        max={15}
        pattern='[0-9]*'
        value={ounces}
        onChange={e => {
          const val = e.target.value

          if (val === '') return setOunces('')

          if (val.match(/\d+/) && Number(val) <= 15) {
            return setOunces(Number(e.target.value))
          }
        }}
      />
      &nbsp;ounces
    </label>
  </div>
}
