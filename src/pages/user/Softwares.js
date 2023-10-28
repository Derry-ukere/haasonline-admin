/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import BasicTable from '../../components/basic-table/SoftwareTable';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import {getAllSoftwares } from '../../redux/slices/softwares/getAllSoftwares';

const FundAccount = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const {  allUserSoftwares,isLoading, error } = useSelector((state) => state.allSoftwares);
 
  React.useEffect(() => {
    dispatch(getAllSoftwares());
  },[])



  const push = () => {
    navigate('/user/software/new-software')
  }

  const headers = [
    {
      id : 1,
      title : "Software Name",
      align : "left",
    },
    {
      id : 2,
      title : "Client email",
      align : "left",
    },
    {
      id : 3,
      title : "Client name",
      align : "left",
    },
    {
      id :5,
      title : "Status",
      align : "left"
    },
    {
      id :6,
      title : "Software cost",
      align : "left"
    },
    {
      id :7,
      title : "",
      align : "right"
    }
   ]

  const tableConfig = {
    title: 'Purschased Softwares',
    headers,
    body: allUserSoftwares,
    loading : isLoading,
    error,
    type : 'Deposits'
  }

  return (
    <div>
      <main className="app-py-1" style={{ height: '100vh' }}>
        <div className="fade-appear-done fade-enter-done">
        <div className="app-relative hero-mixed">
      <div className="overlay1" />
      <div className="fade-appear-done fade-enter-done" style={{ paddingBottom: '6rem', paddingTop: '2rem' }}>
        <h1 className="center app-relative white-text">Recent Software Purschased</h1>
      </div>
    </div>
          <section className="row" style={{padding : 20}}>
          <Button variant='contained' color='success'onClick={push} >
                Create Software
          </Button>
          <BasicTable  tableConfig={tableConfig}/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FundAccount;