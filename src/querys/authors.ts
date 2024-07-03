import gql from 'graphql-tag'


export const AUTHORS_QUERY = gql`
    query AuthorQuery {
        listAuthors {
            id
            name
            bio
        }
    }
`
