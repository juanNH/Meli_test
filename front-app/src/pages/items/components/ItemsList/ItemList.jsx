import PropTypes from "prop-types";
import { Item } from "./../item/Item";
import "./ItemsList.scss";
export const ItemList = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="product-list">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="skeleton-item" key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="product-list">
      {items.map((item) => {
        const price =
          item.price.decimals === "00"
            ? item.price.amount
            : Number(
                item.price.amount.toString() +
                  "." +
                  item.price.decimals.toString()
              );
        return (
          <Item
            key={item.id}
            id={item.id}
            picture={item.picture}
            price={price}
            title={item.title}
            condition={item.condition}
            free_shipping={item.free_shipping}
          />
        );
      })}
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.shape({
        currency: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        decimals: PropTypes.number.isRequired,
      }),
      picture: PropTypes.string.isRequired,
      condition: PropTypes.string.isRequired,
      free_shipping: PropTypes.bool.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
