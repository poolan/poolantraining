import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

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
    fetch("https://customerrest.herokuapp.com/api/gettrainings")
      .then((response) => response.json())
      .then((data) => setTraining(data.content))
      .catch((err) => console.error(err));
  };

  const deleteTrainings = (trainingsId) => {
    if (
      window.confirm("Are you sure you want to delete this training record?")
    ) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + trainingsId, {
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

    const columns = [
      { field: "date", width: "300%", sortable: true, filter: true },
      { field: "duration", width: "150%", sortable: true, filter: true },
      { field: "activity", width: "150%", sortable: true, filter: true },
      {},
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
  };
}
export default Traininglist;
