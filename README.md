# 🚀 Portal de Centralização de Sistemas - SENAI

Este projeto é um **portal desenvolvido para centralizar diversos sistemas utilizados pelo SENAI**, com foco na **educação continuada**. Seu principal objetivo é resolver a fragmentação dos sistemas atuais, proporcionando uma **solução única e integrada** que facilita as rotinas administrativas dos instrutores.

---

## 🌟 Funcionalidades

- **Centralização de sistemas**  
  Integra plataformas como **Intranet**, **Diário de Classe**, **Carga Horária**, entre outros. 📚

- **Gestão administrativa simplificada**  
  Torna os processos administrativos mais acessíveis e intuitivos para os instrutores. 🧑‍🏫

- **Integração de novos usuários**  
  Permite a **inclusão fácil e rápida** de novos usuários no sistema. 👥

---

## 🛠️ Tecnologias Utilizadas

- **Python** – Linguagem principal no back-end. 🐍  
- **Flask** – Framework leve e eficiente para desenvolvimento web. ⚙️  
- **HTML** – Estruturação das páginas do portal. 🌐  
- **CSS** – Estilização para uma interface visual agradável. 🎨

---

## 📁 Estrutura do Projeto

```
├── front/               # Arquivos de front-end
│   ├── index.html       # Página inicial
│   ├── portal.html
│   ├── login.html
│   ├── calendario.html           
│   └── css       # Arquivo de estilo
│        ├── portal.css
│        └── style.css 
├── back/                # Arquivos de back-end
│   └── app.py           # Arquivo principal de backend
├── requirements.txt     # Dependências do projeto
└── README.md            # Documentação
```
## Como Rodar o Projeto 🚗
Pré-requisitos 🔧
Certifique-se de ter o Python instalado em seu sistema. 🐍

## Instale as dependências do projeto com o seguinte comando:
```
pip install -r requirements.txt
Rodando o Servidor 🖥️
Navegue até a pasta onde o projeto está localizado.
Execute o arquivo app.py para iniciar o servidor:
python back/app.py
Acesse o portal em http://servidor:5000 pelo seu navegador. 🌍
```
---

## 🔄 Como Funciona

1. O **Flask** está configurado para servir as páginas HTML através de rotas definidas no `app.py`.
2. Ao iniciar o servidor (`python app.py`), o portal roda.
3. As páginas HTML são renderizadas dinamicamente com suporte de arquivos CSS para estilização.

---

## 🤝 Contribuindo

1. Faça um **fork** deste repositório 🍴  
2. Crie uma **branch** para sua funcionalidade  
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3.Faça suas alterações e faça o commit (git commit -am 'Adiciona nova funcionalidade'). 📝
4.Envie para o repositório remoto (git push origin feature/nome-da-feature). 🚀
5.Abra um pull request para revisão. 🔄

## Licença 📜
- Este projeto é licenciado sob a MIT License. 🛡️
