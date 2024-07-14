import PropTypes from "prop-types";

export const Breadcrumb = ({categories}) => {
  return (
      <div className="breadcrumb">
        {categories.map((category, index) => (
          <span key={category} className="breadcrumb-item">
            {category}
            {index < categories.length - 1 && (
              <span className="separator"> {">"} </span>
            )}
          </span>
        ))}
      </div>
  );
};

Breadcrumb.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
