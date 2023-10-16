import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSendLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { username } = useAuth();
    const history = useHistory();
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error,
        reset
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            history.push('/signin')
            reset()
        } else if (isError) {
            alert(JSON.stringify(error.data?.message))
            reset()
        }
    }, [isSuccess, history])

    return (
        <div className={styles.HeaderParent} >
            <div style={{ width: "99%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className={styles.heading}>
                    Dashboard
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div>
                        <h3 style={{ color: "#ff014f" }} >{username}</h3>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={sendLogout}
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging Out..." : "Logout"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header