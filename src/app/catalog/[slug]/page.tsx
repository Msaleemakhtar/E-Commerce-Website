import { Metadata } from "next";
import {
  oneProductType,
  responseType,
} from "@/components/utils/ProductDataTypes";
import ProductDetail from "@/components/views/ProductDetail"

// Metadata generator
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const products = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-05/data/query/production?query=*[_type == "products"]`
  ).then((res) => res.json());

  const dataToSet: oneProductType = products.result.find(
    (item: oneProductType) => item.slug.current === slug
  );

  return {
    title: dataToSet.productName,
    description: dataToSet.description,
  };
}

// fetched data for product in slug

async function ProductData(slug: string) {
  const res = await fetch(
   `https://cv77cftg.api.sanity.io/v2023-06-05/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20slug.current%3D%3D%22${slug}%22%5D`
  );

  return res.json();
}

const Catalog = async ({ params }: { params: { slug: string } }) => {
  let data: responseType = await ProductData(params.slug);
 
  return (
    <div>
  <ProductDetail item={data.result[0]} />
 </div>
  )
};

export default Catalog;
