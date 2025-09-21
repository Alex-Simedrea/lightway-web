import { useMutation } from '@tanstack/react-query';
import api from './api';

export const login = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  return api.post('/auth/login', { email, password }).then((res) => res.data);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login
  });
};

export const register = async ({
  username,
  firstName,
  lastName,
  email,
  password
}: {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return api
    .post('/auth/register', { username, firstName, lastName, email, password })
    .then((res) => res.data);
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  });
};
