# Câmera Cine — app de câmera cinematográfica (Android e iPhone)

Câmera com foto e vídeo na qualidade máxima do aparelho, áudio avançado e vários estilos de filme.
Este repositório gera o app automaticamente no GitHub, sem você precisar instalar nada no computador.

## Gerar o app Android (APK) pelo GitHub — sem instalar nada
São 6 arquivos. Cinco vão direto na raiz do repositório e um (`android.yml`) precisa de uma pasta especial.

1. Crie uma conta em github.com e clique em **New repository**. Dê um nome (por exemplo `camera-cine`) e clique em **Create repository**.
2. Na página do repositório, clique em **uploading an existing file** e envie estes 5 arquivos: `index.html`, `package.json`, `capacitor.config.json`, `configurar.js` e `README.md`. Clique em **Commit changes**.
3. Clique em **Add file → Create new file**. No campo do nome, digite exatamente `.github/workflows/android.yml` (ao digitar a barra `/`, o GitHub cria as pastas). Abra o arquivo `android.yml`, copie todo o conteúdo e cole na caixa grande. Clique em **Commit changes**.
4. Abra a aba **Actions**. O build começa sozinho (ou clique em **Gerar APK do Android → Run workflow**). Leva cerca de 5 a 10 minutos.
5. Quando ficar verde ✅, clique na execução e baixe **Camera-Cine-APK** na parte de baixo da página (Artifacts).
6. Extraia o zip baixado, envie o arquivo `Camera-Cine.apk` para o celular e instale. O Android vai pedir para permitir a instalação de apps de fontes desconhecidas.

**Dica:** para ter o APK sempre disponível em **Releases**, crie uma tag. Em **Releases → Create a new release**, digite `v1.0` como tag e publique.

Esse APK é de teste (assinado com a chave de depuração) e funciona para instalar no seu celular e de amigos.
Para publicar na Play Store, é preciso gerar o app assinado com a sua chave. O caminho é pelo Android Studio, descrito mais abaixo.

## iPhone
O iPhone só pode ser compilado em um Mac com Xcode e conta Apple Developer (paga). Veja a seção “Passo a passo — iPhone (Mac)” abaixo.

---

Este projeto usa o Capacitor para transformar a Câmera Cine em app de verdade.
O código do app fica em `index.html`.

## O que você precisa instalar no computador
- Node.js 18 ou mais novo (nodejs.org)
- Android: Android Studio
- iPhone: um Mac com Xcode e uma conta Apple Developer (o iPhone não pode ser compilado em Windows)

## Passo a passo — Android
1. Abra o terminal dentro desta pasta e rode: `npm install`
2. Rode: `npm run setup:android`
3. Rode: `npm run android` (abre o Android Studio)
4. No Android Studio, conecte o celular com depuração USB e clique em ▶ Run.
5. Para gerar o APK: menu Build → Build Bundle(s) / APK(s) → Build APK(s).
   Para publicar na Play Store, gere o AAB: Build → Generate Signed Bundle.

## Passo a passo — iPhone (Mac)
1. `npm install`
2. `npm run setup:ios`
3. `npm run ios` (abre o Xcode)
4. Em Signing & Capabilities, escolha o seu Team e clique em ▶ Run com o iPhone conectado.

## Para alterar o app depois
Edite `index.html` e rode `npm run sync` para copiar as mudanças para os projetos Android e iOS.

## Observações
- Na versão app, cada foto e cada vídeo é salvo automaticamente na galeria do celular, no álbum “Câmera Cine”. Na primeira vez, o celular pede permissão para acessar a galeria: toque em Permitir.
- O botão “Compartilhar” da galeria do app abre o menu do celular para enviar o arquivo por WhatsApp, e-mail etc.
- A resolução máxima e o formato do vídeo dependem do celular e do sistema (WebView/WebKit).
