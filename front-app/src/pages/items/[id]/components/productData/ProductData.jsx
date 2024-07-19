import PropTypes from "prop-types";
import './ProductData.scss';
export const ProductData = ({
  sold_quantity,
  price,
  decimals,
  condition,
  title,
}) => {
  return (
    <section className="product-data">
      <p>
        {condition} - {sold_quantity} vendidos
      </p>
      <h5>{title}</h5>
      <div className="product-detail-price-container">
        <span className="product-detail-price">$ {price}</span>
        <div className="product-detail-price-decimals-container">
          <span className="product-detail-price-decimals">{decimals}</span>
        </div>
      </div>
      <button className="product-data-button" aria-label="Comprar">Comprar</button>
    </section>
  );
};

ProductData.propTypes = {
  sold_quantity: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
