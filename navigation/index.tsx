import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail";
import AddProduct from "../screens/AddProduct";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetails" component={ProductDetail} />
        <Stack.Screen name="Add Product" component={AddProduct} />
      </Stack.Navigator>
  );
};

export default Navigation;
