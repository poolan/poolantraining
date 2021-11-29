import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Snackbar from "@mui/material/Snackbar";

function Customerlist() {
  const [customer, setCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomer(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("New customer added");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Error adding");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Error deleting");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const editCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    }).then((response) => {
      if (response.ok) {
        setMsg("Customer edited");
        setOpen(true);
        fetchCustomers();
      } else {
        alert("Error editing");
      }
    });
  };

  const columns = [
    { field: "firstname", width: "130%", sortable: true, filter: true },
    { field: "lastname", width: "130%", sortable: true, filter: true },
    { field: "streetaddress", width: "160%", sortable: true, filter: true },
    { field: "postcode", width: "140%", sortable: true, filter: true },
    { field: "city", width: "100%", sortable: true, filter: true },
    { field: "email", width: "180%", sortable: true, filter: true },
    { field: "phone", width: "160%", sortable: true, filter: true },
    {
      field: "",
      width: 120,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => (
        <EditCustomer editCustomer={editCustomer} row={params} />
      ),
    },
    {
      field: "",
      width: 100,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => (
        <div>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => deleteCustomer(params.data.links[1].href)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ marginTop: 20, height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          rowData={customer}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          suppressCellSelection={true}
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

export default Customerlist;
