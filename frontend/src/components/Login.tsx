import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
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
    
    console.log('Login data:', formData);
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
          <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
        </div>

        {/* Right side - Form */}
        <div className="w-full max-w-md">
          <form onSubmit={(e) => {
              handleSubmit(e);
            }} className="space-y-4">

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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;