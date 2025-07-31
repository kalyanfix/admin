import PropTypes from 'prop-types'; // Import prop-types
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles = [] }) => { // Set default value for roles here
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required role
  if (roles.length && !roles.includes(user?.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

// Define prop types for PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string), // Expecting an array of strings for roles
};

export default PrivateRoute;
