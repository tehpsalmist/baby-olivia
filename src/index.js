import React, { useState } from 'react'
import { render } from 'react-dom'
import { Header, GuessForm, LiveGuesses, AlreadyGuessed, RelationModal, Footer } from './components'
import { ApolloClient, split, InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    new WebSocketLink({
      uri: `wss://baby-olivia.herokuapp.com/v1/graphql`,
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: {
          headers: {
            'x-hasura-role': 'anonymous'
          }
        }
      }
    }),
    new HttpLink({
      uri: 'https://baby-olivia.herokuapp.com/v1/graphql',
      headers: {
        'x-hasura-role': 'anonymous'
      }
    })
  ),
  cache: new InMemoryCache()
})

export const App = props => {
  const [guessMade, setGuessMade] = useState(localStorage.getItem('guessMade'))
  const [mightNotHaveGuessed, setMightNotHaveGuessed] = useState(true)
  const [open, setOpen] = useState(false)

  return <ApolloProvider client={client}>
    {open && <RelationModal setOpen={setOpen} />}
    <div className='bg-blue-gradient p-2 md:p-8 text-gray-200 min-h-screen h-auto'>
      <Header />
      <main>
        {guessMade
          ? <AlreadyGuessed setGuessMade={setGuessMade} mightNotHaveGuessed={mightNotHaveGuessed} />
          : <GuessForm {...{ setOpen, setGuessMade, setMightNotHaveGuessed }} />}
        <hr className='w-11/12 mx-auto my-6' />
        <LiveGuesses />
      </main>
      <Footer />
    </div>
  </ApolloProvider>
}

render(<App />, document.getElementById('app'))
