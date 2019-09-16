import React, { useState, useCallback, useMemo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SUBMIT_GUESS } from '../queries'
import { twoDigit, calculateArrival } from '../utilities'
import { SequenceArrows } from './SequenceArrows'
import { PredictionStatement, Weight, Height, ArrivalEpoch, UserName, Relation, Email, SpecialWords } from '.'

export const GuessForm = ({ setGuessMade, setMightNotHaveGuessed, setOpen }) => {
  const [pounds, setPounds] = useState('')
  const [ounces, setOunces] = useState('')

  const [height, setHeight] = useState('')

  const [arrivalDay, setArrivalDay] = useState('')
  const [arrivalTime, setArrivalTime] = useState()
  const arrival = useMemo(() => calculateArrival(arrivalDay, arrivalTime), [arrivalDay, arrivalTime])

  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [email, setEmail] = useState('')

  const [specialWords, setSpecialWords] = useState('')

  const [currentView, setCurrentView] = useState(0)

  const [submitGuess, { loading, error, data }] = useMutation(SUBMIT_GUESS)

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  if (data) {
    localStorage.setItem('guessMade', true)

    setMightNotHaveGuessed(false)
    setGuessMade(true)
  }

  const sequence = [
    <Weight {...{ pounds, ounces, setPounds, setOunces }} />,
    <Height {...{ height, setHeight }} />,
    <ArrivalEpoch {...{ arrivalDay, arrivalTime, setArrivalDay, setArrivalTime }} /> ,
    <UserName {...{ name, setName }} />,
    <Relation {...{ relation, setRelation, setOpen }} />,
    <Email {...{ email, setEmail }} />,
    <SpecialWords {...{ specialWords, setSpecialWords }} />,
    <button className='rounded p-4 bg-green-400 shadow-md text-xl' type='button' onClick={e => {
      e.preventDefault()

      if (!pounds || !ounces) return setCurrentView(0)
      if (!height) return setCurrentView(1)
      if (!arrival) return setCurrentView(2)
      if (!name) return setCurrentView(3)
      if (!relation) return setCurrentView(4)

      submitGuess({
        variables: {
          height,
          pounds,
          ounces,
          arrival,
          specialWords: specialWords || null,
          name,
          email: email || null,
          relationId: relation.id,
        }
      })
    }}>
      ❤️ Send Prediction 🎈
    </button>
  ]

  return <section className='flex flex-col items-center text-center'>
    <PredictionStatement {...{ email, name, arrivalDay, arrivalTime, height, pounds, ounces, relation } } />
    <form
      className='flex flex-col justify-center items-center relative min-h-20 md:min-h-90 max-w-lg w-full px-12 md:px-0'
      style={{ boxSizing: 'border-box' }}
      onSubmit={e => e.preventDefault()}
    >
      {loading
        ? <h1 className='text-5xl'>Sending...</h1>
        : <>
          {sequence[currentView]}
          <SequenceArrows sequence={sequence} index={currentView} setCurrentView={setCurrentView} />
        </>}
    </form>
  </section>
}
