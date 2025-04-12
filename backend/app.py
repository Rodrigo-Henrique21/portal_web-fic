import os
import json
import pandas as pd
from flask import Flask, request, redirect, url_for, session, send_from_directory, render_template_string

app = Flask(__name__)
app.secret_key = 'chave-secreta-flask'  # chave de sessão

# Caminhos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')
DB_PATH = os.path.join(BASE_DIR, '..', 'db', 'users.json')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)


def load_users():
    """Carrega o JSON com os usuários e retorna como dict."""
    with open(DB_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


@app.route('/')
def index():
    # Se não logado, redireciona para /login
    if 'user' not in session:
        return redirect(url_for('login'))
    # Se logado, mostra mensagem e link
    return f"""
    <h2>Bem-vindo, {session['user']}!</h2>
    <p>Sua role é: {session['role']}</p>
    <p><a href='/carga-horaria'>Ver Carga Horária</a></p>
    <p><a href='/calendario'>Ver Calendário</a></p>
    <p><a href='/logout'>Logout</a></p>
    """


############################
# Rota de LOGIN
############################
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return """
        <html>
        <body>
          <h1>Login</h1>
          <form action="/login" method="POST">
            <label for="username">Usuário:</label><br>
            <input type="text" id="username" name="username" required><br><br>
            
            <label for="password">Senha:</label><br>
            <input type="password" id="password" name="password" required><br><br>

            <button type="submit">Entrar</button>
          </form>
        </body>
        </html>
        """
    else:
        # POST: verifica credenciais
        username = request.form.get('username')
        password = request.form.get('password')

        users_data = load_users()

        if username in users_data:
            stored_pass = users_data[username]['password']
            role = users_data[username]['role']
            if password == stored_pass:
                # Autenticou com sucesso
                session['user'] = username
                session['role'] = role
                return redirect(url_for('index'))

        # Se chegou aqui, falhou login
        return "Credenciais inválidas! <a href='/login'>Tentar novamente</a>"


############################
# Rota de LOGOUT
############################
@app.route('/logout')
def logout():
    session.clear()
    return "Logout efetuado! <a href='/login'>Login</a>"


############################
# Rota Protegida
############################
@app.route('/carga-horaria')
def carga_horaria():
    if 'user' not in session:
        return "Acesso negado! Faça login primeiro.", 403

    # Checa se existe 'carga_horaria.xlsx' em uploads
    excel_path = os.path.join(UPLOAD_DIR, 'carga_horaria.xlsx')
    table_html = ""

    if os.path.exists(excel_path):
        df = pd.read_excel(excel_path)
        table_html = df.to_html(index=False, classes="table table-bordered")

    # Se for admin, mostra formulário de upload
    is_admin = (session.get('role') == 'admin')

    return render_template_string("""
    <h1>Carga Horária</h1>
    {% if table_html %}
        <div>{{ table_html|safe }}</div>
    {% else %}
        <p>Nenhum arquivo disponível.</p>
    {% endif %}

    {% if is_admin %}
    <hr>
    <h2>Enviar nova planilha (ADMIN)</h2>
    <form action="/upload-excel" method="POST" enctype="multipart/form-data">
      <input type="file" name="arquivo" accept=".xlsx" required>
      <button type="submit">Enviar</button>
    </form>
    {% else %}
    <p><em>Você não tem permissão para fazer upload.</em></p>
    {% endif %}
    """, table_html=table_html, is_admin=is_admin)


############################
# Rota de Upload Excel
############################
@app.route('/upload-excel', methods=['POST'])
def upload_excel():
    if 'user' not in session or session.get('role') != 'admin':
        return "Acesso negado! Somente admin pode fazer upload.", 403

    file = request.files.get('arquivo')
    if not file or file.filename == '':
        return "Nenhum arquivo enviado!", 400

    save_path = os.path.join(UPLOAD_DIR, 'carga_horaria.xlsx')
    file.save(save_path)

    return redirect(url_for('carga_horaria'))


############################
# Rota de Calendário
############################
@app.route('/calendario')
def calendario():
    if 'user' not in session:
        return "Acesso negado! Faça login primeiro.", 403
    return """
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Calendário SENAI</title>
      <link rel="stylesheet" href="/calendar/jquery.bootstrap.year.calendar.css" />
      <script src="/js/jquery.min.js"></script>
      <script src="/calendar/jquery.bootstrap.year.calendar.js"></script>
    </head>
    <body>
      <h1>Calendário Completo</h1>
      <div class="calendar"></div>
      <script>
        $(function(){
          $('.calendar').calendar({
              l10n: {
                jan: "Janeiro", feb: "Fevereiro", mar: "Março", apr: "Abril",
                may: "Maio", jun: "Junho", jul: "Julho", aug: "Agosto",
                sep: "Setembro", oct: "Outubro", nov: "Novembro", dec: "Dezembro",
                mn: "S", tu: "T", we: 'Q', th: 'Q', fr: 'S', sa: 'S', su: 'D'
              }
          });
        });
      </script>
    </body>
    </html>
    """


############################
# Rotas para servir CSS/JS/IMG de "frontend"
############################
@app.route('/calendar/<path:filename>')
def serve_calendar(filename):
    # Servindo arquivos de /frontend/js para calendário, ajuste se necessário
    return send_from_directory(os.path.join(FRONTEND_DIR, 'js'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'js'), filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'css'), filename)

@app.route('/img/<path:filename>')
def serve_img(filename):
    return send_from_directory(os.path.join(FRONTEND_DIR, 'img'), filename)


if __name__ == '__main__':
    app.run(debug=True)
