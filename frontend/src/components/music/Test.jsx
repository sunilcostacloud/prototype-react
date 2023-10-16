import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddEmployee from './AddEmployee';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import { useGetEmployeesTableQuery } from '../../redux/features/employeesSlice';

const columns = [
    {
        id: "firstName",
        label: "First Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF"
    },
    {
        id: "lastName",
        label: "Last Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "email",
        label: "Email",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "phoneNumber",
        label: "Phone Number",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "gender",
        label: "Gender",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "status",
        label: "Status",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "location",
        label: "Location",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "date",
        label: "Date",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "actions",
        label: "Actions",
        minwidth: 60,
        align: "center",
        background: "#755139FF",
    },
];


const EmployeesTable = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("new");
    const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('employeePage') || 1);
    const [tableRowId, setTableRowId] = useState("");
    const [addEmployeeOpen, setAddEmployeeOpen] = React.useState(false);
    const [editEmployeeopen, setEditEmployeeOpen] = React.useState(false);
    const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false);

    const { data, isFetching, isError, error, isSuccess, refetch } = useGetEmployeesTableQuery({ search, gender, status, sort, page: currentPage })

    // console.log(data, "employeesData")

    const handleAddEmployeeClickOpen = () => {
        setAddEmployeeOpen(true);
    };

    const handleEditEmployeeClickOpen = () => {
        setEditEmployeeOpen(true);
    };

    const handleEditClick = (e, id) => {
        setTableRowId(id);
        handleEditEmployeeClickOpen()
    }

    const handleDeleteEmployeeClickOpen = () => {
        setDeleteEmployeeOpen(true);
    }
    const handleDeleteClick = (e, id) => {
        setTableRowId(id);
        handleDeleteEmployeeClickOpen()
    }
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        sessionStorage.setItem("employeePage", newPage);
    };

    const requestSearch = () => {
        setSearch(text)
        setCurrentPage(1);
        sessionStorage.setItem("employeePage", 1)
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setCurrentPage(1);
        sessionStorage.setItem("employeePage", 1)
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
        sessionStorage.setItem("employeePage", 1)
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setCurrentPage(1);
        sessionStorage.setItem("employeePage", 1)
    };



    const handleViewClick = (e, id) => {
        navigate(`/employee/${id}`)
    }

    useEffect(() => {
        if (text == "") {
            setSearch("")
        }
    }, [text])

    useEffect(() => {
        if (sessionStorage.getItem("employeeCount") != 1) {
            sessionStorage.setItem('employeeCount', 1)
            sessionStorage.setItem("employeePage", 1);
        }
    }, [])

    console.log("currentPage", currentPage)

    return (
        <div>
            <div> <h1>Employees Table</h1> </div>
            <div
                style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "auto"
                }}
            >
                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                    <TextField id="standard-basic" label="Search" variant="standard" type="search"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => requestSearch()} >Search</Button>
                </div>

                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={gender}
                            onChange={handleGenderChange}
                            row
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleStatusChange}
                            label="Status"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">active</MenuItem>
                            <MenuItem value="inactive">inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort"
                        >
                            <MenuItem value="new">new</MenuItem>
                            <MenuItem value="old">old</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddEmployeeClickOpen()}
                    >
                        Add User
                    </Button>
                </div>

            </div>
            {isFetching ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                </div>
            ) : isError ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <h4>{error.status}</h4>
                </div>
            ) : data?.employeesTableData.length == 0 ? (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <h1>No Data Found</h1>
                </div>
            ) : isSuccess ? (
                <div style={{ width: "95%", margin: "auto" }}>

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                width: "100%",
                                overflowX: "auto",
                                display: "inline-grid",
                                marginTop: "10px",
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        background: column.background,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.employeesTableData?.map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    style={{
                                                        background: "#F2EDD7FF"
                                                    }}
                                                >
                                                    <TableCell align="left" >
                                                        {row.fname}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.lname}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.email}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.mobile}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.gender}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.location}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {moment(row.datecreated).format(
                                                            "DD-MM-YYYY hh:mm a"
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                            <Button variant="contained" color="success"
                                                                onClick={(event) =>
                                                                    handleViewClick(event, row._id)
                                                                }
                                                            >
                                                                View
                                                            </Button>
                                                            <Button variant="contained" color="secondary"
                                                                onClick={(event) =>
                                                                    handleEditClick(event, row._id)
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button variant="contained" color="error"
                                                                onClick={(event) =>
                                                                    handleDeleteClick(event, row._id)
                                                                }
                                                            >Delete</Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Pagination
                                    count={data?.Pagination?.pageCount}
                                    page={Number(currentPage)}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ) : ""}

            {/* add employee dialog */}
            <AddEmployee
                addEmployeeOpen={addEmployeeOpen}
                setAddEmployeeOpen={setAddEmployeeOpen}
                setCurrentPage={setCurrentPage}
            />

            {/* edit employee dialog */}
            <EditEmployee
                editEmployeeopen={editEmployeeopen}
                setEditEmployeeOpen={setEditEmployeeOpen}
                tableRowId={tableRowId}
            />

            {/* delete employee dialog */}
            <DeleteEmployee
                deleteEmployeeOpen={deleteEmployeeOpen}
                setDeleteEmployeeOpen={setDeleteEmployeeOpen}
                tableRowId={tableRowId}
                page={data?.Pagination?.pageCount == 0 ? 1 : data?.Pagination?.pageCount == 1 ? 1 : (data?.Pagination?.pageCount > 1 && data?.employeesTableData?.length == 1) ? currentPage - 1 : currentPage}
                setCurrentPage={setCurrentPage}
            />

        </div>
    )
}

export default EmployeesTable