import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
      <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      <Footer />
    </ApolloProvider>
  );
};

export default App;