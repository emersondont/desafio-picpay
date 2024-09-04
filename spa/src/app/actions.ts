"use server"
import { getAccessToken, setAccessToken } from "@/lib/cookies";
import { LoginSchema } from "@/types";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";

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

export const login = async (data: LoginSchema): Promise<{ error: Promise<{ detail: string }> }> => {
  const url = 'auth/login';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  const res = await fetchData(url, options);
  const token = await res.token;

  if (token) {
    setAccessToken(token);
  }

  if (!res.error) {
    redirect('/');
  }

  return res;
};

export const getUserData = async () => {
  const url = 'user';
  const token = getAccessToken();
  if (!token) {
    return;
  }
  
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  }

  const response = fetchData(url, options);
  return response;
}