import gql from 'graphql-tag'



export const CATEGORYS_QUERY = gql`
    query CategoryQuery {
        listCategory {
            id
            title
        }
    }
`

export const CATEGORYS_OPTINS = gql`
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


export const CATEGORYS_UPDATE = gql`
    mutation Category($id: Int!, $title: String!) {
        updateCategory(id: $id, title: $title) {
            id
            title
        }
    }
`

export const CATEGORYS_DELETE = gql`
    mutation Category($id: Int!) {
        deleteCategory(id: $id) {
            id
            title
        }
    }
`
