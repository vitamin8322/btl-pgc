import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useParams } from 'react-router-dom'
import Tab from '../components/Tab/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { getIdEmployee, resetEmployee } from '../redux/slice/employeeSlice';
import { AppDispatch, RootState } from '../redux/store';
import { mountDataDocument } from '../redux/slice/documentSlice';
import { mountDataContract } from '../redux/slice/contractSlice';

type Props = {}

const CreateOrUpdate = (props: Props) => {
  const { idEmployee } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { employee } = useSelector((state: RootState) => state.employee);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (idEmployee) {
  //       await dispatch(getIdEmployee(Number(idEmployee)));
  //       await dispatch(mountDataDocument(employee.documents));
  //       await dispatch(mountDataContract(employee.contracts));
  //     } else {
  //       await dispatch(resetEmployee());
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  return (
    <div>
      {/* {idEmployee ? <>Edit</> : <>Add</>}  */}
      <Tab />
    </div>
  )
}

export default CreateOrUpdate