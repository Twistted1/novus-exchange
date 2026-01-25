import React from 'react';
import { Part } from '@google/genai';

/**
 * Converts a File object to a GoogleGenAI.Part object for use with the Gemini API.
 * @param file The File object to convert.
 * @returns A Promise that resolves to a Part object.
 */
export const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};


