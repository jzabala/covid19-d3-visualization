import React from 'react'
import PropTypes from 'prop-types'

function Select({ children, color, classNames, ...rest }) {
  return (
    <div className={`relative ${classNames.container}`}>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none"
        style={{ backgroundColor: color }}
        {...rest}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  color: PropTypes.string.isRequired,
  classNames: PropTypes.shape({
    container: PropTypes.string,
  }),
}

Select.defaultProps = {
  classNames: {
    container: '',
  },
}

export default Select
