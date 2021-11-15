import React, { useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Traininglist() {
    const [training, setTraining] = useState ([]);
    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
    }, [])
    const columns = [
        {field: 'date', width: '300%', sortable: true, filter: true}, 
        {field: 'duration', width: '150%', sortable: true, filter: true},
        {field: 'activity', width: '150%', sortable: true, filter: true},
        {/*field: 'content', width: '150%', sortable: true, filter: true*/},
    ]
    return (
        <div className="ag-theme-material" style={{height: 600 , width: '90%', margin: 'auto'}}>
            <AgGridReact
                rowData={training}
                columnDefs={columns}
                pagination= {true}
                paginationPageSize= {10}
            />
            </div>
    )
}
export default Traininglist;