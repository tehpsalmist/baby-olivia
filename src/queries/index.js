import { gql } from 'apollo-boost'

export const SUBMIT_GUESS = gql`
  mutation submit_guess($arrival: timestamptz, $height: float8, $pounds: Int, $ounces: Int, $relationId: Int, $email: String, $name: String, $specialWords: String) {
    insert_guess(objects: {arrival: $arrival, height: $height, ounces: $ounces, pounds: $pounds, relation_id: $relationId, user: {data: {email: $email, name: $name, special_words: $specialWords}}}) {
      returning {
        arrival
        height
        id
        ounces
        pounds
        relation {
          description
          id
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`

export const GUESS_SUBSCRIPTION = gql`
  subscription liveGuesses  {
    guess (order_by: {timestamp: desc}) {
      id
      height
      arrival
      ounces
      pounds
      relation {
        description
        name
        id
      }
      user {
        name
        id
      }
    }
  }
`

export const GUESS_QUERY = gql`
  query allGuesses  {
    guess (order_by: {arrival: asc}) {
      id
      height
      arrival
      ounces
      pounds
      relation {
        description
        name
        id
      }
      user {
        name
        id
      }
    }
  }
`

export const RELATION_SUBSCRIPTION = gql`
  subscription liveRelations {
    relations(order_by: {id: asc}) {
      name
      id
      description
    }
  }
`

export const NEW_RELATION = gql`
  mutation newRelation($description: String, $name: String) {
    insert_relations(objects: {description: $description, name: $name}) {
      returning {
        description
        id
        name
      }
    }
  }
`
