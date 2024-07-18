import gql from 'graphql-tag'



export const BOOKS_QUERY = gql`
    query BookQuery {
        listBooks {
            id
            title
            description
            year
        }
    }
`

