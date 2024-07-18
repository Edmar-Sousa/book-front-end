import gql from 'graphql-tag'



export const CATEGORYS_QUERY = gql`
    query CategoryQuery {
        listCategory {
            id
            title
        }
    }
`

