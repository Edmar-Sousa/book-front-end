import gql from 'graphql-tag'



export const CATEGORYS_QUERY = gql`
    query CategoryQuery {
        listCategory {
            id
            title
        }
    }
`


export const CATEGORYS_STORE = gql`
    mutation Category($title: String!) {
        addCategory(title: $title) {
            id
            title
        }
    }
`

