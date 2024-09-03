"use server"
import { LoginSchema } from "@/types";

const handleErrors = (response: Response) => {
  if (!response.ok) {
    return { error: response.json() }
  }
  return response.json();
};

const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(`http://localhost:8080/${url}`, options)
    return handleErrors(response);
  } catch (error) {
    return error;
  }
};

export const login = async (data: LoginSchema) => {
  const url = 'auth/login';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  return fetchData(url, options);
};

export const getUserData = async (token: string) => {
  const url = 'user';
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = fetchData(url, options);
  return response;
}