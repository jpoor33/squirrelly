import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
// import SignIn from './pages/SignIn';
// import Dashboard from './pages/Dashboard';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
      <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      {/* <Dashboard /> */}
      {/* <SignIn /> */}
      <div className="p-4">    
      </div>
    </ApolloProvider>
  );
};

export default App;


/* <Routes> */
/* <Route path="/" element={<Home />} />
<Route path="/signin" element={<SignIn />} />
<Route path="/dashboard" element={<Dashboard />} /> */
// </Routes>