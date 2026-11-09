// Adiciona as permissões de câmera e microfone nos projetos Android e iOS
const fs = require('fs');
const a = 'android/app/src/main/AndroidManifest.xml';
if (fs.existsSync(a)) {
  let x = fs.readFileSync(a, 'utf8');
  if (!x.includes('RECORD_AUDIO')) {
    x = x.replace('</manifest>',
`    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
    <uses-feature android:name="android.hardware.camera" android:required="false"/>
</manifest>`);
    fs.writeFileSync(a, x);
  }
  console.log('Android: permissões ok');
}
const p = 'ios/App/App/Info.plist';
if (fs.existsSync(p)) {
  let x = fs.readFileSync(p, 'utf8');
  if (!x.includes('NSCameraUsageDescription')) {
    x = x.replace(/<\/dict>\s*<\/plist>/,
`  <key>NSCameraUsageDescription</key>
  <string>O app usa a câmera para tirar fotos e gravar vídeos.</string>
  <key>NSMicrophoneUsageDescription</key>
  <string>O app usa o microfone para gravar o áudio dos vídeos.</string>
  <key>NSPhotoLibraryUsageDescription</key>
  <string>O app acessa a galeria para organizar suas fotos e vídeos no álbum Câmera Cine.</string>
  <key>NSPhotoLibraryAddUsageDescription</key>
  <string>O app salva suas fotos e vídeos na galeria.</string>
</dict>
</plist>`);
    fs.writeFileSync(p, x);
  }
  console.log('iOS: permissões ok');
}
