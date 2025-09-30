import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string) {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatEther(value: string | bigint) {
  if (!value) return "0"
  const num = typeof value === "string" ? parseFloat(value) : Number(value) / 1e18
  return num.toFixed(4)
}

export function formatPoints(value: string | bigint) {
  if (!value) return "0"
  const num = typeof value === "string" ? parseInt(value) : Number(value)
  return num.toLocaleString()
}
