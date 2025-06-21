"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

interface CargaHorariaRow {
  [key: string]: unknown;
}

interface CargaHorariaDoc {
  professor: string;
  horarios: CargaHorariaRow[];
}

export const TableCargaHoraria = () => {
  const [docs, setDocs] = useState<CargaHorariaDoc[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "carga-horaria"));
      const data: CargaHorariaDoc[] = snapshot.docs.map((doc) => ({
        professor: doc.data().professor,
        horarios: doc.data().horarios,
      }));
      setDocs(data);
    };

    fetchData();
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box className="my-8">
      <Typography variant="h5" gutterBottom>
        Visualização da Carga Horária
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Abas de Professores"
      >
        {docs.map((doc, idx) => (
          <Tab key={idx} label={doc.professor} />
        ))}
      </Tabs>

      <Box mt={2}>
        {docs[tabIndex] && (
          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(docs[tabIndex].horarios[0] || {}).map((col) => (
                    <TableCell key={col}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {docs[tabIndex].horarios.map((row, idx) => (
                  <TableRow key={idx}>
                    {Object.values(row).map((val, i) => (
                      <TableCell key={i}>{String(val)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
