import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('⚠ Please fill out all fields.');
      return;
    }
    setError('');

    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const userProfile = JSON.parse(storedProfile);
      if (userProfile.email === email && userProfile.password === password) {
        // On successful login, store a dummy token.
        localStorage.setItem('loginToken', 'dummy-token');
        navigate('/user');
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('No user registered. Please sign up first.');
    }
  };

  return (
    <div className="flex justify-center pt-4 mt-25">
    <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative z-50">
      <h2 className="text-3xl text-center text-gray-900 mb-6">Welcome back!</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="flex flex-col gap-3">
          <input 
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 block w-full"
          />
        </div>
        <div className="flex flex-col gap-3">
          <input   
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 block w-full"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <button 
          type="submit" 
          className="block mx-auto w-1/2 px-4 py-2 rounded"
        >
          Sign In
        </button>
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default SignIn;
