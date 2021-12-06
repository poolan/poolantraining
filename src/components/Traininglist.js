import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Snackbar from "@mui/material/Snackbar";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Traininglist() {
  const [training, setTraining] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => setTraining(data))
      .catch((err) => console.error(err));
  };

  const deleteTrainings = (tId) => {
    if (
      window.confirm("Are you sure you want to delete this training record?")
    ) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + tId, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setMsg("Training deleted");
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Error deleting training");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    { field: "activity", sortable: true, filter: true, width: "150%" },
    {
      headerName: "Date",
      valueGetter: ({ data }) => {
        return dayjs(data.date).format("DD/MM/YYYY h:mm a");
      },
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "Minutes",
      field: "duration",
      sortable: true,
      filter: true,
      width: 160,
    },
    {
      headerName: "Customer",
      valueGetter: ({ data }) =>
        `${data.customer.firstname} ${data.customer.lastname}`,
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "",
      sortable: false,
      filter: false,
      width: 70,
      field: "",
      cellRendererFramework: (params) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => deleteTrainings(params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <div>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={training}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
      <Snackbar
        open={open}
        message={msg}
        autoHideDuration={3000}
        onClose={handleClose}
      />
    </div>
  );
}
export default Traininglist;
