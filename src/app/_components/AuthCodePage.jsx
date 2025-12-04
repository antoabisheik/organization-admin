"use client";
import Link from "next/link";
import React, { useState } from "react";

const AuthCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="flex flex-start top-30 bg-[url('')] flex items-center justify-center px-8 sm:px-20 bg-gradient-to-r from-[#123425] to-[#0f1c1a] text-white relative">
      <div className="max-w-md space-y-6">
        <h2 className="text-2xl text-center w-120 sm:text-3xl font-bold text-white">
          Enter Authentication Code
        </h2>

        <p className="text-sm text-center text-gray-300">
          We have sent a code to your email.
          <br />
          Please enter the code below to verify your account.
        </p>

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A4FEB7]"
            />
          ))}
        </div>

        <button className="bg-[#A4FEB7] w-full text-black px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition">
          Verify Code
        </button>

        <p className="text-sm text-center text-gray-300">
          Didn't receive the code?{" "}
          <Link href="#" className="text-[#A4FEB7] hover:underline">
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthCodePage;
