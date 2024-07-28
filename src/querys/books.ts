import gql from 'graphql-tag'



export const BOOKS_QUERY = gql`
    query BookQuery {
        listBooks {
            id
            title
            description
            year
            author_id
            category_id
        }
    }
`


export const BOOKS_STORE = gql`
    mutation Book($title: String!, $description: String!, $year: String!, $categorys: Int!, $authors: Int!) {
        addBook(title: $title, description: $description, year: $year, author_id: $authors, category_id: $categorys) {
            id
            title
            description
            year
        }
    }
`

export const BOOKS_UPDATE = gql`
    mutation Book($id: Int!, $title: String!, $description: String!, $year: String!, $categorys: Int!, $authors: Int!) {
        updateBook(id: $id, title: $title, description: $description, year: $year, author_id: $authors, category_id: $categorys) {
            id
            title 
            description
            year
            author_id
            category_id
        }
    }
`

export const BOOKS_DELETE = gql`
    mutation Book($id: Int!) {
        deleteBook(id: $id) {
            id
        }
    }
`

