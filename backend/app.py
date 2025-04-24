import os
import json
from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory, flash

# Caminhos do projeto
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')
STATIC_DIR = FRONTEND_DIR  # Mantém css/, js/, img/ dentro de frontend
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')
DB_FILE = os.path.join(BASE_DIR, '..', 'db', 'users.json')

# Inicializa app Flask
app = Flask(
    __name__,
    template_folder=FRONTEND_DIR,
    static_folder=STATIC_DIR
)
app.secret_key = 'chave_super_secreta'

# Função utilitária: carrega usuários
def load_users():
    with open(DB_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

# Página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        users = load_users()
        username = request.form['username']
        password = request.form['password']

        if username in users and users[username]['password'] == password:
            session['user'] = username
            session['role'] = users[username]['role']
            return redirect(url_for('portal'))

        flash('Usuário ou senha inválidos', 'danger')
        return redirect(url_for('login'))

    return render_template('login.html')

# Página principal protegida
@app.route('/')
@app.route('/portal')
def portal():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('portal.html', user=session['user'], role=session['role'])

# Calendário (exemplo extra)
@app.route('/calendario')
def calendario():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('calendario.html')

# Página index (pública ou inicial)
@app.route('/index')
def index():
    return render_template('index.html')

# Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# Uploads (se houver uso de arquivos enviados)
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_DIR, filename)

# Roda o servidor
if __name__ == '__main__':
    app.run(debug=True)
