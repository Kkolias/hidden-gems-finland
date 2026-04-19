import { Request } from "express";
import { ADMIN_KEY } from "../constants/env.const";

export function isAdmin(req: Request): boolean {
  const queryKey = req?.query?.key as string;
  const bodyKey = req?.body?.key as string;

  if (!queryKey && !bodyKey) {
    return false;
  }
  const key = queryKey || bodyKey;

  return key === ADMIN_KEY;
}
