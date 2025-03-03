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

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';


const App: React.FC = () => {
  return (
      <ApolloProvider client={client}>
      <Navbar />

      <Outlet />
      {/* <Dashboard /> */}
      {/* <SignIn /> */}
      <div className="p-4">    

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        </Routes>

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