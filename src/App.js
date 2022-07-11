import logo from './logo.svg';
import './App.css';
import { Grid,Card, Paper, Box, Button, TextField, Select, MenuItem, CardContent, Typography, CardActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const [query, setquery] = useState('');
  const [param, setparam] = useState('submissions')
  const [list, setlist] = useState([])


  useEffect(() => {
    axios.post('https://dsa-search-api.herokuapp.com/', { sort: param }).then((res) => {
      setlist((res.data).slice(0, 11));
    })
      .catch((err) => {
        console.log(err)
      })
  }, [param])

    const handleClick = ()=>{
      axios.post('https://dsa-search-api.herokuapp.com/search', {query:query,sort: param }).then((res) => {
      setlist((res.data).slice(0, 11));
      setquery('');
    })
      .catch((err) => {
        console.log(err)
      })
    }
  return (
    <ThemeProvider theme={darkTheme}>
    <Paper elevation={3} className='main'>
      <h1>DSA Ninja</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => (setquery(e.target.value))}
          label="Search"
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={param}
          style={{ width: '20%' }}
          onChange={(e) => (setparam(e.target.value))}
        >
          <MenuItem value={'submissions'}>Submissions</MenuItem>
          <MenuItem value={'difficulty'}>Difficulty</MenuItem>
        </Select>
        <IconButton onClick={handleClick} className='input' aria-label="delete">
          <SearchIcon />
        </IconButton>
      </div>
      <Grid xs={9} padding={"5px"}  container spacing={2} className='results'>
        {list.map((p) => {
          return (
            <Grid item xs={3}>
            <Card >
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {p.code}
                </Typography>
                <Typography variant="h5" component="div">
                  {p.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  SUBMISSIONS: {p.submissions}
                  <br />
                  DIFFICULTY: {p.difficulty}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">SOLVE</Button>
              </CardActions>
            </Card>
            </Grid>
          )
        })}
      </Grid>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
