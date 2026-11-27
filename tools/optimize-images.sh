#!/usr/bin/env bash
# Tối ưu ảnh trước khi đưa lên web.
# Cách dùng:  bash tools/optimize-images.sh  ảnh_gốc.jpg  assets/img/members/ten.webp  [chiều_rộng]
#   - Thu nhỏ về chiều rộng tối đa (mặc định 1000px cho ảnh thành viên, dùng 1920 cho ảnh nhóm)
#   - Chuyển sang WebP chất lượng 80 (nhẹ hơn JPG ~30%, mọi trình duyệt hiện đại đều hỗ trợ)
#   - Xoá metadata (vị trí GPS, thông tin máy ảnh) để bảo vệ quyền riêng tư
# Cần cài ImageMagick:  Windows: winget install ImageMagick.ImageMagick | macOS: brew install imagemagick
set -euo pipefail
in="$1"; out="$2"; width="${3:-1000}"
magick "$in" -auto-orient -strip -resize "${width}x>" -quality 80 "$out" 2>/dev/null \
  || convert "$in" -auto-orient -strip -resize "${width}x>" -quality 80 "$out"
echo "$out: $(du -h "$out" | cut -f1)"
