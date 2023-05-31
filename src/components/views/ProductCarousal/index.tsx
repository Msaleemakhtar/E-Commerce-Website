import {FC} from 'react';
interface ProductCarousalProps {
  ProductData: any[];
}


const ProductCarousal:FC<ProductCarousalProps> = ({ ProductData }) => {
  return <div>{ProductData[0]?.productName}</div>;
};

export default ProductCarousal;
