import axios from "axios";
import { useQuery, UseQueryResult, useMutation } from "react-query";
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

type TFormData = {
  Name: string;
  Price?: number;
  Category: string;
  Description: string;
  Avatar: string;
  DeveloperEmail: string;
};

interface ICategoryOptions {
  categories: CategoryOption[];
}

interface IProductList {
  products: ProductDetails[];
}

interface IProduct {
  product: ProductDetails;
}

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5rbXI3NjVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL2FtYW5rbXIxNC9BbWFuS3VtYXItcmVhY3RuYXRpdmUuZ2l0IiwiaWF0IjoxNjczNjEzNjUyLCJleHAiOjE2NzQwNDU2NTJ9.YsPJ2najUuWzSp32Z3LKrmzl_wnomFaOLDdrh2ouScg";

export const useGetCategoryList = (): UseQueryResult<ICategoryOptions> => {
  return useQuery(
    ["get-category-list"],
    async (): Promise<ICategoryOptions> => {
      return axios({
        method: "get",
        url: endpoints.getCategories,
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    }
  );
};

export const useGetAllProducts = (): UseQueryResult<IProductList> => {
  return useQuery(["get-all-products"], async (): Promise<IProductList> => {
    return axios({
      method: "get",
      url: endpoints.getProducts,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  });
};

export const useGetProductDetails = ({
  id,
}: {
  id: string;
}): UseQueryResult<IProduct> => {
  return useQuery(["get-product-details", id], async (): Promise<IProduct> => {
    console.log(id);
    return axios({
      method: "get",
      url: `${endpoints.getProducts}/${id}`,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  });
};

export const useGetProductByCategory = ({
  id,
}: {
  id: string;
}): UseQueryResult<IProductList> => {
  return useQuery(
    ["get-product-by-category", id],
    async (): Promise<IProductList> => {
      return axios({
        method: "get",
        url: `${endpoints.getCategories}/${id}`,
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    }
  );
};

export const useAddNewProduct = () => {
  return useMutation(async (formData: TFormData): Promise<any> => {
    return await axios({
      method: "post",
      url: endpoints.getProducts,
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
      data: { ...formData },
    })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  });
};
