import PropTypes from "prop-types";
import "./ProductDescription.scss";
export const ProductDescription = ({ description }) => {
  return (
    <div className="product-detail">
      <h6>Descripcion del producto</h6>
      <p>{description}</p>
    </div>
  );
};

ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

