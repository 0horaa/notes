<h1 align="center">
	<img alt="Logo do Notes" title="Logo do Notes" src="./assets/icon.png" width="120px" height="120px">
</h1>
<p align="center">
	<img src="./assets/print1.jpg" height="585px" width="270px">
    <img src="./assets/print2.jpg" height="585px" width="270px">
</p>
<p align="center">
    <img src="./assets/print3.jpg" height="585px" width="270px">
    <img src="./assets/print4.jpg" height="585px" width="270px">
</p>

<h1 align="center">Notes</h1>
<p align="center">Aplicativo mobile desenvolvido em React Native com Expo. Funciona como um bloco de notas tradicional, com a possibilidade de criar, visualizar, editar e deletar anotações. Além disso, possui uma aba de notas especiais que funcionam como post-its, para anotações mais curtas e objetivas.</p>
<h4>Projeto base finalizado 🚀</h4>
<hr>
<h3>Funcionalidades</h3>

- [x] Criação, visualização, edição e deleção de notas.
- [x] Criação, visualização, edição e deleção de post-its.
- [x] Filtrar anotações e post-its por "mais antigos" ou "mais recentes".
- [x] Escolha de cores de fundo para os post-its.
- [x] Armazenamento de dados no dispositivo do usuário com Async Storage.
- [x] Perguntar por criação de rascunhos ao clicar em voltar.
- [x] Perguntar se deseja salvar as alterações feitas em notas já existentes.
- [x] Configurações para ativar ou desativar as funções de rascunhos e de alterações feitas.


<h2 align="center">Teste a aplicação instalando-a na sua máquina</h2>
<p>Primeiramente, você vai precisar ter o Node e o NPM instalados na sua máquina (<a href="https://nodejs.org/en/download/">você pode baixá-los aqui</a>) , assim como o Yarn e o Expo. 

- Você pode instalar o <strong>yarn</strong> da seguinte forma: acesse o terminal do seu Sistema e execute o seguinte comando:

		npm install --global yarn
- Após isso você pode verificar se a instalação funcionou, executando
		
		yarn --version
	
- Você pode instalar o <strong>expo</strong> da seguinte forma: acesse o terminal do seu Sistema e execute o seguinte comando:
		
		npm install expo-cli --global

- Após isso você pode verificar se a instalação funcionou, executando

		expo --version


Obs: um erro comum na instalação dessas ferramentas <strong>no Windows</strong> está relacionado à políticas de segurança do Windows Powershell. Caso enfrente esse erro, você pode ver formas de resolvê-lo <a href="https://pt.stackoverflow.com/questions/220078/o-que-significa-o-erro-execu%C3%A7%C3%A3o-de-scripts-foi-desabilitada-neste-sistema">aqui</a> 

<p>Após isso, acesse o terminal do seu sistema operacional, navegue até a pasta em que você quer testar a aplicação e dê o seguinte comando:</p>
		
	expo init notes 

-  "notes" é o nome do seu projeto no expo. Espere alguns instantes e então aparecerão opções no terminal para escolha, essas são opções de template para o seu aplicativo. Escolha a opção que mostra  **blank (TypeScript)**
    
- Então, espere até que o seu projeto expo seja criado, e então copie os arquivos desse repositório para dentro da pasta criada pelo expo, permitindo que os arquivos do repositório sobrescrevam os arquivos originais.
    
- Logo você precisará utilizar um emulador ou um dispositivo físico para o teste do aplicativo, e então inicie o servidor do expo para conseguir rodar a aplicação, você pode fazer isso executando:

		expo start

	Aguarde enquanto o Expo abre uma janela no seu navegador que irá gerenciar a conexão entre sua máquina e o emulador/dispositivo físico.

- Caso esteja usando um dispositivo físico, baixe o app do Expo na loja de aplicativos do seu celular (Android ou IOS) e então use-o para scannear o código QR que aparece na janela aberta na sua máquina.
-   Caso esteja usando um emulador, abra-o e clique em  **Run on Android device/emulator.**

- O projeto apresenta uma variada gama de bibliotecas e dependências, as quais você pode instalar usando o terminal. Todas são necessárias para o pleno funcionamento do app. Acesse a linha de comando de seu S.O, navegue até a pasta do Notes e instale as seguintes ferramentas:

		expo install expo-font @expo-google-fonts/noto-sans
		expo install @expo-google-fonts/architects-daughter
		expo install expo-app-loading
		expo install expo-linear-gradient
		yarn add react-native-iphone-x-helper
		yarn add @react-navigation/native@5.9.4
		expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
		yarn add @react-navigation/stack@5.14.5
		expo install react-native-svg
		yarn add --dev react-native-svg-transformer
		expo install @react-native-async-storage/async-storage
		yarn add react-native-uuid

- Após todo o processo de instalação, você pode executar o projeto via servidor do expo, utilizando o seguinte comando:

		expo start

	Agora, apenas aguarde enquanto o Expo abre a janela da aplicação para que você possa vê-la funcionando. 
	-   Caso esteja usando um dispositivo físico, baixe o app do Expo na loja de aplicativos do seu celular (Android ou IOS) e então use-o para scannear o código QR que aparece na janela aberta na sua máquina.
	-   Caso esteja usando um emulador, abra-o e clique em  **Run on Android device/emulator.**
	
<h2>🛠 Tecnologias</h2>

As ferramentas utilizadas para o desenvolvimento da aplicação foram:

- React Native com Expo
- TypeScript

### Autor
---

<a href="https://github.com/0horaa">
 <img style="border-radius: 50px" src="https://github.com/0horaa.png" width="110px;" height="100px" alt=""/>
 <br />
 <sub><b>Sérgio Gabriel</b></sub></a> 🚀<br>
<a href="https://twitter.com/0hora_">Twitter</a><br>