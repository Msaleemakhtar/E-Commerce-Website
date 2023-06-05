import { oneProductType } from "@/components/utils/ProductDataTypes";
import { FC } from "react";
import Card from "../Card";

const ProductCarousal: FC<{ ProductData: Array<oneProductType>}> = ({
  ProductData,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-3">
        <p className="text-blue-800 text-sm">PRODUCTS</p>
        <h3 className="text-3xl text-gray-800 font-bold">
          Check What We Have
        </h3>
      </div>

      <div>
        {ProductData.map((item: oneProductType, index: number) => (
          <Card key={index} singleProductData={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousal;
