import React, { useState, useRef }  from 'react';
import './App.css';
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {

const [value, setValue] = useState('one');
const handleChange= (event, value) => {
  setValue(value);
}; 

return (
  <div className="App">
    <AppBar position='static'>
      <Toolbar>
        <Typography 
          variant='h6'
        >

          <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers"/>
          <Tab value="two" label="Trainings"/>
          <Tab value="three" label="Calendar"/>
          </Tabs>
        </Typography>
      </Toolbar>
    </AppBar>
      {value==='one'&& < Customerlist/>}
      {value==='two'&& < Traininglist />}
      {/*{value=== 'three'&& < Calendar />}*/}
  </div> 
  );
}

export default App;
