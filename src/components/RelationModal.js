import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { NEW_RELATION } from '../queries'

export const RelationModal = ({ setOpen }) => {
  const [newRelation, { data, loading, error }] = useMutation(NEW_RELATION)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (data || error) {
    setOpen(false)
  }

  return <div
    className='fixed text-gray-200 inset-auto w-full min-h-screen flex justify-center items-center z-50'
    style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}
    onClick={e => {
      e.preventDefault()
      setOpen(false)
    }}
  >
    <div className='w-5/6 md:w-1/2 h-90 flex flex-col bg-blue-gradient text-center rounded-lg shadow-lg' onClick={e => e.stopPropagation()}>
      <h2 className='text-2xl'>7 degrees of Olivia Rae...</h2>
      <p className='text-lg'>What's your connection?</p>
      {loading
        ? <h3 className='text-2xl my-auto'>Double checking with Olivia...</h3>
        : <div className='flex flex-col flex-1 justify-around items-center px-2'>
          <label htmlFor='relationName' className='flex self-stretch items-center'>
            Relationship:&nbsp;
            <input
              id='relationName'
              className='guess-input w-auto placeholder-gray-600 flex-1'
              placeholder='e.g. Wealthy Benefactor'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label htmlFor='relationDescription' className='flex self-stretch items-center'>
            Description:&nbsp;
            <input
              id='relationDescription'
              className='guess-input w-auto placeholder-gray-600 flex-1'
              placeholder={`Embellish and enlighten us`}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <button
            type='button'
            className='p-4 bg-green-500 shadow-lg rounded'
            onClick={e => {
              e.stopPropagation()
              
              if (name && description && confirm('This is irrevocable. Proceed?')){
                newRelation({ variables: { name, description } })
              }
            }}
          >
            Good To Go!
          </button>
        </div>}
    </div>
  </div>
}
