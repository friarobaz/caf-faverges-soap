import { Event } from "@netlify/functions/src/function/event";

export const isPasswordOk = (event: Event): boolean => event.queryStringParameters?.password === process.env.API_PASSWORD