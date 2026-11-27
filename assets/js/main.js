/* ==========================================================================
   Nhóm 7 — main script
   1. Render: vẽ footer, danh sách thành viên, trang cá nhân từ data.js
   2. Motion: hiệu ứng cuộn kiểu Readymag (GSAP + ScrollTrigger + Lenis)
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var SITE = window.SITE || { team: { contact: [] }, members: [] };

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return isNaN(d) ? esc(iso) : d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* A hand-drawn looking wave (the squiggly lines in the PPTX members slide) */
  function squigglePath(seed) {
    var d = "M2 20", x = 2, amp, i;
    for (i = 0; i < 6; i++) {
      amp = 6 + ((seed * 7 + i * 13) % 11);
      var dir = i % 2 ? 1 : -1;
      d += " Q" + (x + 50) + " " + (20 + dir * amp) + " " + (x + 100) + " 20";
      x += 100;
    }
    return d;
  }

  function badgeHTML(m, eager) {
    return (
      '<div class="badge" data-accent="' + esc(m.accent) + '">' +
        '<span class="badge__strap" aria-hidden="true"></span>' +
        '<span class="badge__clip" aria-hidden="true"></span>' +
        '<div class="badge__card">' +
          '<div class="badge__photo"><img src="' + esc(m.photo) + '" alt="Ảnh của ' + esc(m.name) + '" width="400" height="500"' +
            (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"></div>' +
          '<div class="badge__meta"><div><div class="badge__name">' + esc(m.name) + '</div>' +
          '<div class="badge__role">' + esc(m.role) + '</div></div>' +
          '<span class="badge__team">' + esc(SITE.team.name || "") + '</span></div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ------------------------------------------------------------------------
     1. Render
     ------------------------------------------------------------------------ */
  function renderFooter() {
    var el = document.querySelector("[data-contact]");
    if (!el) return;
    el.innerHTML = SITE.team.contact.map(function (c) {
      var ext = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : "";
      return '<li><a href="' + esc(c.href) + '"' + ext + '><span>' + esc(c.label) + '</span><b>' + esc(c.value) + '</b></a></li>';
    }).join("");
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  }

  function renderMembers() {
    var el = document.getElementById("members-list");
    if (!el) return;
    el.innerHTML = SITE.members.map(function (m, i) {
      return (
        '<a class="member-row" data-accent="' + esc(m.accent) + '" href="member.html?id=' + encodeURIComponent(m.id) + '">' +
          '<div class="badge-wrap">' + badgeHTML(m, false) + '</div>' +
          '<div class="member-row__text">' +
            '<span class="member-row__idx">' + pad(i + 1) + ' / ' + pad(SITE.members.length) + '</span>' +
            '<h2 class="member-row__name" data-split>' + esc(m.name) + '</h2>' +
            '<span class="member-row__role" data-reveal>' + esc(m.role) + '</span>' +
            '<svg class="squiggle" viewBox="0 0 604 40" preserveAspectRatio="none" aria-hidden="true"><path d="' + squigglePath(i + 1) + '"/></svg>' +
            '<p class="member-row__short" data-reveal>' + esc(m.short) + '</p>' +
            '<span class="member-row__more" data-reveal>Xem trang cá nhân ' + ARROW + '</span>' +
          '</div>' +
        '</a>'
      );
    }).join("");
  }

  function renderProfile() {
    var el = document.getElementById("profile");
    if (!el) return;
    var id = new URLSearchParams(location.search).get("id");
    var idx = -1;
    SITE.members.forEach(function (m, i) { if (m.id === id) idx = i; });
    if (idx < 0) idx = id ? -1 : 0;

    if (idx < 0) {
      el.innerHTML = '<div class="container"><a class="back-link" href="members.html">← Tất cả thành viên</a>' +
        '<h1 class="h2">Không tìm thấy thành viên này.</h1></div>';
      return;
    }
    var m = SITE.members[idx];
    var prev = SITE.members[(idx - 1 + SITE.members.length) % SITE.members.length];
    var next = SITE.members[(idx + 1) % SITE.members.length];
    document.title = m.name + " — " + (SITE.team.name || "");

    var facts = [["Vai trò", m.role], ["Ngày sinh", m.birthday], ["Tuổi", m.age], ["Chuyên ngành", m.major]]
      .filter(function (f) { return f[1] !== undefined && f[1] !== ""; })
      .map(function (f) { return '<div data-stagger><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join("");

    var blogs = (m.blogs || []).length
      ? m.blogs.map(function (b) {
          return '<a class="blog-card" data-stagger href="' + esc(b.href || "#") + '"><time datetime="' + esc(b.date) + '">' + formatDate(b.date) + '</time>' +
            '<h3>' + esc(b.title) + '</h3><p>' + esc(b.excerpt) + '</p></a>';
        }).join("")
      : '<p class="empty" data-reveal>Chưa có bài viết nào.</p>';

    el.setAttribute("data-accent", m.accent);
    el.innerHTML =
      '<div class="container">' +
        '<a class="back-link" href="members.html">← Tất cả thành viên</a>' +
        '<div class="profile__top">' +
          '<div class="badge-wrap" data-badge-drop>' + badgeHTML(m, true) + '</div>' +
          '<div class="profile__info">' +
            '<span class="eyebrow" style="color:var(--c)">Thành viên ' + pad(idx + 1) + '</span>' +
            '<h1 class="display" data-split>' + esc(m.name) + '</h1>' +
            '<dl class="facts" style="margin:0">' + facts + '</dl>' +
            '<p class="bio" data-reveal>' + esc(m.bio) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="divider" data-grow></div>' +
        '<div class="blog-head"><i aria-hidden="true"></i><h2 class="h2" data-split>Blog</h2></div>' +
        '<div class="blogs">' + blogs + '</div>' +
        '<nav class="next-member" aria-label="Thành viên khác">' +
          '<a href="member.html?id=' + encodeURIComponent(prev.id) + '">← ' + esc(prev.name) + '</a>' +
          '<a href="member.html?id=' + encodeURIComponent(next.id) + '">' + esc(next.name) + ' →</a>' +
        '</nav>' +
      '</div>';
  }

  /* Bài báo kiểu nhật báo cổ (nội dung: data.js → SITE.news) */
  function renderNews() {
    var el = document.getElementById("news-mount"), N = SITE.news;
    if (!el || !N) return;
    var PH = "Câu trả lời của nhóm sẽ được đăng ở đây.";
    function ans(t) { return esc(t || PH); }
    function photo(src, cap, oval) {
      return '<figure class="np-photo' + (oval ? " np-photo--oval" : "") + '" data-reveal="clip"><img src="' + esc(src) + '" alt="" width="400" height="500" loading="lazy" decoding="async">' +
        (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
    }
    function band(o) { return '<div class="np-band"><h3 class="np-h" data-split>' + esc(o.title) + '</h3><p class="np-deck">' + esc(o.deck) + "</p></div>"; }
    var s = N.story, v = N.interview, m = N.making;
    el.innerHTML =
      '<header class="np-mast">' +
        '<div class="np-meta"><span>' + esc(N.issue) + "</span><span>" + esc(N.date) + "</span><span>" + esc(N.price) + "</span></div>" +
        '<h2 class="np-title" id="news-title" data-split>' + esc(N.paper) + "</h2>" +
        '<div class="np-nav"><span>Hậu trường</span><span>Phỏng vấn</span><span>Làm phim</span></div>' +
        '<i class="np-stamp" aria-hidden="true">Số<br>đặc biệt</i>' +
      "</header>" +
      '<div class="np-grid">' +
        '<article class="np-lead"><h3 class="np-h" data-split>' + esc(s.title) + '</h3><p class="np-deck">' + esc(s.deck) + "</p>" +
          '<div class="np-cols">' + s.qa.map(function (x) { return '<div class="np-qa" data-stagger><h4 class="np-q">' + esc(x.q) + "</h4><p>" + ans(x.a) + "</p></div>"; }).join("") + "</div></article>" +
        '<aside class="np-side">' + photo(s.photo, s.caption) +
          '<a class="np-box" href="#san-pham" data-reveal><b>Tin nhanh</b><span>Xem bộ phim đầy đủ tại mục Sản phẩm</span></a></aside>' +
        '<article class="np-wide">' + band(v) +
          '<div class="np-people">' + v.people.map(function (p) { return '<div class="np-person">' + photo(p.photo, "", true) + "<div><b>" + esc(p.name) + "</b><span>" + esc(p.role) + "</span></div></div>"; }).join("") + "</div>" +
          "<div>" + v.qa.map(function (x) {
            return '<div class="np-row" data-stagger><h4 class="np-q">' + esc(x.q) + '</h4><div class="np-pair">' +
              v.people.map(function (p, i) { return "<p><em>" + esc(p.name) + "</em>" + ans((x.a || [])[i]) + "</p>"; }).join("") + "</div></div>";
          }).join("") + "</div></article>" +
        '<article class="np-wide">' + band(m) +
          '<div class="np-trio">' + m.items.map(function (it) {
            return '<div class="np-it" data-stagger><span class="np-by">' + esc(it.who) + (it.role ? " <i>· " + esc(it.role) + "</i>" : "") + '</span><h4 class="np-q np-q--lg">' + esc(it.q) + "</h4><p>" + ans(it.a) + "</p></div>";
          }).join("") + "</div></article>" +
      "</div>";
  }

  /* Header hides when scrolling down, comes back when scrolling up */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var lastY = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      header.classList.toggle("is-hidden", y > lastY && y > 200);
      lastY = y;
    }, { passive: true });
  }

  renderFooter();
  renderNews();
  renderMembers();
  renderProfile();
  initHeader();

  /* ------------------------------------------------------------------------
     2. Motion
     ------------------------------------------------------------------------ */
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  window.__motionReady = true;

  if (!gsap || !ScrollTrigger) { root.classList.remove("motion"); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(window.SplitText);

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll progress bar — direct mapping of scroll position, not decorative motion */
  var bar = document.querySelector(".scroll-progress span");
  if (bar) {
    gsap.to(bar, { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });
  }

  if (reduce) { root.classList.remove("motion"); return; }

  /* --- Smooth scrolling (Lenis) driven by GSAP's ticker --- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    // in-page anchors (#san-pham) scroll smoothly too
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -40 }); }
      });
    });
  }

  gsap.defaults({ ease: "expo.out", duration: 1.1 });

  /* --- Page transition curtain --- */
  var curtain = document.querySelector(".curtain");
  if (curtain) {
    var cameIn = false;
    try { cameIn = sessionStorage.getItem("curtain") === "1"; sessionStorage.removeItem("curtain"); } catch (e) {}
    if (cameIn) {
      gsap.set(curtain, { scaleY: 1, transformOrigin: "top" });
      gsap.to(curtain, { scaleY: 0, duration: 0.7, ease: "expo.inOut", delay: 0.05 });
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      try { sessionStorage.setItem("curtain", "1"); } catch (err) {}
      gsap.set(curtain, { transformOrigin: "bottom" });
      gsap.to(curtain, { scaleY: 1, duration: 0.55, ease: "expo.inOut", onComplete: function () { location.href = url.href; } });
    });
    // Back/forward cache: make sure the curtain is not left closed
    window.addEventListener("pageshow", function (e) { if (e.persisted) gsap.set(curtain, { scaleY: 0 }); });
  }

  /* --- Split headings into masked lines that slide up --- */
  function splitReveal(el, opts) {
    opts = opts || {};
    gsap.set(el, { autoAlpha: 1 });
    if (!window.SplitText) { gsap.from(el, { y: 40, autoAlpha: 0, scrollTrigger: opts.immediate ? null : { trigger: el, start: "top 88%" } }); return; }
    window.SplitText.create(el, {
      type: opts.chars ? "lines,chars" : "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: function (self) {
        // Mở rộng khung cắt của mỗi dòng (không đổi bố cục) để không cắt dấu tiếng Việt: dấu mũ/sắc trên chữ hoa, dấu nặng/đuôi g, y, p dưới chân chữ
        self.masks.forEach(function (m) { m.style.paddingBlock = ".3em"; m.style.marginBlock = "-.3em"; });
        return gsap.from(opts.chars ? self.chars : self.lines, {
          yPercent: 140,
          duration: opts.chars ? 1.2 : 1.1,
          stagger: opts.chars ? 0.045 : 0.09,
          delay: opts.delay || 0,
          scrollTrigger: opts.immediate ? null : { trigger: el, start: "top 88%", once: true },
        });
      },
    });
  }

  /* Wait for web fonts so lines are measured with the real font */
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(function () {
    var heroTitle = document.querySelector(".hero__title");

    document.querySelectorAll("[data-split]").forEach(function (el) {
      var inFirstScreen = el.getBoundingClientRect().top < window.innerHeight;
      splitReveal(el, {
        chars: el === heroTitle,
        immediate: inFirstScreen,
        delay: el === heroTitle ? 0.25 : inFirstScreen ? 0.15 : 0,
      });
    });

    /* Generic reveals */
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      var type = el.getAttribute("data-reveal");
      var from = { autoAlpha: 0, y: 36 };
      if (type === "clip") from = { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)", y: 0 };
      if (type === "fade") from = { autoAlpha: 0 };
      if (type === "scale") from = { autoAlpha: 0, scale: 0.92 };
      var inFirstScreen = el.getBoundingClientRect().top < window.innerHeight;
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(el, Object.assign(from, {
        duration: type === "clip" ? 1.4 : 1.1,
        delay: inFirstScreen ? 0.5 + (parseFloat(el.getAttribute("data-delay")) || 0) : 0,
        scrollTrigger: inFirstScreen ? null : { trigger: el, start: "top 90%", once: true },
      }));
    });

    /* Groups of children that come in one after another */
    var groups = new Map();
    document.querySelectorAll("[data-stagger]").forEach(function (el) {
      var p = el.parentElement;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p).push(el);
    });
    groups.forEach(function (items, parent) {
      gsap.from(items, {
        autoAlpha: 0, y: 48, stagger: 0.1,
        scrollTrigger: { trigger: parent, start: "top 88%", once: true },
      });
    });

    initNews(); // trước initHome để thứ tự ScrollTrigger đúng với thứ tự trang
    initHome();
    initMembers();
    initProfile();
    initDocs();
    ScrollTrigger.refresh();
  });

  /* --- NEWS: tờ báo "trải" xuống bàn theo nhịp cuộn, con dấu đóng xuống, ảnh trôi nhẹ trong khung --- */
  function initNews() {
    var sheet = document.querySelector(".np-sheet");
    if (!sheet) return;
    gsap.fromTo(sheet, { rotationX: 16, scale: 0.9, y: 80 }, { rotationX: 0, scale: 1, y: 0, ease: "none",
      scrollTrigger: { trigger: sheet, start: "top 100%", end: "top 40%", scrub: 0.6 } });
    gsap.from(".np-stamp", { scale: 2.6, rotation: 20, autoAlpha: 0, duration: 0.5, ease: "power4.in",
      scrollTrigger: { trigger: ".np-title", start: "top 80%", once: true } });
    gsap.utils.toArray(".np-photo img").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -8, scale: 1.2 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: img.parentNode, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* --- HOME --- */
  function initHome() {
    var hero = document.querySelector(".hero");
    if (hero) {
      var img = hero.querySelector(".hero__media img");
      gsap.fromTo(img, { scale: 1.25 }, { scale: 1.08, duration: 2.2, ease: "expo.out" });
      gsap.to(img, {
        yPercent: 14, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__inner", {
        yPercent: -18, autoAlpha: 0.2, ease: "none",
        scrollTrigger: { trigger: hero, start: "center center", end: "bottom top", scrub: true },
      });
    }

    /* Marquee: endless loop that speeds up with scroll velocity */
    var track = document.querySelector(".marquee__track");
    if (track) {
      track.innerHTML += track.innerHTML; // duplicate for seamless loop
      var loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        onUpdate: function (self) {
          var v = Math.min(Math.abs(self.getVelocity()) / 400, 5);
          gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
        },
      });
    }

    /* Statement: each word lights up as you scroll through it */
    var st = document.querySelector(".statement");
    if (st) {
      var words = st.textContent.trim().split(/\s+/);
      st.innerHTML = words.map(function (w) { return '<span class="w">' + esc(w) + "</span>"; }).join(" ");
      gsap.to(st.querySelectorAll(".w"), {
        opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: st, start: "top 80%", end: "bottom 45%", scrub: true },
      });
    }

    /* Journey: pinned horizontal scroll on desktop, simple reveals on mobile */
    var journey = document.querySelector(".journey");
    if (journey) {
      var mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", function () {
        var viewport = journey.querySelector(".journey__viewport");
        var jt = journey.querySelector(".journey__track");
        var distance = function () { return jt.scrollWidth - window.innerWidth; };
        var tween = gsap.to(jt, {
          x: function () { return -distance(); }, ease: "none",
          scrollTrigger: {
            trigger: viewport, start: "top top", end: function () { return "+=" + distance(); },
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
        gsap.to(".journey__line span", {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: viewport, start: "top top", end: function () { return "+=" + distance(); }, scrub: true },
        });
        jt.querySelectorAll(".chapter").forEach(function (ch) {
          // Chapters already on screen when the section arrives use a normal trigger;
          // the rest are triggered by the horizontal movement (containerAnimation).
          var visibleAtStart = ch.offsetLeft < window.innerWidth * 0.85;
          gsap.from(ch.querySelectorAll(".chapter__num, h3, p, .chapter__date"), {
            y: 60, autoAlpha: 0, stagger: 0.08, delay: visibleAtStart ? ch.offsetLeft / 4000 : 0,
            scrollTrigger: visibleAtStart
              ? { trigger: viewport, start: "top 70%", once: true }
              : { trigger: ch, containerAnimation: tween, start: "left 85%", once: true },
          });
        });
      });
      mm.add("(max-width: 899px)", function () {
        journey.querySelectorAll(".chapter").forEach(function (ch) {
          gsap.from(ch, { y: 60, autoAlpha: 0, scrollTrigger: { trigger: ch, start: "top 88%", once: true } });
        });
      });
    }

    /* Video duy nhất: khung mở ra như màn chiếu, ảnh thu nhỏ dần, tiêu đề trồi lên */
    var film = document.querySelector(".product--film");
    if (film) {
      var tl = gsap.timeline({ scrollTrigger: { trigger: film, start: "top 82%", once: true } });
      tl.from(film.querySelector(".product__media"), { clipPath: "inset(0% 50% 0% 50%)", duration: 1.4, ease: "expo.inOut" })
        .from(film.querySelector("img"), { scale: 1.3, duration: 1.6 }, 0)
        .from(film.querySelectorAll("h3, p"), { y: 40, autoAlpha: 0, stagger: 0.1 }, 0.7);
    }
  }

  /* --- MEMBERS: badges drop in on their lanyard and swing --- */
  function dropBadge(badge, trigger, immediate) {
    var tl = gsap.timeline(immediate ? { delay: 0.3 } : { scrollTrigger: { trigger: trigger, start: "top 82%", once: true } });
    tl.from(badge, { y: -80, autoAlpha: 0, duration: 0.7, ease: "power3.out" })
      .fromTo(badge, { rotation: -9 }, { rotation: 0, duration: 2.2, ease: "elastic.out(1, 0.28)" }, "-=0.55");
    return tl;
  }

  function initMembers() {
    document.querySelectorAll(".member-row").forEach(function (row) {
      dropBadge(row.querySelector(".badge"), row, false);
      var path = row.querySelector(".squiggle path");
      if (path) {
        var len = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: row, start: "top 80%", end: "center 45%", scrub: 0.6 },
        });
      }
    });
  }

  /* --- PROFILE --- */
  function initProfile() {
    var drop = document.querySelector("[data-badge-drop] .badge");
    if (drop) dropBadge(drop, drop, true);
    var grow = document.querySelector("[data-grow]");
    if (grow) gsap.from(grow, { scaleX: 0, duration: 1.4, scrollTrigger: { trigger: grow, start: "top 90%", once: true } });
  }

  /* --- DOCUMENTS: papers rise and settle --- */
  function initDocs() {
    var docs = document.querySelectorAll(".doc__paper");
    if (!docs.length) return;
    gsap.from(docs, {
      y: 120, rotation: function (i) { return [-6, 4, -3][i % 3]; }, autoAlpha: 0, stagger: 0.12, duration: 1.4,
      delay: 0.35,
    });
  }
})();
