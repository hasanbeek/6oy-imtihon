import Product from "./Product";

function ProductList({ products }) {
  return (
    <div className="card-container">
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductList;
