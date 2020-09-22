import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default (App) => {
  class AppWithApollo extends React.Component {
    render() {
      const {apollo} = this.props;
      return (
        <ApolloProvider client={apollo}>
          <App {...this.props} />
        </ApolloProvider>
      );
    }
  };
  return withApollo(({ initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:3000/shop-api',
      cache: new InMemoryCache().restore(initialState || {})
    });
  })(AppWithApollo);
};