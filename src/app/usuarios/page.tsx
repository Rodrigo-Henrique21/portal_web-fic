"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem,
  Box
} from "@mui/material";
import { db, auth } from "@/lib/firebase-config";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", senha: "", role: "user" });

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.senha);
      const uid = cred.user.uid;

      await setDoc(doc(db, "users", uid), {
        nome: form.nome,
        email: form.email,
        role: form.role,
        createdAt: new Date().toISOString(),
      });

      setForm({ nome: "", email: "", senha: "", role: "user" });
      setOpen(false);
      fetchUsers();
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <div className="content px-4">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Usuários</h1>
                <Button variant="contained" onClick={() => setOpen(true)}>Novo Usuário</Button>
              </div>

              <table className="w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Nome</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => (
                    <tr key={user.id}>
                      <td className="border px-2 py-1">{user.nome}</td>
                      <td className="border px-2 py-1">{user.email}</td>
                      <td className="border px-2 py-1">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Novo Usuário</DialogTitle>
                <DialogContent>
                  <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                      label="Nome"
                      fullWidth
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <TextField
                      label="Senha"
                      type="password"
                      fullWidth
                      value={form.senha}
                      onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />
                    <TextField
                      label="Role"
                      select
                      fullWidth
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      <MenuItem value="user">Usuário</MenuItem>
                      <MenuItem value="admin">Administrador</MenuItem>
                    </TextField>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button variant="contained" onClick={handleSave}>Salvar</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
