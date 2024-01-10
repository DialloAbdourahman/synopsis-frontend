import React from 'react';
import axiosInitial from 'axios';

const useAxios = ({ user }) => {
  const axios = axiosInitial.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
  });

  const axiosPrivate = axiosInitial.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user?.accessToken ? user.accessToken : ''}`,
    },
  });

  return { axios, axiosPrivate };
};

export default useAxios;
