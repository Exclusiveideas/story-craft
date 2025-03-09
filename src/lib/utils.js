import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function testNewProjectErrors({
  projectName,
  scriptTitle,
  storytellingStyle,
  description,
}) {
  if (!projectName) {
    return "Project name is required.";
  } else if (!scriptTitle) {
    return "Accurate script title is required.";
  } else if (!storytellingStyle) {
    return "Must select a storytelling style.";
  } else if (!description) {
    return "Please provide a brief description of the script.";
  } else {
    return null;
  }
}
