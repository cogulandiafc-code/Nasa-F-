# NASA APOD Birthday Project Fé em Deus

Este projeto permite que você visualize a "Foto Astronômica do Dia" (APOD) da NASA referente à data do seu aniversário.

## 🚀 Como Iniciar o Projeto

### 1. Configuração do Backend (Python)

Abra o terminal na pasta `backend`:

```powershell
cd backend
```

#### Criar e Ativar o Ambiente Virtual:
```powershell
# Criar o ambiente
python -m venv venv

# Ativar o ambiente (Windows)
.\venv\Scripts\activate
```

#### Instalar Dependências:
```powershell
pip install -r requirements.txt
```

#### Configurar a Chave da API:
Certifique-se de que o arquivo `.env` na pasta `backend` contenha sua chave:
`NASA_API_KEY=SUA_CHAVE_AQUI` (sem espaços no '=').

#### Iniciar o Servidor:
```powershell
python app.py
```
O servidor estará rodando em `http://localhost:5000`.

---

### 2. Configuração do Frontend

Não é necessário instalar nada para o frontend.

#### Como Abrir:
1. Navegue até a pasta `frontend`.
2. Clique duas vezes no arquivo `index.html` ou arraste-o para o seu navegador.

---

## 🛠️ Tecnologias Utilizadas
- **Backend:** Python, Flask, Flask-CORS, Requests, Dotenv.
- **Frontend:** HTML5, CSS3 (Modern Glassmorphism), JavaScript Vanilla.
