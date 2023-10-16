import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useSendLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { useEffect } from "react";

const Header = () => {

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
    )
}

export default Header