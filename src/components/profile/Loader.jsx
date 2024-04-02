import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


function Loader() {
    return ( 
        <div className='loader__profile'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
        

     );
}

export default Loader;