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

export const AUTHORS_OPTINS = gql`
    query AuthorQuery {
        listAuthors {
            id
            name
        }
    }
`

export const AUTHORS_STORE = gql`
    mutation Author($name: String!, $bio: String!) {
        addAuthor(name: $name, bio: $bio) {
            name
            bio
        }
    }
`
