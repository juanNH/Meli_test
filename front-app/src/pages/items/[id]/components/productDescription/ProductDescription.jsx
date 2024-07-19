import PropTypes from "prop-types";
import "./ProductDescription.scss";
export const ProductDescription = ({ description }) => {
  return (
    <section className="product-detail">
      <h6>Descripcion del producto</h6>
      <p>{description}</p>
    </section>
  );
};

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

