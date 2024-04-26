// Import the necessary modules

import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, Routes } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// Create a new Apollo client and pass it to the ApolloProvider
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Create the App component that will render the pages
function App() {
  return (
    <ApolloProvider client={client}>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<SearchBooks />} />
            <Route exact path="/saved" element={<SavedBooks />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
    </ApolloProvider>
  );
}

export default App;