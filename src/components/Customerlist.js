import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";

function Customerlist() {
  const [customer, setCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [customers, setCustomers] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const addCustomer = () => {
    setCustomer([customer, ...customers]);
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
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

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    }).then((response) => {
      if (response.ok) {
        setMsg("Customer updated");
        setOpen(true);
        fetchCustomers();
      } else {
        alert("There was an error ");
      }
    });
  };

  const saveCustomer = (customer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.error(err));
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
        <Editcustomer editCustomer={editCustomer} row={params} />
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
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <Addcustomer saveCustomer={saveCustomer} />
      <AgGridReact
        rowData={customer}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

export default Customerlist;
