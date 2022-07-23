import { useRouter } from "next/router";

const ProductPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") {
    return <div>No ID</div>;
  }

  return <h1>{id}</h1>;
};

export default ProductPage;
