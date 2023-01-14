import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { endpoints } from "../constants/urls";

type CategoryOption = {
  _id: string;
  name: string;
};

export type ProductDetails = {
  _id: string;
  name: string;
  avatar: string;
  description: string;
  price: number;
  category: string;
  developerEmail: string;
};

interface ICategoryOptions {
  categories: CategoryOption[];
}

interface IProductList {
  products: ProductDetails[];
}

export const getCategoryList = (): UseQueryResult<ICategoryOptions> => {
  return useQuery(
    ["get-category-list"],
    async (): Promise<ICategoryOptions> => {
      return axios({
        method: "get",
        url: endpoints.getCategories,
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5rbXI3NjVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL2FtYW5rbXIxNC9BbWFuS3VtYXItcmVhY3RuYXRpdmUuZ2l0IiwiaWF0IjoxNjczNjEzNjUyLCJleHAiOjE2NzQwNDU2NTJ9.YsPJ2najUuWzSp32Z3LKrmzl_wnomFaOLDdrh2ouScg",
        },
      }).then((res) => res.data);
    }
  );
};

export const getAllProducts = (): UseQueryResult<IProductList> => {
  return useQuery(["get-all-products"], async (): Promise<IProductList> => {
    return axios({
      method: "get",
      url: endpoints.getProducts,
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5rbXI3NjVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL2FtYW5rbXIxNC9BbWFuS3VtYXItcmVhY3RuYXRpdmUuZ2l0IiwiaWF0IjoxNjczNjEzNjUyLCJleHAiOjE2NzQwNDU2NTJ9.YsPJ2najUuWzSp32Z3LKrmzl_wnomFaOLDdrh2ouScg",
      },
    }).then((res) => res.data);
  });
};
