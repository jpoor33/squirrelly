import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '@/utils/mutations';

const SignUp: React.FC = () => {
  const [addUser, { loading }] = useMutation(ADD_USER);

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !email || !password) {
      setError("⚠ Please fill out all fields.");
      return;
    }
  
    setError("");
  
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
  
      console.log("User created:", data);
  
      if (data?.createUser) {
        // Store user profile locally
        const userProfile = {
          username,
          email,
          bio,
          password,
          avatarUrl: "/default-avatar.png",
        };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
  
        alert("Registration successful. Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setError("⚠ Failed to register. Please try again.");
    }
  };
  

  return (  
    <div className="flex justify-center pt-4 mt-25">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg relative z-50">
        <h2 className="text-3xl text-center text-gray-900 mb-6">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="flex flex-col gap-3">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 block w-full"
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 block w-full"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 block w-full"
            />
          </div>
          <div>
            <label className="pl-2 pb-2 block w-full"
              htmlFor="bio">Tell us about yourself!</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="What I like most about squirrels is..."
              className="border p-2 block w-full"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {loading && <p className="text-blue-500 text-sm">Registering...</p>}
          <button
            type="submit"
            className="block mx-auto w-1/2 px-4 py-2 rounded"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
