"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

export const SheetUpload = () => {
  const [dataBySheet, setDataBySheet] = useState<
    Record<string, Record<string, unknown>[]>
  >({});
  const [open, setOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const parsedData: Record<string, Record<string, unknown>[]> = {};
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
    <Box className="my-4">
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        hidden
      />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<UploadFileIcon />}
          sx={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            fontWeight: "bold",
            ":hover": { backgroundColor: "#115293" }
          }}
        >
          Enviar planilha de carga horária
        </Button>
      </label>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Pré-visualização dos dados</DialogTitle>
        <DialogContent dividers>
          {Object.entries(dataBySheet).map(([sheet, rows]) => (
            <Box key={sheet} my={2}>
              <Typography variant="h6" gutterBottom>{sheet}</Typography>
              <table className="w-full border text-sm">
                <thead>
                  <tr>
                    {Object.keys(rows[0] || {}).map((key) => (
                      <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="border px-2 py-1">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
