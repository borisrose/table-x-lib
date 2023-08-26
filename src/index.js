import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import TableX from './lib/table-x';
import { faker, fakerEN_US } from '@faker-js/faker';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const Test = () => {

    const [ data, setData ] = useState([])

    const list = [
        {
            value: 25,
            name : "25"
        },
        {
            value : 50,
            name : "50"
        },
        {
            value : 100,
            name : "100"
        }
    ]

   // en dur
    const columns= [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName'},
        { title: 'Start Date', data: 'startDate' },
        { title: 'Department', data: 'department' },
        { title: 'Date of Birth', data: 'dateOfBirth'},
        { title: 'Street', data: 'street'},
        { title: 'City', data: 'city'},
        { title: 'State', data: 'state'},
        { title: 'Zip Code', data: 'zipCode'},
    ]

   let fakeData = []

    useEffect(() => {
        for(let i = 0; i < 30; i++){
            fakeData.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName('female'),
                startDate : faker.date.past({ years: 10 }).toString(),
                department: faker.commerce.department(),
                dateOfBirth: faker.date.past({ years: 40 }).toString(),
                street: fakerEN_US.location.street(),
                city: fakerEN_US.location.city(),
                state: fakerEN_US.location.state(),
                zipCode: fakerEN_US.location.zipCode()
            })
        }
        setData([...fakeData])
    }, [])
   

    return(
        <>
            { (data && data.length > 0) && <TableX list={list} columns={columns} userData={data} />}
        </>      
    )

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test /> 
  </React.StrictMode>
);

