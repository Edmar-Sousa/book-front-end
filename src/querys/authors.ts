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

export const AUTHOR_UPDATE = gql`
    mutation Author($id: Int!, $name: String!, $bio: String!) {
        updateAuthor(id: $id, name: $name, bio: $bio) {
            id
            name
            bio
        }
    }
`

export const AUTHOR_DELETE = gql`
    mutation Author($id: Int!) {
        deleteAuthor(id: $id) {
            id
            name
        }
    }
`
