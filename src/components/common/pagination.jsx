/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
//   const pageCount = Math.ceil(itemCount / pageSize);
//   if (pageCount === 1) return null;

//   const pages = _.range(1, pageCount + 1);

//   return (
//     <nav>
//       <ul className="pagination">
//         {currentPage !== 1 ? (
//           <li className="page-item">
//             <a
//               className="page-link"
//               onClick={() => onPageChange(currentPage - 1)}
//             >
//               {"<<"}
//             </a>
//           </li>
//         ) : null}
//         {pages.map((page) => (
//           <li
//             key={page}
//             className={page === currentPage ? "page-item active" : "page-item"}
//           >
//             <a className="page-link" onClick={() => onPageChange(page)}>
//               {page}
//             </a>
//           </li>
//         ))}
//         {currentPage !== pageCount ? (
//           <li className="page-item">
//             <a
//               className="page-link"
//               onClick={() => onPageChange(currentPage + 1)}
//             >
//               {">>"}
//             </a>
//           </li>
//         ) : null}
//       </ul>
//     </nav>
//   );
// };

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
