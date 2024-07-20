import PropTypes from "prop-types";
import "./ProductImage.scss";
export const ProductImage = ({ picture, alt }) => {
  return (
    <section className="product-image">
      <img src={picture} alt={alt} title={alt} role="img" loading="lazy"/>
    </section>
  );
};

ProductImage.propTypes = {
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
