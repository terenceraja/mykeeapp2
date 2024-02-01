import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import "./Ptf.css";

const Ptf = () => {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState([
    { field: "make", flex: 1 },
    { field: "model", flex: 1 },
    { field: "price", flex: 1 },
    { field: "electric", flex: 1, hide: window.innerWidth < 1000 }, // Initially hide based on screen width
  ]);

  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (gridApi) {
        const column = gridApi.getColumnDef("electric");
        if (column) {
          const newColDefs = colDefs.map((col) => {
            if (col.field === "electric") {
              return { ...col, hide: screenWidth < 1000 };
            }
            return col;
          });

          gridApi.setColumnDefs(newColDefs);
          gridApi.sizeColumnsToFit();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [colDefs, gridApi]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="outlet">
      <section>
        <Card title="VOS PORTEFEUILLES">
          <div
            className="ag-theme-quartz"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              rowData={rowData}
              columnDefs={colDefs}
              domLayout="autoHeight"
              defaultColDef={{
                flex: 1,
                minWidth: 100,
              }}
            />
          </div>
        </Card>
        <section className="charts_container">
          <Card title="CLASSES D'ACTIF"></Card>
          <Card title="DEVISES"></Card>
        </section>
        <Card title="OPERATIONS"></Card>
      </section>
      <Footer />
    </div>
  );
};

export default Ptf;
