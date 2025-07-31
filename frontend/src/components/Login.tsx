import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogIn = () => {
  const navigate = useNavigate();
  const { signIn, isUserRegistered } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);

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
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required',
      general: ''
    };
    
    setErrors(newErrors);
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }
    
    setIsLoading(true);
    
    // First check if user is registered
    if (!isUserRegistered(formData.email)) {
      setErrors({
        ...errors,
        general: 'No account found with this email. Please sign up first.'
      });
      setIsLoading(false);
      
      // Optional: Auto-redirect to signup after a delay
      setTimeout(() => {
        navigate('/signup');
      }, 2000);
      return;
    }
    
    console.log('Login data:', formData);
    
    // Use AuthContext signIn function
    const signInSuccess = signIn(formData.email, formData.password);
    
    if (signInSuccess) {
      console.log('✅ Login successful, navigating to dashboard');
      navigate('/dashboard');
    } else {
      setErrors({
        ...errors,
        general: 'Invalid email or password. Please try again.'
      });
    }
    
    setIsLoading(false);
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
          <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-gray-300 text-lg">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md">
          {/* General error message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
              {errors.general.includes('No account found') && (
                <p className="text-gray-300 text-sm mt-2">
                  Redirecting to sign up page in 2 seconds...
                </p>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">

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
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-400' : 'focus:ring-green-400'
                }`}
                required
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-300 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;