<p align="center">
  <img src="www/assets/cover.jpg" alt="Capa do Câmera Cine" width="280">
</p>

<h1 align="center">🎬 Câmera Cine</h1>

<p align="center">Fotos e vídeos com visual de cinema, direto no navegador. Sem instalar nada e sem servidor.</p>

## Recursos

- **Foto e vídeo** em alta resolução (até a máxima do sensor nas fotos; 4K nos vídeos).
- **Modo Cinema** com 11 looks (Cinema, Blockbuster, Noir, Anos 70, Faroeste, Matrix, Cyberpunk, Sci-Fi, Terror, Guerra e Sonho), com grão, vinheta e cores de filme.
- **Formatos de tela**: Cinemascope 2.39:1, 1.85:1, 16:9, IMAX 1.43:1, clássico 1.37:1 ou original.
- **Quadros por segundo**: 24, 30 ou 60 fps.
- **Áudio**: estéreo 48 kHz, escolha do microfone, medidor de nível e modos "Estúdio" e "Voz limpa".
- **Zoom**, troca de câmera frontal/traseira e flash de tela.
- **Galeria salva no aparelho**: fotos e vídeos ficam guardados (IndexedDB) e continuam lá ao reabrir.
- **Permissão pedida uma única vez**; nas próximas aberturas a câmera inicia direto.
- Pode ser **instalado como app** (PWA) e funciona offline.

## Gerar o APK pelo GitHub

O repositório já está pronto: o GitHub monta o projeto Android (via [Capacitor](https://capacitorjs.com/)) e compila o APK sozinho.

1. Envie todos os arquivos desta pasta para um repositório no GitHub (branch `main`), incluindo a pasta oculta `.github`.
2. Abra a aba **Actions**. O fluxo **Gerar APK** roda a cada envio; também dá para rodar à mão em **Run workflow**.
3. Quando terminar (uns 5 a 10 minutos), abra a execução e baixe **camera-cine-apk** em *Artifacts*. Dentro do zip está o `camera-cine.apk`.
4. Passe o APK para o celular, abra e permita "instalar apps desconhecidos" se o Android pedir.

Dica: ao criar uma tag (ex.: `git tag v1.0 && git push --tags`), o APK também é publicado na aba **Releases**, com link direto de download.

O APK gerado é de *debug* (assinado com chave de teste), serve para instalar no seu aparelho. Para publicar na Play Store seria preciso um APK/AAB assinado com sua própria chave.

## Publicar no GitHub Pages (versão web)

A câmera do navegador só funciona em **HTTPS**, e o GitHub Pages já fornece isso.

1. Crie um repositório no GitHub e envie todos os arquivos desta pasta. Em **Settings → Pages**, publique a partir de uma branch; como o site fica em `www/`, o endereço termina em `/www/` (ou copie o conteúdo de `www` para a raiz).
2. No repositório, vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e salve.
4. Aguarde um ou dois minutos. O endereço será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
5. Abra o endereço no celular e use **Adicionar à tela inicial** para instalar como app.

## Estrutura

```
.
├── www/                  # o app web
│   ├── index.html        # HTML, CSS e JavaScript em um arquivo
│   ├── manifest.webmanifest
│   ├── sw.js             # cache para uso offline
│   └── assets/           # capa e ícones
├── capacitor.config.json # configuração do app Android
├── package.json          # dependências do Capacitor
├── scripts/patch-android.sh   # permissões e ícone do Android
├── .github/workflows/build-apk.yml  # compila o APK no GitHub
└── README.md
```

## Observações

- Ao alterar qualquer arquivo e publicar de novo, aumente a versão em `www/sw.js` (`camera-cine-v1` → `v2`) para que os aparelhos recebam a atualização.
- As fotos e vídeos da versão web ficam no armazenamento interno do navegador. Use **Baixar** na galeria para guardar uma cópia no aparelho.
- O código também reconhece o ambiente nativo do [Capacitor](https://capacitorjs.com/) e, nele, salva direto na galeria do celular (álbum "Câmera Cine"). O projeto Android é gerado automaticamente pelo workflow (pasta `android/`, não versionada).
- A limitação de resolução do modo Cinema pode ser ajustada na constante `CAP` do `www/index.html`.
