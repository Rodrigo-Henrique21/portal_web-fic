"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

export const SheetUpload = () => {
  const [dataBySheet, setDataBySheet] = useState<Record<string, any[]>>({});
  const [open, setOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const parsedData: Record<string, any[]> = {};
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        parsedData[sheetName] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      });

      setDataBySheet(parsedData);
      setOpen(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = async () => {
    for (const sheetName in dataBySheet) {
      await addDoc(collection(db, "carga-horaria"), {
        professor: sheetName,
        horarios: dataBySheet[sheetName],
      });
    }

    setOpen(false);
    alert("Carga horária salva com sucesso!");
  };

  return (
    <div className="my-4">
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Pré-visualização dos dados</DialogTitle>
        <DialogContent dividers>
          {Object.entries(dataBySheet).map(([sheet, rows]) => (
            <div key={sheet}>
              <h3><strong>{sheet}</strong></h3>
              <table className="w-full border my-2 text-xs">
                <thead>
                  <tr>
                    {Object.keys(rows[0] || {}).map((key) => (
                      <th key={key} className="border px-2 py-1">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val: any, i) => (
                        <td key={i} className="border px-2 py-1">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
