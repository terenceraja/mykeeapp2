import "./DetPtf.css";
import React from "react";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";

// ULTILS FUNCTIONS
import {
  formatISO,
  PCTValCalc,
  PCTCalc,
  getUniqueLanguesWithSum,
  YTDTimes100,
  formatMarketValue,
  formatSpacingAndDecimalNumbers,
} from "../../utils/functions";

//REDUCERS
import { addActiveLignToStore } from "../../reducers/primaryKeys";

// HTTP REQUEST
import { fetchLign } from "../../utils/http";

const DetPtf = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [dataLignPtf, setDataLignPtf] = useState([]);
  const [dataBar, setDataBar] = useState({});
  const [error, setError] = useState("");

  const ptfInfos = useSelector((state) => state.keys.value.activePtf);
  console.log("totMV", ptfInfos.MktValAaiDevCLIAuc_lcn);

  console.log("ptfInfos", ptfInfos);
  const {
    IdCtraPtf,
    NumeroPtfDep_lmt,
    RaisonSociale_lmt,
    MktValAaiDevCLIAuc_lcn,
  } = ptfInfos;
  console.log("id", IdCtraPtf);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GET FETCHING EXAMPLE
  useEffect(() => {
    const fetchDataFromServer = async () => {
      setIsFetching(true);

      try {
        const responseLignPtf = await fetchLign({ IdCtraPtf });
        console.log(responseLignPtf);
        //CALCULATE +/- VALUE
        const dataWithPCTVal = PCTValCalc(responseLignPtf.data);
        console.log("new", dataWithPCTVal);
        //

        //CALCULATE %
        const dataWithPCT = PCTCalc(dataWithPCTVal, MktValAaiDevCLIAuc_lcn);
        console.log("new", dataWithPCTVal);
        //

        //DATE FORMAT
        const dataDateFormat = formatISO(dataWithPCT, "DateMaturite_lsd");
        console.log("date format", dataDateFormat);
        //

        //YTD * 100 CALC
        const finalData = YTDTimes100(dataDateFormat);
        console.log("aze", finalData);
        //

        //GET LABELS
        const labels = getUniqueLanguesWithSum(
          dataDateFormat,
          MktValAaiDevCLIAuc_lcn
        );
        setDataBar(labels);
        //

        setDataLignPtf(finalData);
      } catch (error) {
        setError({ message: error.message || "custom error message" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchDataFromServer(); // Call the renamed local function
  }, []);
  //

  const columnsLignPtf = [
    {
      field: "LangueNomLocalAlloc_lmt",
      headerName: "ALLOCATION",
      width: 100,
      hide: true,
    },
    {
      field: "SoldeCptaDateArrete_lsn",
      headerName: "QUANTITE",
      width: 120,
      cellStyle: { textAlign: "right" },
      valueFormatter: (params) =>
        formatSpacingAndDecimalNumbers(params.value, 5),
    },
    { field: "Libelle_lmt", headerName: "ASSET", width: 100, hide: true },
    { field: "CodeIsin_lst", headerName: "LIBELLE", flex: 1 },
    { field: "CurrISOCode_lxt", headerName: "DEV", width: 100, hide: true },
    { field: "PMA_lsn", headerName: "PMA", width: 100, hide: true },
    {
      field: "MktCOTDevLIGN_lsn",
      headerName: "MKTCOT",
      width: 100,
      hide: true,
    },
    { field: "Value", headerName: "VALUE", width: 100, hide: true },
    {
      field: "PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn",
      headerName: "YTD",
      width: 100,
      hide: true,
    },
    { field: "TauxBase_lmn", headerName: "TAUX", width: 100, hide: true },
    {
      field: "DateMaturite_lsd",
      headerName: "MATURITE",
      width: 100,
      hide: true,
    },
    {
      field: "MktCotYieldDevLIGNAff_lcn",
      headerName: "YIELD",
      width: 100,
      hide: true,
    },
    {
      field: "MVAaiJCptaDevPTF_lsn",
      headerName: "MVIAAIEUR",
      width: 100,
      hide: true,
    },
    { field: "PCT", headerName: "%", width: 100, hide: true },
    {
      field: "MVJCptaDevLIGN_lsn",
      headerName: "MVLIGNE",
      width: 100,
      hide: true,
    },
    { field: "MVJCptaDevPTF_lsn", headerName: "MVEUR", width: 100, hide: true },
    {
      field: "CpnCourusTotDevPTF_lsn",
      headerName: "CCEUR",
      width: 100,
      hide: true,
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };
  // AG GRID

  return (
    <div className="outlet">
      <section className="ptf_content">
        <Card title="CLASSES D'ACTIF"></Card>
        <Card
          title={`Market Value: ${formatSpacingAndDecimalNumbers(
            MktValAaiDevCLIAuc_lcn,
            2
          )} EUR`}
          // title={`Dépositaires: ${NumeroPtfDep_lmt} Numéro: ${RaisonSociale_lmt} Market Value: ${MktValAaiDevCLIAuc_lcn}`}
        >
          <div
            className="ag-theme-quartz"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              rowData={dataLignPtf}
              columnDefs={columnsLignPtf}
              pagination={true} // Enable pagination
              paginationPageSize={10} // Set the number of rows per page
              domLayout="autoHeight"
            />
          </div>
        </Card>
      </section>
      <Footer />
    </div>
  );
};

export default DetPtf;
