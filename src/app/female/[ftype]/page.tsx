import {
  responseType,
  oneProductType,
} from "@/components/utils/ProductDataTypes";
import CardAll from "@/components/views/CardsAll";

async function getData() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-05/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20productTypes%5B0%5D%20%3D%3D%20%22female%22%5D`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

const Female = async ({ params }: { params: { ftype: string } }) => {
  let res: responseType = await getData();
  if (params.ftype !== "female") {
    let originalData = res.result.filter(
      (items) => items.productTypes[1] === params.ftype
    );
    res = { result: originalData };
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 py-10 lg:grid-cols-4 gap-4">
      {res.result.map((items: oneProductType, index: number) => {
        return <CardAll key={index} singleProductData={items} />;
      })}
    </div>
  );
};

export default Female;
