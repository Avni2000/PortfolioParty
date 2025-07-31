import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required'
    };
    
    setErrors(newErrors);
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }
    
    console.log('Sign up data:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative circle */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-gray-600 rounded-full opacity-50 shadow-[0_0_100px_rgba(255,255,255,0.3)] z-0"></div>
      
      
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-green-400 text-xl font-medium">Portfolio Party</h1>
      </div>

      <div className="flex items-center justify-between w-full max-w-6xl z-10">
        {/* Left side - Text */}
        <div className="text-white max-w-md">
          <h2 className="text-5xl font-bold mb-4">Create an account</h2>
          <p className="text-gray-300 text-lg">
            Enter your name, email, and password to get started
          </p>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last name row */}
            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-1 px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="email@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-sm text-gray-300 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:underline">
              Sign in
            </Link>
          </p>

          {/* Terms text */}
          <p className="text-gray-400 text-sm text-center mt-4 leading-relaxed">
            By clicking continue, you agree to our{' '}
            <Link to="/terms" className="text-white hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-white hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;