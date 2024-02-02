import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import "./Ptf.css";

// REACT
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// AG GRID
import { AgGridReact } from "ag-grid-react";

// UTILS FUNCTIONS
import {
  formatISO,
  getUniqueLanguesWithSum,
  getUniqueDevWithSum,
  formatSpacingAndDecimalNumbers,
} from "../../utils/functions";

//REDUCERS
import {
  addIdCtraPtfToStore,
  addActivePtfToStore,
  addTotalMVToStore,
} from "../../reducers/primaryKeys";

// HTTP REQUEST
import { fetchPtf, fetchOpe, fetchLign } from "../../utils/http";

const Ptf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataPtf, setdataPtf] = useState([]);
  const [dataOpe, setdataOpe] = useState([]);
  const [dataClasses, setDataClasses] = useState({});
  const [dataDevises, setDataDevises] = useState({});
  const [error, setError] = useState("");
  const IdCtraCli = useSelector((state) => state.keys.value.IdCtraCli);
  console.log(dataPtf);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columnsPtf = [
    { field: "RaisonSociale_lmt", headerName: "DEPOSITAIRES", width: 120 },
    {
      field: "NumeroPtfDep_lmt",
      headerName: "NUMERO",
      width: 120,
    },
    {
      field: "NomLocalProfil_lmt",
      headerName: "PROFILE",
      flex: 1,
      hide: window.innerWidth < 1000,
    },
    {
      field: "MktValAaiDevCLIAuc_lcn",
      headerName: "MARKET VALUE",
      cellStyle: { textAlign: "right" },
      flex: 1,
      valueFormatter: (params) =>
        formatSpacingAndDecimalNumbers(params.value, 2),
    },
  ];

  const columnsOpe = [
    { field: "DateCptaOPE_lsd", headerName: "DATE", width: 100 },
    { field: "NomLocalTypOp_lmt", headerName: "OPERATION", width: 120 },
    { field: "Libelle_lmt", headerName: "ASSET", flex: 1 },
    {
      field: "CodeIsin_lst",
      headerName: "ISIN",
      flex: 1,
      hide: window.innerWidth < 1000,
    },
  ];

  // const [gridApi, setGridApi] = useState(null);
  // useEffect(() => {
  //   // AG GRID
  //   const handleResize = () => {
  //     const screenWidth = window.innerWidth;
  //     if (gridApi) {
  //       const column = gridApi.getColumnDef(NomLocalProfil_lmt);
  //       if (column) {
  //         const newColDefs = columnsOpe.map((col) => {
  //           if (col.field === "NomLocalProfil_lmt") {
  //             return { ...col, hide: screenWidth < 1000 };
  //           }
  //           return col;
  //         });

  //         gridApi.setColumnDefs(newColDefs);
  //         gridApi.sizeColumnsToFit();
  //       }
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [columnsPtf, gridApi]);

  // const onGridReady = (params) => {
  //   setGridApi(params.api);
  //   params.api.sizeColumnsToFit();
  // };
  // // AG GRID

  const onRowClicked = (params) => {
    // Access the data for the clicked row using params.data
    const activePtf = params.data;
    dispatch(addActivePtfToStore(activePtf));
    navigate("/layout/DetPtf");
  };

  // PREV
  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        //PORTFOLIOS
        const responsePtf = await fetchPtf({ IdCtraCli });
        const IdCtraPtf = responsePtf.data.map((obj) => {
          return obj.IdCtraPtf;
        });
        // console.log(IdCtraPtf);
        dispatch(addIdCtraPtfToStore(IdCtraPtf));
        dispatch(addTotalMVToStore(responsePtf.totMV));
        setdataPtf(responsePtf.data);

        console.log("Ptf IDs", IdCtraPtf);

        //OPERATIONS
        const responseOpe = await fetchOpe({ IdCtraPtf });
        console.log(responseOpe);
        const updateDataOpe = formatISO(responseOpe.data, "DateCptaOPE_lsd");
        setdataOpe(updateDataOpe);

        //LIGNES CLASSES FOR DOUGHNUT
        const responseLignPtf = await fetchLign({ IdCtraPtf });
        const labelsAndDataClasses = getUniqueLanguesWithSum(
          responseLignPtf.data,
          responsePtf.totMV
        );
        setDataClasses(labelsAndDataClasses);

        //LIGNES DEVISES FOR DOUGHNUT
        const labelsAndDataDevises = getUniqueDevWithSum(
          responseLignPtf.data,
          responsePtf.totMV
        );
        setDataDevises(labelsAndDataDevises);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchDataFromServer(); // Call the renamed local function
  }, []);
  //

  return (
    <div className="outlet">
      <section className="ptf_content">
        <Card title="VOS PORTEFEUILLES">
          <div
            className="ag-theme-quartz"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <AgGridReact
              // onGridReady={onGridReady}
              rowData={dataPtf}
              columnDefs={columnsPtf}
              domLayout="autoHeight"
              onRowClicked={onRowClicked} // Add this line for onRowClicked handler
            />
          </div>
        </Card>
        <section className="charts_container">
          <Card title="CLASSES D'ACTIF"></Card>
          <Card title="DEVISES"></Card>
        </section>
        <Card title="OPERATIONS">
          <div
            className="ag-theme-quartz"
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              // onGridReady={onGridReady}
              rowData={dataOpe}
              columnDefs={columnsOpe}
              domLayout="autoHeight"
            />
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default Ptf;
