# Steal a Happiness: asset pack

Ảnh tổng hợp là **tham chiếu phong cách**, không phải nguồn crop. Các PNG riêng được tách từ 10 sheet người dùng cung cấp, giữ alpha trong suốt.

## Nguồn và nhóm

| Sheet trong `public/raw-assets` | Nội dung | Đầu ra |
| --- | --- | --- |
| `doc-lap-sheet.png` | Cổ thụ, 4 giai đoạn | `plants/doc-lap/stage-1..4.png` |
| `tu-do-sheet.png` | Tre, 4 giai đoạn | `plants/tu-do/stage-1..4.png` |
| `hanh-phuc-sheet.png` | Rau, 4 giai đoạn | `plants/hanh-phuc/stage-1..4.png` |
| `characters-sheet.png` | Đói, Dốt, trộm, bốn nhân vật | `characters/*.png` |
| `buildings-sheet.png` | Rào, tường, cổng, cờ, tháp, đuốc | `buildings/*.png` |
| `items-sheet.png` | Điểm, nước, hạt, gỗ, đá, phân, khiên, tri thức, hiệu ứng | `items/*.png` |
| `tiles-sheet.png` | Đất, cỏ, đường, ao, ruộng, nhà và cảnh quan | `tiles/*.png` |
| `icons-sheet.png` | Icon thao tác và khung UI trống | `ui/*.png` |
| `seasons-sheet.png` | Bốn thẻ mùa | `seasons/season-1..4.png` |
| `panels-sheet.png` | Popup, toast, bảng xếp hạng mẫu | `ui/*.png` |

Tất cả đầu ra nằm trong `public/assets/game/`. Tổng: **82 PNG**.

## Sử dụng

```tsx
import { GAME_ASSETS, plantAsset } from '@/lib/assets-manifest';
<img src={plantAsset('doc-lap', 4)} alt="Cây Độc lập trưởng thành" />
<img src={GAME_ASSETS['buildings/fence-quyen']} alt="Hàng rào" />
```

`src/lib/assets-manifest.ts` chứa đường dẫn có kiểu TypeScript. Cây dùng canvas trong suốt 512×512, cùng đường chân ở y=500; tỷ lệ mầm đến cây lớn được giữ bằng kích thước nội dung tăng dần. Component đặt sprite đứng trên tile hình thoi.

`scripts/prepare-game-assets.cjs` tái tạo asset và manifest từ raw sheet. Nhân vật được tách theo vùng alpha liên thông, tránh mảnh nhân vật hàng xóm. Có thể chạy lại bằng `node scripts/prepare-game-assets.cjs` khi đã có raw sheet trong repo. Lần đầu script có thể nhập các tệp clipboard gốc nếu chúng còn trong TEMP.

`artifacts/game-asset-contact-sheet.png` là bảng kiểm tra các asset đã cắt.

## UI có chữ

Các popup/toast/bảng xếp hạng chứa chữ trong ảnh được giữ làm asset tham khảo. Giao diện thực tế dùng HTML/CSS và số liệu game để nội dung luôn khớp ván chơi, có thể chọn đọc và truy cập bằng bàn phím. Không hiển thị bảng điểm mẫu trong ảnh như dữ liệu thật.

Không sử dụng lời trích dẫn không được kiểm chứng trên ảnh tổng hợp làm trích dẫn Hồ Chí Minh trong nội dung mới. Trò chơi ghi rõ các cơ chế là ẩn dụ.
