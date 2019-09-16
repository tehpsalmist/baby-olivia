import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { GUESS_SUBSCRIPTION } from '../queries'
import moment from 'moment'

export const LiveGuesses = props => {
  const { data, loading, error } = useSubscription(GUESS_SUBSCRIPTION)

  if (error) return <section>Uh oh! Something went wrong. Try reloading the page.</section>

  return <section className='w-full max-w-xl mx-auto'>
    <h2 className='text-3xl text-center mb-4'>Predictions</h2>
    {loading
      ? <p className='text-2xl'>Asking around...</p>
      : data.guess && data.guess.length
        ? <ul>
          {data.guess.map((guess, i) => {
            const date = moment(guess.arrival)
            const day = date.format('M/DD')
            const time = date.format('h:mm A')

            const bg = i % 2 === 0 ? 'bg-transparent' : 'bg-faded-blue'

            return <li key={guess.id} className={`py-2 ${bg}`}>
              <h4 className='text-xl'>{guess.relation.name} {guess.user.name}</h4>
              <p className='flex justify-between'>
                <span className='mr-2'>{guess.pounds} lbs. {guess.ounces} oz.</span>
                <span className='mr-2'>{guess.height} in.</span>
                <span className='mr-2'>{day}</span>
                <span>{time}</span>
              </p>
            </li>
          })}
        </ul>
        : <p className='text-xl text-center'>Be the first!</p>}
  </section>
}
