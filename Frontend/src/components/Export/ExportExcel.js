import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import * as FileSaver from "file-saver";
import React from "react";
import * as XLSX from "xlsx";

export const ExportExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    /* autofit width colums */
    const jsonKeys = Object.keys(apiData[0]);
    let objectMaxLength = [];
    for (let i = 0; i < apiData.length; i++) {
      let value = apiData[i];
      for (let j = 0; j < jsonKeys.length; j++) {
        if (typeof value[jsonKeys[j]] == "number") {
          objectMaxLength[j] = 10;
        } else {
          const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;
          objectMaxLength[j] = objectMaxLength[j] >= l ? objectMaxLength[j] : l;
        }
      }
      let key = jsonKeys;
      for (let j = 0; j < key.length; j++) {
        objectMaxLength[j] =
          objectMaxLength[j] >= key[j].length
            ? objectMaxLength[j]
            : key[j].length;
      }
    }
    const wscols = objectMaxLength.map((w) => {
      return { width: w + 1 };
    });
    ws["!cols"] = wscols;

    /* handle export */
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      type="primary"
      style={{ backgroundColor: "#1dd1a1" }}
      icon={<FontAwesomeIcon icon={faFileExcel} />}
      onClick={(e) => exportToCSV(apiData, fileName)}
      className="flex justify-center items-center"
    >
      <span className="pl-2">Export</span>
    </Button>
  );
};
