import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetMusicQuery } from "../../redux/features/music/musicApiSlice";

const columns = [
    {
        id: "songName",
        label: "Song Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "genre",
        label: "Genre",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "singer",
        label: "Singer",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "movie",
        label: "Movie",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "file",
        label: "File",
        minwidth: 60,
        align: "center",
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


const Dashboard = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken)

    const getPageNumberFromSessionStorage = sessionStorage.getItem("currentPage")
    const [currentPage, setCurrentPage] = useState(getPageNumberFromSessionStorage || 1);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState('all');

    const { data, isFetching, isError, error, isSuccess, refetch } = useGetMusicQuery({ search, genre, page: currentPage },
        {
            pollingInterval: 900000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        });

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard