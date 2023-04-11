import { AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useMemo } from "react";
import { CellClickedEvent } from "ag-grid-community";
import { useCharacterData } from "../hooks/useCharacterData";
import "../style/HeroSection.css"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  interface valueObject {
    name: string;
  }

  interface cellRendedererObject {
    value: valueObject;
  }

  const [pageNumber, setPageNumber] = useState(1);
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate()
  const [columnDefs, setColumnDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "status" },
    { field: "species" },
    {
      field: "origin",
      cellRenderer: (p: cellRendedererObject): string => p.value.name,
    },
  ]);

  const onSuccess = () => {
    setRowData(data?.data.data.characters.results);
  };
  const onError = () => {};

  const { isLoading, data, error, isError, isFetching, refetch } =
    useCharacterData(onSuccess, onError, pageNumber);

  if (data?.data.data.characters.results.length === 0) {
    setPageNumber((pageNumber) => pageNumber - 1);
  }

  if (!isLoading && !isFetching) {
    //setRowData(data?.data.data.characters.results) //!Why is this not working? Too many re-renders
  }

  console.log(data?.data.data.characters.results);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      sortable: true,
    }),
    []
  );

  const cellClickedListener = (event: CellClickedEvent<any, any>) => {

    navigate("/character",{state: event.data})
  };

  return (
    <div>
      <div
        className="ag-theme-alpine-dark cell-style"
        style={{ width: "1000px", height: "400px" }}
      >
        <AgGridReact
          rowData={data?.data.data.characters.results}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          overlayNoRowsTemplate="Loading..."
          onCellClicked={cellClickedListener}
          defaultColDef={defaultColDef}
        />
        <div className="button-container">
          <button
            onClick={() =>
              setPageNumber((pageNumber) =>
                pageNumber - 1 > 0 ? pageNumber - 1 : 1
              )
            }
          >
            Previous
          </button>
          <button onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
