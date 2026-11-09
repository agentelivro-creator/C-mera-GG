#!/usr/bin/env bash
# Ajusta o projeto Android gerado pelo Capacitor: permissões e ícone do app.
set -euo pipefail

MANIFEST="android/app/src/main/AndroidManifest.xml"
RES="android/app/src/main/res"

# --- Permissões (câmera, microfone, galeria) ---
PERMS='
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />
    <uses-feature android:name="android.hardware.microphone" android:required="false" />'

if ! grep -q "android.permission.CAMERA" "$MANIFEST"; then
  # insere logo antes de </manifest>
  python3 - "$MANIFEST" "$PERMS" <<'PY'
import sys
path, perms = sys.argv[1], sys.argv[2]
s = open(path, encoding="utf-8").read()
s = s.replace("</manifest>", perms + "\n</manifest>")
open(path, "w", encoding="utf-8").write(s)
PY
fi

# --- Ícone do app (usa assets/icon-512.png) ---
ICON="www/assets/icon-512.png"
rm -rf "$RES"/mipmap-anydpi-v26
for pair in mdpi:48 hdpi:72 xhdpi:96 xxhdpi:144 xxxhdpi:192; do
  d="${pair%%:*}"; px="${pair##*:}"
  mkdir -p "$RES/mipmap-$d"
  convert "$ICON" -resize "${px}x${px}" "$RES/mipmap-$d/ic_launcher.png"
  cp "$RES/mipmap-$d/ic_launcher.png" "$RES/mipmap-$d/ic_launcher_round.png"
  cp "$RES/mipmap-$d/ic_launcher.png" "$RES/mipmap-$d/ic_launcher_foreground.png"
done

echo "Projeto Android ajustado."
