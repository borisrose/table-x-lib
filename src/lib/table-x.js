import { useEffect, useState } from "react"
import styles from "./table-x.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretUp, faCaretDown);


const ShowEntries = ({ entriesList, clickEntryHandler }) => {

    return(

        <section>
           Show <select onChange={(e) => clickEntryHandler(e)}> 

            { entriesList && entriesList.map((entry, index) => <option value={entry.value} key={index}>{entry.name}</option>)}
            
            </select>  entries
        </section>
    )

}

const SearchEngine = ({onInputChange}) => {

    const inputHandler = (e) => {

        const val = e.target.value;
        
        if(val.length > 3){

            onInputChange(val)

        } else { 
            onInputChange("nope")
        }

    }
    

    return(
        <section>
            <span> Search : </span>
            <input onInput={(e) => inputHandler(e)}/>
        </section>
    )


}

const ColumnTitleX = ({columnObject, listHandler}) => {

    return(
        <th className={styles.headerTableContainer}>
            {columnObject.title} 
            <div className={styles.caretsContainer}>
                <FontAwesomeIcon icon="fa-solid fa-caret-up"  className={styles.icon}  onClick={() => listHandler(columnObject.data, true)}/>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" className={styles.icon}  onClick={() => listHandler(columnObject.data, false)} />    
            </div>
        </th>
    )


}

const ColumnTableX = ({columns, listHandler}) => {


    
    return(
        <tr className={styles.columnsContainer}>
            {columns.map((column, index)  => <ColumnTitleX  columnObject={column} listHandler={listHandler} key={index}/>)}
        </tr>
    )


}

const RowDataTableX = ({rowData}) => {

    const rowDataArray = Object.keys(rowData).map( function(key) {
        return rowData[key];
    })

    return(
        <tr className={styles.dataTableContainer}>
        {
          rowDataArray.map((row, index) => <td key={index}> {row}</td>)
        }
        </tr>
    )
}

const RowTableX = ({data}) => {
    return (
        <>
           {data.map((row, index) =>  <RowDataTableX  rowData={row} key={index}/>)}
        </>
    )

}


const TableX = ({list, columns, userData}) => {

    //variables de state local
    const [ data, setData  ] = useState([])
    const [updatedFilteredData, setUpdatedFilteredData] = useState([])
    const [pages, setPages] = useState([])
    const [pageNumber, setPageNumber] = useState(1)


    useEffect(() => {
        if(userData && userData.length > 0){
            setData(userData)
        }
    }, [userData])

    useEffect(() => {
        if(pages.length > 0){
            let number = pageNumber - 1
            let newData = pages[number].pageData
            setUpdatedFilteredData([...newData])
        } 
    }, [pages, pageNumber])

    //function filterData 
    const filterData = (val) => {
        const filteredData = []
        if(val !== "nope"){
            if(updatedFilteredData.length === 0){
                data.forEach(element => {
                    Object.keys(element).forEach((v) => {
                         if(element[v].includes(val)){
                             if(filteredData.find(el => el === element)){
                                return
                             }
                             filteredData.push(element)
                             return
                         }  
                    })
                 })
            }
            else {
                updatedFilteredData.forEach(element => {
                    Object.keys(element).forEach((v) => {
                         if(element[v].includes(val)){
                             if(filteredData.find(el => el === element)){
                                 return
                             }
                             filteredData.push(element)
                             return
                         }  
                    })
                 })
            }
        }
        setUpdatedFilteredData([...filteredData])      
    }

    const listHandler = (modifierProp, isOrdered) => {
        setUpdatedFilteredData([])   
        if(isOrdered){
            let newData = updatedFilteredData.length ? updatedFilteredData : data;
            let updatedData = newData.sort((a, b) => {
                if (a[modifierProp] < b[modifierProp]) {
                  return -1;
                }
                if (a[modifierProp] > b[modifierProp]) {
                  return 1;
                }
                return 0;
            });
            setUpdatedFilteredData([...updatedData]);
        } else {
            let newData = updatedFilteredData.length ? updatedFilteredData : data;
            let updatedData = newData.sort((a, b) => {
                if (a[modifierProp] > b[modifierProp]) {
                  return -1;
                }
                if (a[modifierProp] < b[modifierProp]) {
                  return 1;
                }
                return 0;
            });
            setUpdatedFilteredData([...updatedData]);
        }
    }

    //utilitary function
    function pageDataHandler(data, limitPerPage, pages, number = 1){
        // si le nombre de données dépasse la limite sélectionnée 
        let dataPage = []
        let newPageData = []
        if(data.length > limitPerPage){
            for(let i = 0; i < limitPerPage; i++){
                dataPage.push(data[i])
            }
            for(let y = limitPerPage; y < data.length; y++){
                newPageData.push(data[y])
            }
            pages.push({
                pageNumber: number,
                pageData : dataPage
            })
            return pageDataHandler(newPageData, limitPerPage, pages, ++number)
        }
        else {
            pages.push({
                pageNumber: number,
                pageData: data
            })
            return pages
        }
    }


    const clickEntryHandler =  (e) => {
        setPages(pageDataHandler(data, e.target.value, []))
    }

    const navigationButtonHandler = (e, direction) => {


        if(pages.length > 1 && direction === 'next'){
            let newPageNumber = pageNumber + 1
            setPageNumber(newPageNumber)
            setUpdatedFilteredData(pages[--newPageNumber].pageData)
        }

        if(pages.length > 1 && direction === 'previous'){
            let newPageNumber = pageNumber - 1
            setPageNumber(newPageNumber)
            setUpdatedFilteredData(pages[--newPageNumber].pageData)
        }

    }



    return(
        <>
        { (list && columns) && <div className={styles.container}>
            <div className={styles.topContainer}>
                <ShowEntries  clickEntryHandler={clickEntryHandler} entriesList={list} />
                <SearchEngine onInputChange={filterData} />
            </div>
            <table className={styles.lowerContainer}>
                <thead>
                    <ColumnTableX columns={columns} listHandler={listHandler}/>
                </thead>
                { ((data && data.length > 0) || updatedFilteredData.length > 0) ? <tbody className={styles.bodyTableContainer}>
                    <RowTableX data={updatedFilteredData.length ? updatedFilteredData : data}/>
                </tbody> : <tbody className={styles.noDataContainer}><tr><td><p>No Data</p></td></tr></tbody> }
            </table>
            <footer  className={styles.containerFooter}>

                <section className={styles.entriesInfoContainer}>
                    Showing {updatedFilteredData.length && pageNumber === 1 ? 1 : 1 } to {updatedFilteredData.length ? updatedFilteredData.length : data.length}  of {data.length} entries
                </section>
                <section className={styles.pageNavigationContainer}>
                    {pageNumber > 1 &&  <button onClick={(e) => navigationButtonHandler(e, 'previous')}>Previous</button>}
                    {pageNumber >= 1 && pageNumber < pages.length  && <button onClick={(e) => navigationButtonHandler(e, 'next')}> Next</button>}
                </section>     

            </footer>
         
        </div>}
        </>
    )


    
}






export default TableX