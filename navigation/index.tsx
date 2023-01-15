import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail";
import AddProduct from "../screens/AddProduct";

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { productId: string };
  AddProduct: undefined;
}

const Navigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetails" component={ProductDetail} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
  );
};

export default Navigation;
