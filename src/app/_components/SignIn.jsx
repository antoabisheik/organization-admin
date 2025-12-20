'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineVisibility } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../api/firebase';
import { useRouter } from 'next/navigation';
import LoadingOverlay from './LoadingOverlay';
import { onAuthStateChanged } from "firebase/auth";
import { toast } from 'sonner';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


 const handleEmailLogin = async (e) => {
  e?.preventDefault();

  if (!email.trim()) {
    toast.error('Please enter your email');
    return;
  }

  if (!password) {
    toast.error('Please enter your password');
    return;
  }

  setLoading(true);

  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // LOGIN → get ID token
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

     console.log(loginRes.headers);
     console.log(loginRes.body);
    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      throw new Error(loginData.error || 'Login failed');
    }

    console.log('Login response:', loginData);
    toast.success('Login successful');
    router.push('/my-gym');

  } catch (err) {
    console.error('Login error:', err);

    const errorMessage =
      err.message.includes('INVALID_LOGIN_CREDENTIALS') ||
      err.message.includes('INVALID_PASSWORD') ||
      err.message.includes('EMAIL_NOT_FOUND')
        ? 'Invalid email or password'
        : err.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')
        ? 'Too many failed attempts. Please try again later.'
        : err.message.includes('USER_DISABLED')
        ? 'This account has been disabled'
        : err.message || 'Failed to sign in';

    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  // Google Login - Get token from Firebase, send to YOUR backend
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      // Step 1: Get Google credentials via Firebase popup
      const result = await signInWithPopup(auth, googleProvider);

      // Step 2: Get ID token
      const idToken = await result.user.getIdToken();

      // Step 3: Send token to YOUR backend for verification
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Google login failed');
      }

      // ✅ Debug: Check if session cookie was set
      console.log('Google login response:', data);
      console.log('Response headers:', res.headers);

      // ✅ Verify backend actually created a session
      if (!data.success && !data.user) {
        throw new Error('Backend did not create session');
      }

      toast.success('Login successful');
      router.push('/my-gym');
      
    } catch (err) {
      console.error('Google login error:', err);

      if (err.code === 'auth/popup-blocked') {
        toast.error('Popup was blocked. Please allow popups for this site.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // User closed popup, don't show error
        console.log('User cancelled popup');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account already exists with the same email');
      } else {
        toast.error(err.message || 'Google login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-r text-white relative min-h-screen">
      {loading && <LoadingOverlay />}

      <div className="flex flex-col px-6 mx-auto my-8 w-full max-w-sm z-10">
        <h1 className="text-3xl font-bold text-[#A4FEB7] mb-1">Sign in</h1>
        <p className="text-gray-300 mb-4">
          Please login to continue to your account.
        </p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-[#A4FEB7]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-2 bg-transparent border border-white rounded-2xl placeholder-gray-400 focus:outline-none focus:border-[#A4FEB7]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white"
              >
                {showPassword ? <MdOutlineVisibility /> : <FaEyeSlash />}
              </button>
            </div>
            <Link href="/fp" className="text-blue-400 text-sm mt-1 inline-block hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-[#A4FEB7] text-black font-semibold text-base cursor-pointer hover:bg-[#8ef0a5] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* OR Divider */}
          <div className="text-center text-gray-400 text-sm">or</div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2 flex items-center justify-center border border-gray-500 rounded-xl text-white hover:bg-gray-800 cursor-pointer text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="mr-2 text-lg" />
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-gray-400 text-xs text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;