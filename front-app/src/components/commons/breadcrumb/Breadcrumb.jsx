import PropTypes from "prop-types";
//import './Breadcrumb.scss';
export const Breadcrumb = ({categories}) => {
  return (
      <section className="breadcrumb">
        {categories.map((category, index) => (
          <span key={category} className="breadcrumb-item">
            {category}
            {index < categories.length - 1 && (
              <span className="separator"> {">"} </span>
            )}
          </span>
        ))}
      </section>
  );
};

Breadcrumb.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
