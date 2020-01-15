declare global {
  interface Window {
    Capacitor: any;
  }
}

export interface TeaCategory {
  id: number;
  name: string;
  description: string;
}

export function isTeaCategory(teaCategory: TeaCategory): teaCategory is TeaCategory {
  return !!teaCategory.id && typeof teaCategory.id === "number" &&
         !!teaCategory.name && typeof teaCategory.name === "string" &&
         !!teaCategory.description && typeof teaCategory.description === "string";
}

export function isTeaCategories(teaCategories: TeaCategory[]): teaCategories is TeaCategory[] {
  return !!teaCategories.length && isTeaCategory(teaCategories[0]);
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IDToken {
  sub: number;
  firstName: string;
  lastName: string;
  email?: string;
  emails?: string[];
}

