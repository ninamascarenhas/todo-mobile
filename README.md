
# 📱 To-Do Mobile App

Aplicativo de gerenciamento de tarefas desenvolvido para a disciplina de Desenvolvimento Mobile. Com ele, o usuário pode criar, editar, excluir e marcar tarefas como concluídas. O app funciona 100% offline, com armazenamento local via SQLite, e conta com tema claro/escuro automático e personalização de perfil.

## ✨ Funcionalidades

- Criar tarefas com título, data e ícone
- Marcar tarefas como concluídas
- Editar e excluir tarefas
- Saudação automática com base no horário
- Sugestões de clima via API
- Personalização de nome e foto de perfil (com galeria e câmera)
- Armazenamento local persistente com SQLite
- Tema claro/escuro automático
- Notificações locais

## 🛠️ Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- TypeScript
- Tailwind CSS via NativeWind
- SQLite (expo-sqlite)
- API de clima (OpenWeatherMap)
- Expo Notifications, ImagePicker e FileSystem
- expo-router

## 🚀 Como rodar o projeto localmente

> Requisitos:
> - Node.js instalado
> - Expo CLI instalado globalmente (`npm install -g expo-cli`)

1. Clone o repositório:
git clone https://github.com/ninamascarenhas/todo-mobile.git


2. Acesse a pasta do projeto:
cd todo-mobile

3. Instale as dependências:
npm install


4. Inicie o projeto:
npx expo start


5. Escaneie o QR code com o **Expo Go** no seu celular (Android/iOS) para abrir o app.

## 📦 Como instalar o APK (Android)

Se quiser instalar o app diretamente em um dispositivo Android:

1. Baixe o arquivo `app-release.apk` (incluído no pacote de entrega)
2. Transfira para seu celular (via cabo, e-mail ou Drive)
3. Clique no arquivo e permita a instalação de fontes externas

## 👩‍💻 Desenvolvido por

Nina Mascarenhas – Trabalho acadêmico para a disciplina de Desenvolvimento Mobile.

## 📄 Licença

Este projeto é apenas para fins educacionais.
