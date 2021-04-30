import { Router } from "next/router";

export interface PageProps {
  router: Router;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  owner: IUser;
  products: Array<IProduct>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: string;
  title: string;
  price: string;
  shipping: string;
  currency: string;
  shop: string;
  url: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMessage = {
  text: string;
} | null;