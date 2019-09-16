import React from 'react'

export const PredictionStatement = ({ arrivalDay, arrivalTime, pounds, ounces, height, name, relation, email }) => {
  const statements = [
    'Baby Olivia will be born',
    arrivalDay instanceof Date && `on ${arrivalDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}${!arrivalTime && (pounds || ounces || height) ? ',' : ''}`,
    arrivalTime && `at ${arrivalTime.format('h:mm A')}${pounds || ounces || height ? ',' : ''}`,
    (pounds || ounces) && 'weighing',
    pounds && `${pounds} pounds`,
    ounces && `${ounces} ounces`,
    height && `${pounds || ounces ? 'and ' : ''}measuring ${height} inches long`
  ].filter(Boolean)

  const prediction = statements.length > 1 ? statements.join(' ').concat('.') : 'Go ahead. Make a prediction!'

  return <>
    <h3 className='text-2xl mt-8'>
      {!name && !relation
        ? 'Your Prediction:'
        : !name
          ? `Olivia's ${relation.name} thinks...`
          : !relation
            ? `${name} thinks...`
            : `${relation.name} ${name} thinks...`}
    </h3>
    <p className='font-serif domestic-manners text-xl my-4'>
      {prediction}
    </p>
    {email && <p>Results will be sent to {email}.</p>}
  </>
}
