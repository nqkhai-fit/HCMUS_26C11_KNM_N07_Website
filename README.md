# Nhóm 7 — Website giới thiệu nhóm

Website tĩnh (HTML + CSS + JS, không cần build) giới thiệu Nhóm 7, dựng theo file layout
`ThachGiaHuy_NguyenPhuocTai_Layout_PB_2.pptx`, với hiệu ứng cuộn kiểu Readymag.

## Cấu trúc (theo "Sơ đồ web" trong PPTX)

| Trang | File | Nội dung |
|---|---|---|
| Nhóm (gốc) | `index.html` | Ảnh nhóm làm nền, thông tin nhóm (khung trong suốt), hành trình, **Sản phẩm** (1 video duy nhất + link YouTube dự phòng + hậu trường) |
| Thành viên | `members.html` | 7 thành viên xếp so le, khung kiểu thẻ đeo, bấm vào để xem trang cá nhân |
| Trang cá nhân | `member.html?id=...` | Ảnh, tên / tuổi / ngày sinh / vai trò, mô tả, Blog (nhiều bài) |
| Tài liệu | `docs.html` | Biên bản thành lập, Quy tắc, Kế hoạch → mở PDF gốc |

Thông tin liên hệ (SĐT, Zalo, email…) nằm ở footer màu teal trên mọi trang.

```
index.html, members.html, member.html, docs.html
assets/css/style.css      ← toàn bộ giao diện
assets/js/data.js         ← NỘI DUNG: liên hệ + 7 thành viên + blog  (sửa ở đây)
assets/js/main.js         ← vẽ trang từ data.js + hiệu ứng
assets/js/vendor/         ← GSAP 3.13 (ScrollTrigger, SplitText) + Lenis 1.3.4
assets/img/               ← ảnh (hiện là ảnh giả SVG)
docs/                     ← 3 file PDF (hiện là PDF giả)
tools/optimize-images.sh  ← script nén ảnh
```

## ⚠️ Nội dung đang là placeholder

PPTX chỉ là wireframe nên mọi nội dung chữ/ảnh đều là **tạm**. Tìm chữ `[PLACEHOLDER]` để thấy chỗ cần thay:

- `assets/js/data.js`: tên, vai trò, ngày sinh, tuổi, mô tả, blog của 7 thành viên; SĐT/Zalo/email/Facebook.
- `index.html`: đoạn giới thiệu nhóm, 4 chặng hành trình, 1 video sản phẩm, link YouTube, phần hậu trường.
- `assets/img/group.svg` (ảnh nhóm), `assets/img/members/avatar.svg`, `assets/img/products/video.svg`, `assets/img/logo.svg`.
- `docs/*.pdf`: thay bằng PDF thật (giữ nguyên tên file là xong).

## Thay ảnh thật (và tối ưu)

1. Nén ảnh: `bash tools/optimize-images.sh anh-goc.jpg assets/img/members/huy.webp` (ảnh nhóm: thêm `1920` ở cuối).
   Mục tiêu: ảnh thành viên < 150 KB, ảnh nhóm < 400 KB.
2. Sửa đường dẫn: `photo:` trong `data.js`, hoặc `src` trong `index.html`.

**Vì sao:** ảnh điện thoại thường 3–8 MB; trang có 8 ảnh như vậy sẽ tải rất chậm trên 4G.
WebP + thu nhỏ đúng kích thước hiển thị giảm 90%+ dung lượng mà mắt không thấy khác.

**Về video:** nên dùng video MP4/WebM ngắn thay cho GIF — nhẹ hơn khoảng 5–10 lần, nét hơn:
`<video src="assets/img/products/video.mp4" autoplay muted loop playsinline></video>` (có ví dụ trong comment ở `index.html`).

## Hiệu ứng — làm gì và vì sao

- **Lenis** làm mượt cuộn chuột; **GSAP ScrollTrigger** chạy hiệu ứng theo vị trí cuộn.
- Tiêu đề trượt lên từng dòng (SplitText + mask), ảnh nhóm phóng nhẹ/parallax, câu giới thiệu "sáng dần" theo từng chữ,
  phần Hành trình **kéo ngang** khi cuộn dọc (chỉ trên màn hình ≥ 900px; điện thoại thì xếp dọc),
  thẻ đeo thành viên "rơi" xuống và đung đưa, nét vẽ nguệch ngoạc tự vẽ ra, tài liệu bay lên, chuyển trang bằng màn che navy.
- Chỉ animate `transform` và `opacity` (GPU xử lý, không làm trình duyệt tính lại layout) → mượt 60fps.
- **Tôn trọng `prefers-reduced-motion`:** nếu người xem bật "giảm chuyển động" trong hệ điều hành, mọi hiệu ứng tắt, nội dung hiện ngay.
- Không có JS hoặc JS lỗi → sau tối đa 2.5 giây nội dung vẫn hiện (không bao giờ bị trang trắng).
- Thư viện được copy vào repo (không dùng CDN) để site không phụ thuộc server bên ngoài.

## Chạy thử trên máy

Mở terminal trong thư mục repo rồi chạy `python -m http.server 8000`, vào http://localhost:8000.
(Mở trực tiếp file `index.html` cũng được, nhưng dùng server giống GitHub Pages hơn.)

## Bật GitHub Pages

1. Merge nhánh này vào `main`.
2. Trên GitHub: **Settings → Pages**.
3. *Build and deployment* → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → **Save**.
4. Đợi 1–2 phút, web sẽ ở `https://thembulozs.github.io/Test/`.

File `.nojekyll` báo GitHub không xử lý site bằng Jekyll (phục vụ file nguyên trạng).

## Giấy phép thư viện

GSAP — miễn phí theo [GSAP Standard License](https://gsap.com/standard-license). Lenis — MIT.

## Bài báo "Nhật báo Hậu trường" (dưới poster nhóm)

3 bài kiểu báo cổ: **Hậu trường**, **Phỏng vấn diễn viên chính**, **Chuyện làm phim**. Câu hỏi lấy từ file ý tưởng; câu trả lời đang để trống.
- Điền nội dung: `assets/js/data.js` → `SITE.news` (ô `a: ""`; để trống thì hiện dòng tạm). Đổi ảnh: `photo:`.
- Giao diện: cuối `assets/css/style.css` (mục NEWS). Hiệu ứng: `initNews()` trong `main.js` (tờ báo trải xuống khi cuộn, dấu "Số đặc biệt" đóng xuống, ảnh trôi nhẹ).
