import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GUESS_QUERY } from '../queries'
import moment from 'moment'
import { getFormattedDateAndTime } from '../utilities'

const actualWeight = 130
const actualHeight = 18.75

export const LiveGuesses = props => {
  const { data, loading, error } = useQuery(GUESS_QUERY)

  if (error) return <section>Uh oh! Something went wrong. Try reloading the page.</section>

  if (loading) return <section><h3 className='text-2xl text-center'>Doing the Math...</h3></section>

  return <section className='w-full max-w-xl mx-auto'>
    <div id='closest-time'>
      <h2 className='text-3xl text-center mb-4'>Closest Time</h2>
      <ul>
        {data.guess.map((guess, i) => {
          const [day, time] = getFormattedDateAndTime(guess.arrival)

          return <li key={guess.id} className='flex justify-between py-2'>
            <div>
              <h4 className='text-xl'><span className='inline-block leading-none text-center bg-green-500 rounded-full w-auto px-1 mr-2'>{i + 1}</span>{guess.user.name}</h4>
              <h5 className='text-base'>{guess.relation.name}</h5>
            </div>
            <div className='flex flex-col justify-center items-end'>
              <p>{day}</p>
              <p>{time}</p>
            </div>
          </li>
        })}
      </ul>
    </div>
    <div id='closest-weight'>
      <h2 className='text-3xl text-center mb-4'>Closest Weight</h2>
      <ul>
        {data.guess
          .sort((a, b) => {
            const weightA = (a.pounds * 16) + a.ounces
            const offsetA = Math.abs(weightA - actualWeight)
            const weightB = (b.pounds * 16) + b.ounces
            const offsetB = Math.abs(weightB - actualWeight)

            return offsetA === offsetB ? weightA - weightB : offsetA - offsetB
          })
          .map((guess, i) => {
            return <li key={guess.id} className='flex justify-between py-2'>
              <div>
                <h4 className='text-xl'><span className='inline-block leading-none text-center bg-green-500 rounded-full w-auto px-1 mr-2'>{i + 1}</span>{guess.user.name}</h4>
                <h5 className='text-base'>{guess.relation.name}</h5>
              </div>
              <div className='flex flex-col justify-center items-end'>
                <p>{guess.pounds}lbs. {guess.ounces}oz.</p>
              </div>
            </li>
          })}
      </ul>
    </div>
    <div id='closest-height'>
      <h2 className='text-3xl text-center mb-4'>Closest Height</h2>
      <ul>
        {data.guess
          .sort((a, b) => {
            const offsetA = Math.abs(a.height - actualHeight)
            const offsetB = Math.abs(b.height - actualHeight)

            return offsetA === offsetB ? a.height - b.height : offsetA - offsetB
          })
          .map((guess, i) => {
            return <li key={guess.id} className='flex justify-between py-2'>
              <div>
                <h4 className='text-xl'><span className='inline-block leading-none text-center bg-green-500 rounded-full w-auto px-1 mr-2'>{i + 1}</span>{guess.user.name}</h4>
                <h5 className='text-base'>{guess.relation.name}</h5>
              </div>
              <div className='flex flex-col justify-center items-end'>
                <p>{guess.height}in.</p>
              </div>
            </li>
          })}
      </ul>
    </div>
    <div id='all-predictions'>
      <h2 className='text-3xl text-center mb-4'>All Predictions</h2>
      <ul>
        {data.guess.map(guess => {
          const [day, time] = getFormattedDateAndTime(guess.arrival)

          return <li key={guess.id} className='py-2'>
            <div className='flex justify-between'>
              <h4 className='text-xl'>{guess.user.name}</h4>
              <h5 className='text-base'>{guess.relation.name}</h5>
            </div>
            <p className='flex justify-between'>
              <span className='mr-2'>{guess.pounds} lbs. {guess.ounces} oz.</span>
              <span className='mr-2'>{guess.height} in.</span>
              <span className='mr-2'>{day}</span>
              <span>{time}</span>
            </p>
          </li>
        })}
      </ul>
    </div>
  </section>
}
