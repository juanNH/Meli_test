import PropTypes from "prop-types";
import "./ProductImage.scss";
export const ProductImage = ({ picture, alt }) => {
  return (
    <div className="product-image">
      <img src={picture} alt={alt} />
    </div>
  );
};

ProductImage.propTypes = {
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
