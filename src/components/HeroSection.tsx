import { AgGridReact } from "ag-grid-react";
import React, { useState, useEffect, useMemo } from "react";
import { CellClickedEvent } from "ag-grid-community";
import { useCharacterData } from "../hooks/useCharacterData";
import "../style/HeroSection.css";
import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

const HeroSection = () => {
  interface valueObject {
    name: string;
  }

  interface cellRendedererObject {
    value: valueObject;
  }

  const [pageNumber, setPageNumber] = useState(1);
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
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
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      sortable: true,
    }),
    []
  );

  const onSuccess = () => {
    // setRowData(data?.characters.results);
  };
  const onError = () => {};

  const { isLoading, data, isError, isFetching } = useCharacterData(
    onSuccess,
    onError,
    pageNumber
  );

  if (isError) {
    return <div>Error, please try again!</div>;
  }
  const cellClickedListener = (event: CellClickedEvent<any, any>) => {
    navigate("/character", { state: event.data });
  };

  return (
    <div>
      <div
        title="agGridContainer"
        className="ag-theme-alpine-dark cell-style"
        style={{ width: "80vw", height: "70vh" }}
      >
        <AgGridReact
          rowData={data?.characters.results}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          overlayNoRowsTemplate='<Loading style="margin: 7em"></div> <span class="ag-overlay-loading-center " style="font-size: 18px; z-index: 100000"> Loading Rows ...</span>'
          overlayLoadingTemplate='<Loading style="margin: 7em"></div> <span class="ag-overlay-loading-center " style="font-size: 18px; z-index: 100000"> Loading Rows ...</span>'
          onCellClicked={cellClickedListener}
          defaultColDef={defaultColDef}
        />
        <div className="button-container">
          <button
            className={
              data?.characters.info.prev ? "button-enabled" : "button-disabled"
            }
            disabled={!data?.characters.info.prev}
            onClick={() => setPageNumber((prevNumber) => prevNumber - 1)}
          >
            {isLoading ? <SpinnerCircular size="24" /> : "Previous"}
          </button>
          <h3>Page {pageNumber}</h3>
          <button
            className={
              data?.characters.info.next ? "button-enabled" : "button-disabled"
            }
            disabled={!data?.characters.info.next}
            onClick={() => setPageNumber((prevNumber) => prevNumber + 1)}
          >
            {isLoading ? <SpinnerCircular size="24" /> : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
