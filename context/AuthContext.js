'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

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

  const loadUser = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/api/auth/session?update');

      if (data?.user) {
        setUser(data?.user);
        router.replace('/me');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        // `${process.env.API_URL}/api/auth/me/update`,
        `/api/auth/me/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('user data', data);

      if (data?.user) {
        loadUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const { data } = await axios.put(
        // `${process.env.API_URL}/api/auth/me/update/password`,
        `/api/auth/me/update/password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data?.success) {
        router.replace('/me');
      }
    } catch (error) {
      console.log(error.response);
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
      console.log('address data:', data);
      if (data?.address) {
        setUpdated(true);
        router.replace(`/me/address/${id}`);
      }

      if (data?.success) {
        router.replace('/me');
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

  const updateUser = async (id, userData) => {
    try {
      const { data } = await axios.put(
        // `${process.env.API_URL}/api/v1/admin/user/${id}`
        `api/v1/admin/user/${id}`,
        {
          userData,
        }
      );

      if (data?.success) {
        setUpdated(true);
        router.replace(`/dashboard/admin/users/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        // `${process.env.API_URL}/api/v1/admin/user/${id}`
        `api/v1/admin/user/${id}`
      );

      if (data?.success) {
        router.replace(`/dashboard/admin/users`);
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
        loading,
        user,
        setUser,
        signUpUser,
        updateProfile,
        updatePassword,
        updated,
        setUpdated,
        addNewAddress,
        updateAddress,
        deleteAddress,
        updateUser,
        deleteUser,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
