# 💸 Controle de Gastos

Aplicativo mobile desenvolvido com **React Native + Expo** para gerenciamento de gastos pessoais.

O app permite cadastrar, visualizar e excluir despesas, utilizando armazenamento local e SQLite e uma interface moderna inspirada em aplicativos financeiros.

---

## 📱 Funcionalidades

* ✅ Cadastro de gastos
* ✅ Seleção de categoria (modal customizado)
* ✅ Seleção de data com calendário
* ✅ Listagem de despesas
* ✅ Exclusão de gastos
* ✅ Totalizador automático
* ✅ Interface moderna em **Dark Mode**

---

## 🛠️ Tecnologias Utilizadas

* React Native
* Expo
* JavaScript
* SQLite (banco de dados local)
* AsyncStorage
* react-native-calendars

---

## 📂 Estrutura do Projeto

```
src/
├── components/
│   └── ExpenseItem.js
│
├── screens/
│   ├── HomeScreen.js
│   └── AddExpenseScreen.js
│
├── database/
│   └── database.js    
│  
│   navigation/
│   └── routes.js
```

---

## 🚀 Como Executar o Projeto

### 🔧 Pré-requisitos

* Node.js (v18 ou superior)
* npm ou yarn
* Expo CLI

Instale o Expo CLI:

```bash
npm install -g expo-cli
```

---

### ▶️ Rodando o projeto

```bash
# Clone o repositórioo
git clone https://github.com/Arthuranjo/controle-de-gastos.git

# Acesse a pasta do projeto
cd controle-de-gastos

# Instale as dependências
npm install

# Inicie o projeto
npx expo start
```

---

### 📱 Executar no celular

1. Baixe o aplicativo **Expo Go**
2. Escaneie o QR Code exibido no terminal

---

### 💻 Executar no navegador (Web)

```bash
npx expo start --web
```

---

## 🎨 Interface

* Tema escuro (Dark Mode)
* Componentes customizados
* Uso de modais interativos
* Experiência inspirada em aplicativos de banco

---

## 📌 Melhorias Futuras

* 📊 Gráficos de gastos
* 🔐 Sistema de autenticação
* ☁️ Integração com banco de dados remoto
* 📅 Filtros por data
* 📈 Relatórios financeiros

---

## 👨‍💻 Autor

Desenvolvido por **Arthur dos Anjos**

🔗 GitHub: https://github.com/Arthuranjo

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
