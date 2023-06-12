import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import AllproductsData from "@/components/views/Allproducts";

const fetchAlldata = async () => {
  const res = await fetch(`${BASE_PATH_FORAPI}/api/products?start=0&end=4`, {
    next: {
      revalidate: 120,
    },
  });

  if (!res.ok) {
    throw new Error("Data not found");
  }
  return res.json();
};

const Products = async () => {
  const ProductData = await fetchAlldata();

  return <AllproductsData ProductData={ProductData} />;
};

export default Products;
