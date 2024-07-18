import { useItem } from "../../../hooks";
import { formatNumber } from "../../../helpers";
import { ProductImage } from "./components/productImage/ProductImage";
import { ProductData } from "./components/productData/ProductData";
import { ProductDescription } from "./components/productDescription/ProductDescription";
import "./PageItemId.scss";
const PageItemId = () => {
  const { item, isLoading } = useItem();
  if (isLoading) {
    return (
      <div className="product-view">
        <div className="skeleton" data-testid="skeleton-loader"></div>
      </div>
    );
  }
  if (!item && !isLoading) {
    return (
      <div className="product-view">
        <div className="skeleton" data-testid="skeleton-loader"><h2>Parece que no se puede encontrar el producto!</h2></div>
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
export default PageItemId;
