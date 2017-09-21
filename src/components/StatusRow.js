import React from 'react';
import PropTypes from 'prop-types';
const StatusRow = ({title, value}) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
);

StatusRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.number
  ]).isRequired
};


export default StatusRow;