import React, { useState, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TodayIcon from "@mui/icons-material/Today";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Divider from "@mui/material/Divider";
import Calendar from "./Calendar";
import Statistics from "./Statistics";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NavDrawer() {
  const [value, setValue] = useState("customers");
  const handleChange = (event, value) => {
    setValue(value);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List value={value}>
          <ListItem
            button="true"
            onClick={(event) => handleChange(event, "customers")}
          >
            <ListItemIcon>{<PersonIcon color="primary" />}</ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <Divider />
          <ListItem
            button="true"
            onClick={(event) => handleChange(event, "trainings")}
          >
            <ListItemIcon>
              {<DirectionsRunIcon color="secondary" />}
            </ListItemIcon>
            <ListItemText primary="Trainings" />
          </ListItem>
          <Divider />
          <ListItem
            button="true"
            onClick={(event) => handleChange(event, "calendar")}
          >
            <ListItemIcon>{<TodayIcon color="success" />}</ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <Divider />
          <ListItem
            button="true"
            onClick={(e) => handleChange(e, "statistics")}
          >
            <ListItemIcon>{<EqualizerIcon color="primary" />}</ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {value === "customers" && <Customerlist />}
        {value === "trainings" && <Traininglist />}
        {value === "calendar" && <Calendar />}
        {value === "statistics" && <Statistics />}
      </Main>
    </Box>
  );
}
export default NavDrawer;
