#!/bin/bash
set -e

ICON_BASE="/opt/Amethyst/resources/icons"
HICOLOR="/usr/share/icons/hicolor"

# Install 16x16 icon
[ -f "$ICON_BASE/icon-16.png" ] && mkdir -p "$HICOLOR/16x16/apps" && cp "$ICON_BASE/icon-16.png" "$HICOLOR/16x16/apps/amethyst.png"

# Install 32x32 icon
[ -f "$ICON_BASE/icon-32.png" ] && mkdir -p "$HICOLOR/32x32/apps" && cp "$ICON_BASE/icon-32.png" "$HICOLOR/32x32/apps/amethyst.png"

# Install 48x48 icon
[ -f "$ICON_BASE/icon-48.png" ] && mkdir -p "$HICOLOR/48x48/apps" && cp "$ICON_BASE/icon-48.png" "$HICOLOR/48x48/apps/amethyst.png"

# Install 64x64 icon
[ -f "$ICON_BASE/icon-64.png" ] && mkdir -p "$HICOLOR/64x64/apps" && cp "$ICON_BASE/icon-64.png" "$HICOLOR/64x64/apps/amethyst.png"

# Install 128x128 icon
[ -f "$ICON_BASE/icon-128.png" ] && mkdir -p "$HICOLOR/128x128/apps" && cp "$ICON_BASE/icon-128.png" "$HICOLOR/128x128/apps/amethyst.png"

# Install 256x256 icon
[ -f "$ICON_BASE/icon-256.png" ] && mkdir -p "$HICOLOR/256x256/apps" && cp "$ICON_BASE/icon-256.png" "$HICOLOR/256x256/apps/amethyst.png"

# Install 512x512 icon
[ -f "$ICON_BASE/icon-512.png" ] && mkdir -p "$HICOLOR/512x512/apps" && cp "$ICON_BASE/icon-512.png" "$HICOLOR/512x512/apps/amethyst.png"

# Install 1024x1024 icon
[ -f "$ICON_BASE/icon-1024.png" ] && mkdir -p "$HICOLOR/1024x1024/apps" && cp "$ICON_BASE/icon-1024.png" "$HICOLOR/1024x1024/apps/amethyst.png"

# Update icon cache if available
if command -v update-icon-caches > /dev/null 2>&1; then
    update-icon-caches "$HICOLOR" 2>/dev/null || true
fi

APP_DIR="/opt/Amethyst"
SANDBOX="$APP_DIR/chrome-sandbox"

if [ -f "$SANDBOX" ]; then
  chown root:root "$SANDBOX"
  chmod 4755 "$SANDBOX"
fi

exit 0
