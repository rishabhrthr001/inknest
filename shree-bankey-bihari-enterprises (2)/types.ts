import React from "react";

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface USP {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Product {
  _id: string;
  categoryId: string;
  name: string;
  images: string[]; // Changed from image: string to images: string[]
  price?: string;
  description: string;
}
