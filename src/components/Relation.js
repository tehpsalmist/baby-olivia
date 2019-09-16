import React, { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { RELATION_SUBSCRIPTION } from '../queries'
import { RelationModal } from '.'


export const Relation = ({ relation, setRelation, setOpen }) => {
  const { data, loading, error } = useSubscription(RELATION_SUBSCRIPTION)

  if (loading) {
    return <h2 className='text-xl'>Climbing Olivia's Family Tree...</h2>
  }

  if (error) {
    console.log(error)

    return 'Uh oh! Something went wrong! Try refreshing the page.'
  }

  return <div>
    <h3 className='text-center text-xl mb-2'>Your relation to Olivia:</h3>
    <div className='text-xl h-80 overflow-y-auto'>
      {data.relations.map(rel => {
        const { id, name, description } = rel

        return <div key={id} className='flex flex-col items-center my-3'>
          <label htmlFor={name + id} className='font-bold'>
            <input
              type='radio'
              id={name + id}
              className='mr-2'
              value={rel}
              checked={id === relation.id}
              onChange={e => setRelation(rel)}
            />
            {name}
          </label>
          <p className='text-center font-serif domestic-manners mb-3'>{description}</p>
          <hr className='w-full' />
        </div>
      })}
      <p>Don't see your relationship? Tell us how you connect in your own special way:</p>
      <button type='button' className='p-4 bg-green-500 shadow-md rounded mb-2' onClick={e => setOpen(true)}>
        Create Relationship
      </button>
    </div>
  </div>
}
