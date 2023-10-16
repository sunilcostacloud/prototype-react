import { useSelector } from "react-redux"
import { selectCurrentToken } from "../redux/features/auth/authSlice"
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, children }) => {
  const { username, roles } = useAuth();

  const token = useSelector(selectCurrentToken)

  if (!token) {
    // Redirect to the login page if not authenticated
    return <Redirect to="/login" />;
  }

  const hasRequiredRole = roles.some(role => allowedRoles.includes(role))

  if (hasRequiredRole) {
    // Render the child components if the user has the required role
    return children;
  } else if (username) {
    // Redirect to the unauthorized page if the user doesn't have the required role
    return <Redirect to="/unauthorized" />;
  } else {
    // Redirect to the login page if the user is not authenticated
    return <Redirect to="/signin" />;
  }
}

export default RequireAuth