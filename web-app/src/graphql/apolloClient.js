import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const accessToken = '_____ACCESS_TOKEN_____';

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
    });

    return forward(operation);
});

const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;
