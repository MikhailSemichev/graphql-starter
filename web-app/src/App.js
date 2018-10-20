import './App.css';
import React, { Component } from 'react';
import gql from 'graphql-tag';

import apolloClient from './graphql/apolloClient';
import queries from './graphql/queries';
import mutations from './graphql/mutations';

class App extends Component {
    state = {
        response: ''
    };

    hello = async () => {
        const response = await apolloClient.query({
            query: gql`
                query Hello {
                    hello
                }
            `,
            variables: {},
        });
        
        this.setState({ response });
    }

    getBook = async () => {
        const response = await apolloClient.query({
            query: queries.getBook,
            variables: {
                id: '1'
            },
        });

        this.setState({ response });
    };

    getBooks = async () => {
        const filter = {
            title: '',
            authorId: '1'
        };

        const response = await apolloClient.query({
            query: queries.getBooks,
            variables: { filter },
        });

        this.setState({ response });
    };

    saveBook = async () => {
        const book = {
            title: 'My book 1',
            year: 2018,
            authorId: '1',
        };
        
        const response = await apolloClient.mutate({
            mutation: mutations.saveBook,
            variables: { book },
        });

        this.setState({ response });
    };


    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={this.hello}>Hello</button>
                    <button onClick={this.getBook}>Get Book</button>
                    <button onClick={this.getBooks}>Get Books []</button>
                    <button onClick={this.saveBook}>Save Book</button>
                    <textarea
                        readOnly
                        value={JSON.stringify(this.state.response, null, 4)}
                    />
                </div>
            </div>
        );
    }
}

export default App;
