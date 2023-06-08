'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const signUpUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(
        // `${process.env.API_URL}/api/auth/sign-up`,
        `/api/auth/sign-up`,
        {
          name,
          email,
          password,
        }
      );

      if (data?.user) {
        router.push('/');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const { data } = await axios.post(
        // `${process.env.API_URL}/api/v1/address/new`,
        `/api/v1/address/new`,
        address
      );

      if (data) {
        router.push('/me');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateAddress = async (id, address) => {
    try {
      const { data } = await axios.put(
        //  `${process.env.API_URL}/api/v1/address/${id}`,
        `/api/v1/address/${id}`,
        address
      );

      if (data?.address) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(
        //  `${process.env.API_URL}/api/v1/address/${id}`
        `/api/v1/address/${id}`
      );

      if (data?.success) {
        router.push('/me');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        user,
        setUser,
        signUpUser,
        updated,
        setUpdated,
        addNewAddress,
        updateAddress,
        deleteAddress,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
