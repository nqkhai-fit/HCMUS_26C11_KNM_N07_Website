/* ==========================================================================
   NỘI DUNG CỦA WEBSITE — sửa file này để thay thông tin thật.
   --------------------------------------------------------------------------
   Mọi chỗ có chữ  [PLACEHOLDER]  là nội dung đoán / giả, cần thay.
   Website đọc dữ liệu ở đây để vẽ: footer liên hệ, trang Thành viên,
   trang cá nhân (member.html?id=...).
   ========================================================================== */

window.SITE = {
  team: {
    name: "Nhóm 7",
    // [PLACEHOLDER] thông tin liên hệ — thay bằng số/link thật
    contact: [
      { label: "Điện thoại", value: "0900 000 000", href: "tel:0900000000" },
      { label: "Zalo", value: "zalo.me/0900000000", href: "https://zalo.me/0900000000" },
      { label: "Email", value: "nhom7@example.com", href: "mailto:nhom7@example.com" },
      { label: "Facebook", value: "fb.com/nhom7", href: "https://facebook.com/" },
    ],
  },

  /* 7 thành viên. `id` dùng trong link: member.html?id=thanh-vien-1
     photo: đường dẫn ảnh (khuyên dùng .webp, khoảng 800×1000px, < 150 KB).
     Màu `accent` chọn 1 trong: blue | teal | coral | purple | yellow        */
  members: [
    {
      id: "thanh-vien-1",
      name: "Thành viên 1", // [PLACEHOLDER]
      role: "Nhóm trưởng", // [PLACEHOLDER]
      birthday: "01/01/2008", // [PLACEHOLDER]
      age: 21, // [PLACEHOLDER]
      major: "Công nghệ thông tin", // [PLACEHOLDER]
      photo: "assets/img/members/avatar.svg",
      accent: "blue",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.", // [PLACEHOLDER]
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.", // [PLACEHOLDER]
      blogs: [
        { title: "Tuần 1 — Ngày đầu lập nhóm", date: "2026-09-10", excerpt: "Ghi lại buổi họp đầu tiên, phân vai và những ý tưởng ban đầu.", href: "#" }, // [PLACEHOLDER]
        { title: "Tuần 4 — Học quay dựng video", date: "2026-10-02", excerpt: "Những gì mình học được khi lần đầu cầm máy quay cho sản phẩm của nhóm.", href: "#" }, // [PLACEHOLDER]
      ],
    },
    {
      id: "thanh-vien-2",
      name: "Thành viên 2",
      role: "Thiết kế",
      birthday: "02/02/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "teal",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [
        { title: "Phác thảo bố cục website", date: "2026-09-20", excerpt: "Từ sơ đồ web đến wireframe cho từng trang.", href: "#" },
      ],
    },
    {
      id: "thanh-vien-3",
      name: "Thành viên 3",
      role: "Quay phim",
      birthday: "03/03/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "coral",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [
        { title: "Hậu trường buổi quay", date: "2026-10-12", excerpt: "Những cảnh quay hỏng và bài học rút ra.", href: "#" },
      ],
    },
    {
      id: "thanh-vien-4",
      name: "Thành viên 4",
      role: "Dựng phim",
      birthday: "04/04/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "yellow",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [],
    },
    {
      id: "thanh-vien-5",
      name: "Thành viên 5",
      role: "Kịch bản",
      birthday: "05/05/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "purple",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [],
    },
    {
      id: "thanh-vien-6",
      name: "Thành viên 6",
      role: "Lập trình web",
      birthday: "06/06/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "blue",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [],
    },
    {
      id: "thanh-vien-7",
      name: "Thành viên 7",
      role: "Truyền thông",
      birthday: "07/07/2005",
      age: 21,
      major: "Công nghệ thông tin",
      photo: "assets/img/members/avatar.svg",
      accent: "teal",
      short: "Giới thiệu sơ về thành viên — một hai câu về bạn ấy là ai và làm gì trong nhóm.",
      bio: "Miêu tả bản thân ngắn gọn: sở thích, điểm mạnh, điều bạn ấy muốn học được qua dự án này.",
      blogs: [],
    },
  ],
  /* BÀI BÁO (trang Nhóm, ngay dưới poster). Câu hỏi lấy từ "Ý tưởng nội dung website.docx".
     Điền câu trả lời vào `a`. Để "" thì web hiện dòng tạm "Câu trả lời của nhóm sẽ được đăng ở đây." */
  news: {
    paper: "Nhật báo Hậu trường", issue: "Số đặc biệt · Nhóm 7", date: "Tháng 11 · 2026", price: "Giá: một nụ cười", // [PLACEHOLDER]
    story: {
      title: "Phía sau ống kính", deck: "Câu chuyện hậu trường của bộ phim",
      photo: "assets/img/group.svg", caption: "Ảnh hậu trường", // [PLACEHOLDER] thay ảnh thật
      qa: [
        { q: "Có kỷ niệm đáng nhớ nào trong buổi quay phim không?", a: "" },
        { q: "Cảnh quay nào đã phải quay lại nhiều nhất, và vì sao?", a: "" },
        { q: "Có lúc nào phải sửa kịch bản ngay trên phim trường không? Chuyện gì đã xảy ra, vì sao mọi người thay đổi?", a: "" },
        { q: "Trong lúc thực hiện các cảnh quay, mọi người đã gặp những khó khăn gì?", a: "" },
      ],
    },
    interview: {
      title: "Gặp gỡ hai diễn viên chính", deck: "Bình và Huy kể về nhân vật của mình",
      people: [
        { name: "Bình", role: "Diễn viên chính", photo: "assets/img/members/avatar.svg" }, // [PLACEHOLDER] ảnh
        { name: "Huy", role: "Diễn viên chính", photo: "assets/img/members/avatar.svg" },
      ],
      qa: [ // a: [câu trả lời của Bình, câu trả lời của Huy]
        { q: "Khó khăn lớn nhất khi thực hiện vai diễn này là gì?", a: ["", ""] },
        { q: "Bạn có học được gì từ vai diễn không?", a: ["", ""] },
        { q: "Bạn thấy phần nào của bản thân trong vai diễn này? Ngoài đời bạn từng gặp trường hợp tương tự chưa?", a: ["", ""] },
        { q: "Theo bạn, điều thú vị trong tính cách nhân vật này là gì?", a: ["", ""] },
      ],
    },
    making: {
      title: "Chuyện làm phim", deck: "Ba người đứng sau bộ phim",
      items: [
        { who: "Huy", role: "người viết kịch bản", q: "Tại sao nhóm chọn kể câu chuyện này?", a: "" },
        { who: "Hồng Đào", role: "", q: "Tại sao mỗi nhân vật lại có những cảnh thoại riêng?", a: "" },
        { who: "Khải", role: "dựng phim", q: "Câu hỏi về quá trình dựng phim", a: "" }, // [PLACEHOLDER] đổi câu hỏi
      ],
    },
  },
};
