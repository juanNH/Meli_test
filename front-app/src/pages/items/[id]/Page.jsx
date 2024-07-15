import { useItem } from "./../../../hooks";
import { formatNumber } from "./../../../helpers";
import { ProductImage } from "./components/productImage/ProductImage";
import { ProductData } from "./components/productData/ProductData";
import { ProductDescription } from "./components/productDescription/ProductDescription";

import "./Page.scss";
const Page = () => {
  const { item, isLoading } = useItem();
  console.log(item, isLoading);
  if (!item || isLoading) {
    return (
      <div className="product-view">
        <div className="skeleton"></div>
      </div>
    );
  }
  return (
    <div className="product-view">
      <div className="container">
        <div className="row">
          <ProductImage picture={item.item.picture+'ssqqwqd'} alt={item.item.title} />
          <ProductData
            sold_quantity={item.item.sold_quantity}
            condition={item.item.condition}
            title={item.item.title}
            price={formatNumber(item.item.price.amount)}
            decimals={item.item.price.decimals || "00"}
          />
        </div>
        <ProductDescription description={item.item.description} />
      </div>
    </div>
  );
};
export default Page;
