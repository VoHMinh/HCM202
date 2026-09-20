# PHẦN 5 (BẢN NÂNG CẤP) — STACK NEXT.JS & NGUỒN COMPONENT NÂNG CAO
> Thay thế hoàn toàn Phần 5 trong bản kế hoạch trước.

---

## 5.0. Nói thẳng một điều trước

shadcn/ui và Framer Motion không phải "đồ đơn giản" — chúng là nền. Nhưng bạn nói đúng ở chỗ: **nếu chỉ dùng đúng bấy nhiêu thì sản phẩm sẽ trông giống 90% các trang web khác**. Cái tạo ra khác biệt không nằm ở việc đổi sang thư viện xịn hơn, mà ở **ba lớp chồng lên nhau**:

| Lớp | Vai trò | Ai cũng có? |
|---|---|---|
| **Lớp nền** | Radix/Base UI + Tailwind — accessibility, dialog, drawer, focus trap | Có |
| **Lớp chuyển động** | GSAP + Lenis + View Transitions — nhịp điệu của cả trang | Ít người làm tới |
| **Lớp signature** | 1–2 hiệu ứng tự viết (shader, physics, morph) mà **không copy từ đâu** | Gần như không ai |

**Lớp signature mới là thứ giám khảo nhớ.** Mục 5.4 dưới đây là ba ứng viên cụ thể cho bài của bạn.

---

## 5.1. Stack Next.js

```bash
npx create-next-app@latest ba-gia-tri --typescript --tailwind --app --eslint --src-dir
```

| Lớp | Chọn | Ghi chú Next.js |
|---|---|---|
| Framework | **Next.js 15 App Router** | Toàn bộ scene là client component. Dùng RSC cho layout, metadata, OG image. |
| Style | **Tailwind CSS v4** | Cấu hình token bằng `@theme` trong CSS, không cần `tailwind.config.js` |
| Font | **`next/font/local`** | **Quan trọng:** tải file `.woff2` Be Vietnam Pro về `src/fonts/`, đừng dùng `next/font/google` cho font tiếng Việt — subset tự động dễ rụng dấu. Đặt `subsets: ['vietnamese', 'latin']` nếu vẫn dùng Google. |
| OG image | **`next/og` (ImageResponse)** | Sinh ảnh preview động — lúc bạn gửi link vào nhóm Zalo/Messenger nó hiện thumbnail đẹp. Chi tiết nhỏ nhưng gây ấn tượng ngay trước khi ai đó mở web. |
| Metadata | `generateMetadata` | Title, description, `og:image`, `theme-color: #0B0A09` |
| Heavy assets | **`next/dynamic` + `{ ssr: false }`** | Bắt buộc cho mọi thứ dính WebGL/Canvas. Three.js, Rive, Spline không chạy được lúc SSR. |
| State | **Zustand** (+ `persist` để nhớ tiến độ) | |
| Routing scene | `/`, `/doc-lap`, `/tu-do`… hoặc state switch | **Khuyên dùng route thật** để có deep link + View Transitions giữa các scene |
| Deploy | **Vercel** | `next build` → link tự động, kèm preview cho từng commit |

**Ba điểm Next.js hay bị vấp trong dự án kiểu này:**

1. **`'use client'` phải đặt ở component cha của mọi scene.** GSAP, dnd-kit, Three đều cần DOM.
2. **Hydration mismatch** khi dùng random (particle, vị trí hạt). Giải: sinh random trong `useEffect`, hoặc seed cố định.
3. **`useGSAP` thay vì `useEffect`.** Cài `@gsap/react`, dùng `useGSAP(() => {...}, { scope: container })` — nó tự cleanup, không bị animation chồng khi React 18 double-mount ở dev.

---

## 5.2. Lớp chuyển động (đây là chỗ nâng cấp rõ nhất)

| Thư viện | Dùng vào việc gì trong bài này |
|---|---|
| **GSAP 3 + `@gsap/react`** | Timeline phức tạp. Từ 2025 GSAP đã **miễn phí toàn bộ plugin** kể cả ScrollTrigger, SplitText, MorphSVG, DrawSVG (Webflow mở license — kiểm tra lại trên gsap.com trước khi dùng). |
| ↳ **DrawSVGPlugin** | Vẽ ba cạnh meaning map chạy nét — mượt hơn `stroke-dashoffset` thủ công nhiều |
| ↳ **MorphSVGPlugin** | Biến hình ba khối ở Scene 6 nhập lại thành dòng tiêu ngữ. Đây là khoảnh khắc "wow" rẻ nhất mà đẹp nhất. |
| ↳ **SplitText** | Tách chữ câu trích 17/10/1945 để hiện từng từ có độ trễ — sang hơn typewriter nhiều |
| ↳ **Flip** | Zoom-out ở Scene 4: ba scene thu nhỏ thành ba nút. Flip làm việc này gần như tự động. |
| **Lenis** (`lenis`, darkroomengineering) | Smooth scroll. Nếu bạn làm phần Source Library dạng scroll dài thì bắt buộc. |
| **Motion** (framer-motion) | Vẫn giữ, dùng cho `AnimatePresence` chuyển scene và layout animation. GSAP và Motion sống chung tốt — chia việc: Motion lo component, GSAP lo timeline. |
| **View Transitions API** | Next 15 hỗ trợ. Chuyển giữa các route scene mượt như app native, chỉ vài dòng CSS. |
| **NumberFlow** (`@number-flow/react`) | Bộ đếm `0/3 → 3/3` với chữ số trượt. Nhỏ nhưng rất "chuẩn". |
| **`tempus`** / `requestAnimationFrame` chung | Gộp mọi vòng lặp animation vào một rAF để không tụt fps |

---

## 5.3. Nguồn lấy component — danh sách đầy đủ

**Tier 0 — nền, dùng cho logic và accessibility**
- **Base UI** (`base-ui.com`) — do chính team Radix + MUI làm, thế hệ mới hơn Radix. Dialog, Popover, Tooltip chuẩn WAI-ARIA.
- **Radix Primitives** — vẫn là tiêu chuẩn vàng, shadcn dựng trên nó.
- **Vaul** — drawer kiểu iOS, hoàn hảo cho panel giải thích cạnh meaning map trên mobile.
- **Sonner** — toast, dùng cho phản hồi đúng/sai không chen ngang.
- **Embla Carousel** — băng thẻ cuộn ngang ở Scene 2/3.
- **`@dnd-kit`** — vẫn là lựa chọn tốt nhất cho kéo-thả có accessibility. Thêm `@dnd-kit/modifiers` để snap vào lưới.

**Tier 1 — component có sẵn, đẹp, dán vào là chạy**
- **shadcn/ui** (`ui.shadcn.com`)
- **Origin UI** (`originui.com`) — bộ component shadcn mở rộng, nhiều biến thể input/dialog hơn hẳn
- **Aceternity UI** (`ui.aceternity.com`) — Spotlight, Background Beams, Tracing Beam, Text Generate Effect
- **Magic UI** (`magicui.design`) — **Animated Beam** (nối các nút meaning map), Particles, Blur Fade, Dock
- **Cult UI** (`cult-ui.com`) — texture card, dynamic island, bento — thẩm mỹ cao hơn mức trung bình
- **Fancy Components** (`fancycomponents.dev`) — **đây là nguồn mình khuyên bạn đào sâu nhất.** Toàn hiệu ứng chữ và vật lý lạ: text pressure, gravity text, elastic line, pixel trail. Đúng thứ bạn đang tìm.
- **React Bits** (`reactbits.dev`) — Decrypted Text, Aurora, Ballpit, Metallic Paint
- **Animata** (`animata.design`) — bộ micro-interaction rất đa dạng
- **Kokonut UI**, **Eldora UI**, **Skiper UI**, **Luxe** — các bộ nhỏ hơn, lướt qua tìm cảm hứng
- **Motion Primitives** (`motion-primitives.com`) — pattern animation sạch, ít màu mè
- **21st.dev** — chợ component cộng đồng, search theo từ khóa
- **tweakcn** (`tweakcn.com`) — chỉnh theme shadcn bằng UI rồi export biến CSS. Dùng để áp bộ token sơn mài tối vào trong 10 phút.

**Tier 2 — thư viện đồ họa, dùng cho lớp signature**
- **React Three Fiber + drei + `@react-three/rapier`** — 3D và vật lý thật. Rapier để chiếc cân **thực sự nghiêng theo trọng lượng**, không phải animation giả.
- **Theatre.js** (`theatrejs.com`) — trình dựng timeline có giao diện, chỉnh animation 3D/2D bằng cách kéo keyframe trong trình duyệt rồi export JSON. Cực mạnh cho Scene 6.
- **OGL** — WebGL siêu nhẹ (~8kb) nếu chỉ cần một shader nền, không cần cả Three.
- **PixiJS** — 2D WebGL, nhanh, hợp cho hạt sáng số lượng lớn
- **Matter.js** — vật lý 2D, nhẹ hơn Rapier nhiều. Nếu chiếc cân làm 2D thì đây là lựa chọn đúng.
- **Rive** (`rive.app`) — **lựa chọn tốt nhất cho cây Hạnh phúc.** State machine đồ họa, một file `.riv` vài chục KB, chạy mượt trên mọi máy, tương tác được. Tốt hơn 3D ở đây về mọi mặt.
- **Spline** — dựng 3D bằng kéo-thả, export React component. Dùng nếu bạn không muốn viết Three.
- **Lottie** (`@lottiefiles/dotlottie-react`) — animation phát một lần
- **Flubber** — morph giữa hai đường SVG bất kỳ (thay thế miễn phí cho MorphSVG)
- **SVG Filters thủ công** — `feTurbulence` + `feDisplacementMap` tạo hiệu ứng giấy dó nhăn, mực loang. **Đây là thứ không thư viện nào cho bạn và trông rất "làm tay".**

**Tier 3 — nơi tìm cảm hứng thiết kế (đừng bỏ qua)**
- **Codrops** (`tympanus.net/codrops`) — tutorial + demo hiệu ứng web, kèm source code
- **Awwwards**, **Godly** (`godly.website`), **SiteInspire**, **Land-book**
- **Shadertoy** — kho shader, lấy về nhúng vào OGL/R3F
- **Lusion**, **Active Theory** — xem cách các studio hàng đầu dựng trải nghiệm tương tác

---

## 5.4. Ba "lớp signature" đề xuất cho bài này

Chọn **một hoặc hai**, đừng làm cả ba.

**① Nền shader sơn mài (Scene 0 + Scene 6)**
Một fragment shader vẽ vân sơn mài động — nhiễu Perlin chậm, màu đen-nâu, có ánh kim vàng lướt qua theo con trỏ. Dùng OGL (~8kb) hoặc `<shaderMaterial>` trong R3F. Khoảng 40 dòng GLSL. Không ai trong lớp bạn sẽ có cái này.

**② Chiếc cân có vật lý thật (Scene 6)**
Matter.js (2D) hoặc Rapier (3D): khối có khối lượng thật, đĩa cân nghiêng theo mô-men lực, có quán tính và dao động tắt dần. Người chơi thả khối vào và **cảm nhận** được sự mất cân bằng. Ẩn dụ của đề trở thành vật lý chứ không phải hình minh họa — và đó chính là lúc cơ chế game trùng khít với luận điểm.

**③ Chữ có trọng lực (Scene 0)**
Sáu chữ tiêu ngữ ban đầu rơi rời rạc, nằm lộn xộn dưới đáy màn hình như chữ bị đổ. Người chơi kéo chúng lên đúng vị trí thì chúng khóa lại thành dòng tiêu ngữ. Tham khảo "Gravity" ở Fancy Components. Mở bài bằng hình ảnh "sáu chữ này vốn rời rạc, ta phải tự xếp lại chúng" — rất khớp với luận điểm trục.

---

## 5.5. Ngân sách hiệu năng (bắt buộc kiểm tra trước khi nộp)

- JS bundle tuyến đầu **< 200KB gzip**. Mọi thứ WebGL/Rive phải `next/dynamic` với `ssr: false` và chỉ tải khi vào đúng scene.
- **LCP < 2.5s**, **CLS < 0.1** trên 4G giả lập.
- Kiểm bằng `npx @next/bundle-analyzer` và Lighthouse ở chế độ ẩn danh.
- Mọi animation phải chỉ đụng `transform` và `opacity`. Đụng `width`, `top`, `box-shadow` trong animation là tụt fps ngay.
- **Test trên điện thoại Android tầm trung, không phải iPhone của bạn.**

---

## 5.6. Cấu trúc thư mục Next.js

```
src/
  app/
    layout.tsx              // font, metadata, theme-color
    page.tsx                // Scene 0
    (journey)/
      doc-lap/page.tsx
      tu-do/page.tsx
      hanh-phuc/page.tsx
      meaning-map/page.tsx
      thu-thach/page.tsx
      chiec-can/page.tsx
      ket-luan/page.tsx
    nguon/page.tsx          // Source Library (RSC, render tĩnh từ content)
    opengraph-image.tsx     // next/og
  content/
    types.ts                // ← file đã gửi
    scenes.ts               // ← file đã gửi
  components/
    shell/SceneShell.tsx
    shell/ProgressRail.tsx
    source/SourceCard.tsx
    source/SourceBadge.tsx
    source/SourceTimeline.tsx
    dnd/DraggableCard.tsx
    dnd/DropZone.tsx
    fx/LacquerShader.tsx    // dynamic, ssr:false
    fx/BalanceScale.tsx     // dynamic, ssr:false
    fx/AnimatedEdge.tsx
  store/useJourney.ts
  hooks/useGsapScope.ts
  hooks/useReducedMotion.ts
  fonts/                    // .woff2 tiếng Việt
```

---

## 5.7. Prompt cho Codex (bản Next.js)

```
Bạn là senior frontend engineer. Dựng web app tương tác giáo dục tiếng Việt
"Ba giá trị — Một hành trình" (môn HCM202), chủ đề mối quan hệ
Độc lập – Tự do – Hạnh phúc trong tư tưởng Hồ Chí Minh.

STACK BẮT BUỘC:
Next.js 15 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui (Base UI/Radix)
+ gsap 3 với @gsap/react + motion + @dnd-kit/core + zustand + lenis.
Không backend. Deploy tĩnh trên Vercel.

RÀNG BUỘC KIẾN TRÚC — tuân thủ nghiêm:
1. TOÀN BỘ chữ nghĩa nằm trong src/content/scenes.ts và src/content/types.ts
   (tôi cung cấp sẵn, KHÔNG được sửa nội dung, KHÔNG được viết lại câu chữ,
   KHÔNG được tự thêm trích dẫn Hồ Chí Minh mới).
2. Mỗi scene là một route riêng trong app/(journey)/, dùng View Transitions
   khi chuyển route.
3. Font tiếng Việt dùng next/font/local với file .woff2 đặt ở src/fonts/.
   Kiểm tra hiển thị đúng chuỗi: "ĐỘC LẬP – TỰ DO – HẠNH PHÚC — Ủy ban, Cứu quốc, phẩm giá".
4. Mọi component dùng WebGL/Canvas/Rive phải import bằng next/dynamic với
   ssr: false và chỉ tải khi vào đúng scene.
5. Dùng useGSAP({ scope }) thay cho useEffect cho mọi animation GSAP.
6. Kéo-thả phải có fallback tap-to-select trên mobile và điều khiển bằng
   bàn phím (PointerSensor + KeyboardSensor).
7. Tôn trọng prefers-reduced-motion và có nút tắt hiệu ứng thủ công.
8. Không dùng random trong render (gây hydration mismatch) — sinh trong useEffect.

DESIGN TOKENS: [dán khối :root từ Phần 4.2 của bản kế hoạch]

BƯỚC NÀY: dựng project, cài thư viện, cấu hình Tailwind v4 @theme với tokens,
tạo layout.tsx (font + metadata), store useJourney, SceneShell, SourceCard,
SourceBadge, và route trang chủ (Scene 0). Chưa làm các scene khác.

Sau khi xong, liệt kê cho tôi: những chỗ bạn tự quyết định mà đặc tả không nói rõ,
và những asset tôi cần tự cung cấp.
```

Sau đó mỗi scene chạy một prompt riêng, dán đúng phần kịch bản tương ứng từ bản kế hoạch, kèm dòng cuối: *"liệt kê những chỗ bạn tự quyết định và những asset tôi cần cung cấp."*
