/**
 * investors.keyra.ie — environment configuration.
 * All persistence routes through Ciright / Keyra Core APIs (no local DB).
 */

export const APP_NAME = "Keyra Investor Platform";
export const APP_DOMAIN = "investors.keyra.ie";

export const CONNECTED_APPS = {
  ir: "https://ir.keyra.ie",
  crm: "https://crm.keyra.ie",
  prospects: "https://prospects.keyra.ie",
  esig: "https://esig.keyra.ie",
  info: "https://info.keyra.ie",
  admin: "https://admin.keyra.ie",
  api: "https://api.keyra.ie",
  auth: "https://auth.keyra.ie",
  cirightApi: "https://api.ciright.com",
  cirightCore: "https://core.ciright.com",
} as const;

export const API_BASE =
  process.env.NEXT_PUBLIC_KEYRA_API_URL ?? CONNECTED_APPS.api;
export const CIRIGHT_CORE_BASE =
  process.env.NEXT_PUBLIC_CIRIGHT_CORE_URL ?? CONNECTED_APPS.cirightCore;
export const AUTH_BASE =
  process.env.NEXT_PUBLIC_AUTH_URL ?? CONNECTED_APPS.auth;
export const INFO_CONTENT_BASE =
  process.env.NEXT_PUBLIC_INFO_URL ?? CONNECTED_APPS.info;
