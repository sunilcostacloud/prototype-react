import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);

    // console.log("decoded", decoded);

    const { username, roles } = decoded.UserInfo;

    //  console.log("decodedInfo", username, roles);

    return { username, roles };
  }

  return { username: "", roles: [] };
};
export default useAuth;
