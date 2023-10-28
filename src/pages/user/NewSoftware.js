/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import ReactLoading from 'react-loading';

import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

// redux
import { useDispatch } from '../../redux/store';
import { uploadProof } from '../../redux/slices/Upload';
import { createSoftware } from '../../redux/slices/trades';


const UploadProof = () => {
  const dispatch = useDispatch();
  const [file, setFile] = React.useState('');
  const[isLoading, setIsloading] = React.useState(false)

  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [version, setVersion] = React.useState('');
  const [developer, setDeveloper] = React.useState('');
  const [backtestingResults, setBacktestingResults] = React.useState(''); 
  const [releaseDate, setReleaseDate] = React.useState('');


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
  };

  React.useEffect(()=> {
      if(file){
        dispatch(uploadProof(file, setUrl)).then((upload) => {
         console.log(upload);
      });
      }
  }, [file])

 
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit =  (event) => {
    event.preventDefault();
    setIsloading(true)
     const options = {
        name,
        description,
        cost,
        version,
        developer,
        backtestingResults,
        url
    }
    console.log('options', options)
    dispatch(createSoftware(options, setIsloading, setOpen))
    setIsloading(false)
  };
  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Software Created successly !
          </Alert>
        </Snackbar>
        <div className="fade-appear-done fade-enter-done">
          <section className="container row">
            <div className="col l6 s12 offset-l3">
              <h4 className="center">Create A New Trader</h4>
              <br />
              <div className="card-panel">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div>
                      <img  src= {url} alt = "traders poc" style = {{height: 70}}/>
                    <div className="file-field input-field">
                      <div className="btn btn-secondary">
                        <span>select photo</span>
                        <input type="file" accept=".jpg,.png,.jpeg" id="proof" name="proof" onChange={handleChange} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                      </div>
                    </div>
                  </div>
                  <div>
                  <div className="input-field">
                        <input
                            id="email"
                            name="name"
                            required
                            type="text"
                            value = {name}
                            onChange ={(e) =>setName(e.target.value)}
                            placeholder='Enter Software Name'
                        />
                    </div>
                    <div className="input-field">
                        <textarea 
                            id="description"
                            name="description"
                            required
                            type="text"
                            placeholder='Enter a brief Description for the software'
                            value = {description}
                            onChange ={(e) =>setDescription(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="cost"
                            name="cost"
                            required
                            type="number"
                            placeholder='software cost'
                            value = {cost}
                            onChange ={(e) =>setCost(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="version"
                            name="version"
                            required
                            type="text"
                            placeholder='software version'
                            value = {version}
                            onChange ={(e) =>setVersion(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="Developer"
                            name="Developer"
                            required
                            type="text"
                            placeholder='Software Developer'
                            value = {developer}
                            onChange ={(e) =>setDeveloper(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="BacktestingResults"
                            name="BacktestingResults"
                            required
                            type="text"
                            placeholder='Backtesting Results e.g $8,500 profit in the last 6 months'
                            value = {backtestingResults}
                            onChange ={(e) =>setBacktestingResults(e.target.value)}
                        />
                    </div>
                     <div className="input-field">
                        <input
                            id="ReleaseDate"
                            name="ReleaseDate"
                            required
                            type="text"
                            placeholder='Release Date'
                            value = {releaseDate}
                            onChange ={(e) =>setReleaseDate(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                      <div style={{ marginLeft: 130 }}>
                        <ReactLoading color="#107bea" />
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-full">
                        Create Trader
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UploadProof;





