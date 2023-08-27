import { useEffect, useState } from "react";
import styles from "./table-x.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
library.add(faCaretUp, faCaretDown);
const ShowEntries = ({
  entriesList,
  clickEntryHandler
}) => {
  return /*#__PURE__*/_jsxs("section", {
    children: ["Show ", /*#__PURE__*/_jsx("select", {
      onChange: e => clickEntryHandler(e),
      children: entriesList && entriesList.map((entry, index) => /*#__PURE__*/_jsx("option", {
        value: entry.value,
        children: entry.name
      }, index))
    }), "  entries"]
  });
};
const SearchEngine = ({
  onInputChange
}) => {
  const inputHandler = e => {
    const val = e.target.value;
    if (val.length > 3) {
      onInputChange(val);
    } else {
      onInputChange("nope");
    }
  };
  return /*#__PURE__*/_jsxs("section", {
    children: [/*#__PURE__*/_jsx("span", {
      children: " Search : "
    }), /*#__PURE__*/_jsx("input", {
      onInput: e => inputHandler(e)
    })]
  });
};
const ColumnTitleX = ({
  columnObject,
  listHandler
}) => {
  return /*#__PURE__*/_jsxs("th", {
    className: styles.headerTableContainer,
    children: [columnObject.title, /*#__PURE__*/_jsxs("div", {
      className: styles.caretsContainer,
      children: [/*#__PURE__*/_jsx(FontAwesomeIcon, {
        icon: "fa-solid fa-caret-up",
        className: styles.icon,
        onClick: () => listHandler(columnObject.data, true)
      }), /*#__PURE__*/_jsx(FontAwesomeIcon, {
        icon: "fa-solid fa-caret-down",
        className: styles.icon,
        onClick: () => listHandler(columnObject.data, false)
      })]
    })]
  });
};
const ColumnTableX = ({
  columns,
  listHandler
}) => {
  return /*#__PURE__*/_jsx("tr", {
    className: styles.columnsContainer,
    children: columns.map((column, index) => /*#__PURE__*/_jsx(ColumnTitleX, {
      columnObject: column,
      listHandler: listHandler
    }, index))
  });
};
const RowDataTableX = ({
  rowData
}) => {
  const rowDataArray = Object.keys(rowData).map(function (key) {
    return rowData[key];
  });
  return /*#__PURE__*/_jsx("tr", {
    className: styles.dataTableContainer,
    children: rowDataArray.map((row, index) => /*#__PURE__*/_jsxs("td", {
      children: [" ", row]
    }, index))
  });
};
const RowTableX = ({
  data
}) => {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: data.map((row, index) => /*#__PURE__*/_jsx(RowDataTableX, {
      rowData: row
    }, index))
  });
};
const TableX = ({
  list,
  columns,
  userData
}) => {
  //variables de state local
  const [data, setData] = useState([]);
  const [updatedFilteredData, setUpdatedFilteredData] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    if (userData && userData.length > 0) {
      setData(userData);
    }
  }, [userData]);
  useEffect(() => {
    if (pages.length > 0) {
      let number = pageNumber - 1;
      let newData = pages[number].pageData;
      setUpdatedFilteredData([...newData]);
    }
  }, [pages, pageNumber]);

  //function filterData 
  const filterData = val => {
    const filteredData = [];
    if (val !== "nope") {
      if (updatedFilteredData.length === 0) {
        data.forEach(element => {
          Object.keys(element).forEach(v => {
            if (element[v].includes(val)) {
              if (filteredData.find(el => el === element)) {
                return;
              }
              filteredData.push(element);
              return;
            }
          });
        });
      } else {
        updatedFilteredData.forEach(element => {
          Object.keys(element).forEach(v => {
            if (element[v].includes(val)) {
              if (filteredData.find(el => el === element)) {
                return;
              }
              filteredData.push(element);
              return;
            }
          });
        });
      }
    }
    setUpdatedFilteredData([...filteredData]);
  };
  const listHandler = (modifierProp, isOrdered) => {
    setUpdatedFilteredData([]);
    if (isOrdered) {
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
  };

  //utilitary function
  function pageDataHandler(data, limitPerPage, pages, number = 1) {
    // si le nombre de données dépasse la limite sélectionnée 
    let dataPage = [];
    let newPageData = [];
    if (data.length > limitPerPage) {
      for (let i = 0; i < limitPerPage; i++) {
        dataPage.push(data[i]);
      }
      for (let y = limitPerPage; y < data.length; y++) {
        newPageData.push(data[y]);
      }
      pages.push({
        pageNumber: number,
        pageData: dataPage
      });
      return pageDataHandler(newPageData, limitPerPage, pages, ++number);
    } else {
      pages.push({
        pageNumber: number,
        pageData: data
      });
      return pages;
    }
  }
  const clickEntryHandler = e => {
    setPages(pageDataHandler(data, e.target.value, []));
  };
  const navigationButtonHandler = (e, direction) => {
    if (pages.length > 1 && direction === 'next') {
      let newPageNumber = pageNumber + 1;
      setPageNumber(newPageNumber);
      setUpdatedFilteredData(pages[--newPageNumber].pageData);
    }
    if (pages.length > 1 && direction === 'previous') {
      let newPageNumber = pageNumber - 1;
      setPageNumber(newPageNumber);
      setUpdatedFilteredData(pages[--newPageNumber].pageData);
    }
  };
  return /*#__PURE__*/_jsx(_Fragment, {
    children: list && columns && /*#__PURE__*/_jsxs("div", {
      className: styles.container,
      children: [/*#__PURE__*/_jsxs("div", {
        className: styles.topContainer,
        children: [/*#__PURE__*/_jsx(ShowEntries, {
          clickEntryHandler: clickEntryHandler,
          entriesList: list
        }), /*#__PURE__*/_jsx(SearchEngine, {
          onInputChange: filterData
        })]
      }), /*#__PURE__*/_jsxs("table", {
        className: styles.lowerContainer,
        children: [/*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsx(ColumnTableX, {
            columns: columns,
            listHandler: listHandler
          })
        }), data && data.length > 0 || updatedFilteredData.length > 0 ? /*#__PURE__*/_jsx("tbody", {
          className: styles.bodyTableContainer,
          children: /*#__PURE__*/_jsx(RowTableX, {
            data: updatedFilteredData.length ? updatedFilteredData : data
          })
        }) : /*#__PURE__*/_jsx("tbody", {
          className: styles.noDataContainer,
          children: /*#__PURE__*/_jsx("tr", {
            children: /*#__PURE__*/_jsx("td", {
              children: /*#__PURE__*/_jsx("p", {
                children: "No Data"
              })
            })
          })
        })]
      }), /*#__PURE__*/_jsxs("footer", {
        className: styles.containerFooter,
        children: [/*#__PURE__*/_jsxs("section", {
          className: styles.entriesInfoContainer,
          children: ["Showing ", updatedFilteredData.length && pageNumber === 1 ? 1 : 1, " to ", updatedFilteredData.length ? updatedFilteredData.length : data.length, "  of ", data.length, " entries"]
        }), /*#__PURE__*/_jsxs("section", {
          className: styles.pageNavigationContainer,
          children: [pageNumber > 1 && /*#__PURE__*/_jsx("button", {
            onClick: e => navigationButtonHandler(e, 'previous'),
            children: "Previous"
          }), pageNumber >= 1 && pageNumber < pages.length && /*#__PURE__*/_jsx("button", {
            onClick: e => navigationButtonHandler(e, 'next'),
            children: " Next"
          })]
        })]
      })]
    })
  });
};
export default TableX;