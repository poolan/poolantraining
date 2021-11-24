import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function Customerlist() {
  const [customer, setCustomer] = useState([]);
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
    fetch(url, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        fetchCustomers();
      } else {
        alert("Something went wrong");
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
      field: "_links.self.href",
      cellRendererFramework: (params) => (
        <button onClick={() => deleteCustomer(params)}>Delete</button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
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
