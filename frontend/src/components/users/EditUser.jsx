import { useHistory, useParams } from "react-router-dom"
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../redux/features/users/usersApiSlice";
import { Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Admin',
    'Creator',
    'User'
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditUser = () => {
    const { id } = useParams();
    const { data, isFetching, isError, error, isSuccess } = useGetUserByIdQuery(id)
    const [username, setUserName] = useState("");

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [updateUser, {
        isFetching: updateIsFetching,
        isSuccess: updateIsSuccess,
        isError: updateIsError,
        error: updateError,
        reset
    }] = useUpdateUserMutation()

    const history = useHistory()

    const handleUpdate = () => {
        updateUser({ id: data._id, username, roles: personName })
    }

    useEffect(() => {
        setUserName(data?.username)
    }, [data])

    useEffect(() => {
        if (updateIsSuccess) {
            alert("user successfully updated")
            reset()
            setPersonName([])
        } else if (updateIsError) {
            alert(updateError?.data?.message)
            reset()
        }
    }, [updateIsSuccess, updateIsError])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
                <Button variant="contained" onClick={() => history.goBack()}>
                    Go Back
                </Button>
            </div>
            {
                isFetching ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                    </div>
                ) : isError ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <h4>{error?.data?.message}</h4>
                    </div>
                ) : isSuccess ? (
                    <>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <div>
                                <div>
                                    <h2>Username: {data?.username}</h2>
                                    <div>
                                        <h3 style={{ textDecoration: "underline" }}>Roles</h3>
                                        <ul>
                                            {data?.roles?.map((role, index) => (
                                                <li key={index} style={{ marginLeft: "20px" }} >{role}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <h2>EditUser</h2>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <FormControl sx={{ m: 2, width: 200 }}>
                                        <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={personName}
                                            onChange={handleChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, personName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button variant="outlined" onClick={handleUpdate} disabled={updateIsFetching}>
                                        {updateIsFetching ? "Loading" : "Submit"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : ""
            }

        </div>
    )
}

export default EditUser