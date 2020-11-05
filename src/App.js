import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { 
   Box,
   Paper,
} from '@material-ui/core';
import Candidate from './pages/Candidate';
import Form from './pages/Form';
import LogoBar from './components/Shared/LogoBar';
import './App.css';

const useStyles = makeStyles((theme) => ({
   paperContainer: {
      minWidth: "50%",
      maxWidth: "50%",
      borderRadius: "15px",
      //
      marginBottom: theme.spacing(12),
      marginTop: theme.spacing(12),
      [theme.breakpoints.down("md")]: {
         minWidth: "70%",
         maxWidth: "70%",
         marginBottom: theme.spacing(6),
         marginTop: theme.spacing(6),
      },
      [theme.breakpoints.down("sm")]: {
         minWidth: "90%",
         maxWidth: "90%",
         marginBottom: theme.spacing(6),
         marginTop: theme.spacing(6),
      },
   },
}))

const App = () => {
   const custom = useStyles()

   const [email, setEmail] = useState('');
   const [suggestions, setSuggestions] = useState({moyyn: [], moberries: [], talentuno: []}); //should be an empty object

   return (
      <React.Fragment>
         <Box 
            height='100%' 
            width='100%' 
            display='flex' 
            alignItems='center' 
            justifyContent='center'
            className='App'
         >
            <Router>
               <Paper elevation={3} className={custom.paperContainer}>
                  <LogoBar />
                  <Box p={5}>
                     <Switch>
                        <Route path='/application' >
                           <Form
                              setEmail={setEmail} 
                              setSuggestions={setSuggestions} 
                           />
                        </Route>
                        <Route path='/candidate'  >
                           <Candidate 
                              email={email}
                              setEmail={setEmail}
                              suggestions={suggestions} 
                              setSuggestions={setSuggestions} 
                             />
                        </Route>
                        <Redirect to='/application' />
                     </Switch>
                  </Box>
               </Paper>
            </Router>
         </Box>
      </React.Fragment>
   );
}

export default App;
