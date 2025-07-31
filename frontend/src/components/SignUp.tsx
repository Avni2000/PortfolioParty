import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, isUserRegistered } = useAuth();
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
    password: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear errors when user starts typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
        general: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password.length >= 6 ? '' : 'Password must be at least 6 characters',
      general: ''
    };
    
    // Check if user already exists
    if (formData.email && isUserRegistered(formData.email)) {
      newErrors.email = 'User with this email already exists';
      newErrors.general = 'This email is already registered. Please try logging in instead.';
    }
    
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
    
    // Use AuthContext signUp function
    const signUpSuccess = signUp(formData);
    
    if (signUpSuccess) {
      console.log('✅ Sign up successful, navigating to dashboard');
      navigate('/dashboard');
    } else {
      setErrors({
        ...errors,
        general: 'Sign up failed. Please try again.'
      });
    }
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
          {/* General error message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last name row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'focus:ring-red-400' : 'focus:ring-green-400'
                  }`}
                  required
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'focus:ring-red-400' : 'focus:ring-green-400'
                  }`}
                  required
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="email@domain.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-400' : 'focus:ring-green-400'
                }`}
                required
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-400' : 'focus:ring-green-400'
                }`}
                required
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

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