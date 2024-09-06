"use server"
import { getAccessToken, setAccessToken } from "@/lib/cookies";
import { LoginSchema, RegisterSchema } from "@/types";
import { redirect } from "next/navigation";

const handleErrors = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 403) {
      console.log("redirecting to login")
      redirect('/login');
    }
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

export const registerUser = async (data: RegisterSchema): Promise<{ error: Promise<{ detail: string }> }> => {
  const url = 'auth/register';

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

export const getUserData = async (): Promise<UserDataResponseDto | undefined> => {
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

export const getTransfers = async (as?: "payer" | "payee", startDate?: Date, endDate?: Date): Promise<TransfersResponseDto | undefined> => {
  const url = 'transfers';
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