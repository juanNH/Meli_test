import PropTypes from "prop-types";
import { Item } from "./../item/Item";
import {priceFormat } from './../../../../helpers';
import "./ItemsList.scss";
export const ItemList = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <section className="product-list">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="skeleton-item" key={index} data-testid="skeleton-item"/>
        ))}
      </section>
    );
  }
  return (
    <section className="product-list">
      {items.map((item) => {
        const price = priceFormat(item.price.amount, item.price.decimals)
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
    </section>
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
