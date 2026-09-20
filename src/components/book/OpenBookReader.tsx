'use client';

import React, { useState, useEffect } from 'react';

export type BookType = 'doclap' | 'tudo' | 'hanhphuc';

interface OpenBookReaderProps {
  bookType: BookType;
  onClose: () => void;
  onOpenScale: () => void;
}

interface SpreadData {
  spreadIndex: number;
  leftPage: {
    pageNumber: number;
    kicker: string;
    title: string;
    body: React.ReactNode;
  };
  rightPage: {
    pageNumber: number;
    kicker: string;
    title: string;
    body: React.ReactNode;
  };
}

const BOOK_METADATA: Record<BookType, { title: string; color: string; accent: string; year: string }> = {
  doclap: {
    title: 'QUYỂN I · ĐỘC LẬP',
    color: '#8A3A2A',
    accent: '#C49A50',
    year: '1919 – 1945',
  },
  tudo: {
    title: 'QUYỂN II · TỰ DO',
    color: '#26486A',
    accent: '#5E88B5',
    year: '1945 – 1954',
  },
  hanhphuc: {
    title: 'QUYỂN III · HẠNH PHÚC',
    color: '#35582F',
    accent: '#6E9C62',
    year: '1945 – 1966',
  },
};

export function OpenBookReader({ bookType, onClose, onOpenScale }: OpenBookReaderProps) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  const meta = BOOK_METADATA[bookType];

  // Book Spreads content definition
  const spreads: Record<BookType, SpreadData[]> = {
    doclap: [
      {
        spreadIndex: 0,
        leftPage: {
          pageNumber: 1,
          kicker: 'CHƯƠNG I · NỀN TẢNG THIÊNG LIÊNG',
          title: 'Quyền Dân Tộc Tự Quyết',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2C241C]">
              <p className="font-serif first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-bold first-letter:text-[#7A2A1A]">
                Trong hệ thống quan điểm toàn diện và sâu sắc của Chủ tịch Hồ Chí Minh, <strong>Độc lập dân tộc</strong> không phải là một khái niệm trừu tượng, mà là <em>quyền thiêng liêng, bất khả xâm phạm</em> của tất cả các dân tộc trên thế giới.
              </p>
              <div className="p-3 bg-[#EFE6D2] border-l-2 border-[#7A2A1A] rounded-r text-[12px] italic text-[#4A3A2A]">
                &ldquo;Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng; dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.&rdquo;
                <span className="block mt-1 font-mono text-[10px] uppercase not-italic text-[#7A2A1A]/80">— Tuyên ngôn Độc lập (2/9/1945)</span>
              </div>
              <p>
                Độc lập dân tộc là tiền đề tiên quyết, là cánh cửa mở ra để nhân dân có thể tự mình quyết định vận mệnh, chấm dứt ách đô hộ nô lệ kéo dài gần một thế kỷ.
              </p>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 2,
          kicker: 'LẬP LUẬN BIỆN CHỨNG',
          title: 'Từ Quyền Con Người Sang Quyền Dân Tộc',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2C241C]">
              <p>
                Điểm sáng tạo độc đáo bậc nhất của Hồ Chí Minh là Người đã trích dẫn Tuyên ngôn Độc lập 1776 của Mỹ và Tuyên ngôn Nhân quyền & Dân quyền 1791 của Pháp, sau đó thực hiện thao tác quy nạp vĩ đại:
              </p>
              <div className="my-2 p-3 bg-[#FAF4E6] border border-[#C8B896] rounded text-center space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-[#7A2A1A] uppercase block">
                  CÔNG THỨC QUY NẠP HỒ CHÍ MINH
                </span>
                <p className="font-serif font-bold text-sm text-[#261B12]">
                  Quyền Con Người <span className="text-[#C49A50]">→ Suy Rộng Ra →</span> Quyền Dân Tộc
                </p>
              </div>
              <p className="text-[12px] text-[#554638]">
                Nếu mọi con người sinh ra đều có quyền sống và quyền tự do, thì một dân tộc gồm hàng chục triệu con người đương nhiên phải có quyền độc lập và tự quyết!
              </p>
            </div>
          ),
        },
      },
      {
        spreadIndex: 1,
        leftPage: {
          pageNumber: 3,
          kicker: 'CỨ LIỆU LỊCH SỬ',
          title: '5 Trụ Cột Chủ Quyền Hoàn Toàn',
          body: (
            <div className="space-y-2 text-[12px] sm:text-[13px] leading-relaxed text-[#2C241C]">
              <p className="mb-2">Độc lập theo Người phải là độc lập <em>thực sự, hoàn toàn và triệt để</em> trên mọi phương diện:</p>
              <ul className="space-y-1.5 pl-3 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-[#7A2A1A] font-bold">1.</span>
                  <span><strong>Toàn vẹn lãnh thổ:</strong> Không một tấc đất nào của Tổ quốc bị chiếm đóng hay chia cắt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7A2A1A] font-bold">2.</span>
                  <span><strong>Chính trị tự quyết:</strong> Nhân dân tự bầu ra chính phủ của mình, không lệ thuộc ngoại bang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7A2A1A] font-bold">3.</span>
                  <span><strong>Kinh tế tự chủ:</strong> Nắm giữ tài nguyên, tiền tệ và huyết mạch sản xuất quốc gia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7A2A1A] font-bold">4.</span>
                  <span><strong>Quân sự tự vệ:</strong> Có quân đội quốc gia đủ sức đập tan mọi mưu toan xâm lược.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7A2A1A] font-bold">5.</span>
                  <span><strong>Ngoại giao bình đẳng:</strong> Bang giao quốc tế dựa trên tôn trọng chủ quyền lẫn nhau.</span>
                </li>
              </ul>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 4,
          kicker: 'Ý CHÍ ĐỘC LẬP',
          title: 'Thà Hy Sinh Tất Cả',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2C241C]">
              <p>
                Đối với dân tộc Việt Nam, giá trị của độc lập được đánh đổi bằng xương máu của biết bao thế hệ. Vì vậy, ý chí bảo vệ độc lập là một chân lý không gì lay chuyển nổi:
              </p>
              <div className="p-3 bg-[#EFE6D2] border-l-2 border-[#7A2A1A] rounded-r text-[12.5px] italic text-[#4A3A2A]">
                &ldquo;Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ!&rdquo;
                <span className="block mt-1 font-mono text-[10px] uppercase not-italic text-[#7A2A1A]/80">— Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)</span>
              </div>
              <div className="p-3 bg-[#FAF4E6] border-l-2 border-[#C49A50] rounded-r text-[12.5px] italic text-[#4A3A2A]">
                &ldquo;Không có gì quý hơn độc lập, tự do!&rdquo;
                <span className="block mt-1 font-mono text-[10px] uppercase not-italic text-[#7A2A1A]/80">— Lời kêu gọi chống Mỹ (17/7/1966)</span>
              </div>
            </div>
          ),
        },
      },
      {
        spreadIndex: 2,
        leftPage: {
          pageNumber: 5,
          kicker: 'KẾT NỐI BIỆN CHỨNG',
          title: 'Độc Lập Là Tiền Đề, Chưa Phải Đích Đến',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2C241C]">
              <p>
                Độc lập dân tộc là <strong>điều kiện cần</strong>, nhưng tự thân nó chưa đủ để làm cho nhân dân hạnh phúc nếu không có Tự do:
              </p>
              <p className="font-serif italic text-[#6B2416]">
                &ldquo;Nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.&rdquo;
              </p>
              <p className="text-[12px] text-[#554638]">
                Chính nhận thức sâu sắc này đã thúc đẩy Người ngay sau khi giành được độc lập năm 1945 đã lập tức bắt tay vào ban hành quyền tự do và xóa nạn mù chữ, cứu đói cho nhân dân.
              </p>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 6,
          kicker: 'MỞ RỘNG TRẢI NGHIỆM',
          title: 'Thử Nghiệm Chiếc Cân Biện Chứng',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#2C241C]">
              <p>
                Để hiểu thấu đáo cách Độc Lập giữ vai trò trọng lực như thế nào trong mối tương quan với Tự Do và Hạnh Phúc, hãy bước vào phòng thí nghiệm biện chứng:
              </p>
              <div className="my-3 p-4 bg-[#FAF4E6] border border-[#C49A50] rounded-lg text-center space-y-3 shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#7A2A1A] uppercase block">
                  MÔ HÌNH HỌC THUẬT CHƯƠNG 3
                </span>
                <p className="font-serif font-semibold text-sm text-[#261B12]">
                  Khám phá Chiếc Cân Đo Lường & Phương Trình Giá Trị
                </p>
                <button
                  onClick={onOpenScale}
                  className="px-4 py-2 bg-[#7A2A1A] hover:bg-[#963523] text-[#F8F2E4] font-serif text-[12px] tracking-wide rounded-full transition-all transform hover:scale-105 shadow"
                >
                  Mở Chiếc Cân Biện Chứng →
                </button>
              </div>
            </div>
          ),
        },
      },
    ],
    tudo: [
      {
        spreadIndex: 0,
        leftPage: {
          pageNumber: 1,
          kicker: 'CHƯƠNG II · NỘI HÀM CỐT LÕI',
          title: 'Tự Do — Linh Hồn Của Độc Lập',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1C2530]">
              <p className="font-serif first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-bold first-letter:text-[#26486A]">
                Ngay từ năm 1919 khi gửi <strong>Bản Yêu sách của nhân dân An Nam</strong> tới Hội nghị Versailles, Nguyễn Ái Quốc đã không đòi độc lập mơ hồ mà đòi những <em>quyền tự do cụ thể</em>: tự do báo chí, tự do hội họp, tự do đi lại và học tập.
              </p>
              <div className="p-3 bg-[#E8EFF6] border-l-2 border-[#26486A] rounded-r text-[12px] italic text-[#1C2A3A]">
                &ldquo;Tự do không phải là phần thưởng được ban phát sau khi có độc lập — tự do hiện diện ngay từ mục tiêu đầu tiên của phong trào giải phóng.&rdquo;
              </div>
              <p>
                Một dân tộc độc lập mà người dân bị trói buộc, giam hãm thì đó chỉ là sự đổi chỗ của kẻ cai trị, chứ không phải giải phóng thực sự.
              </p>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 2,
          kicker: 'HIẾN PHÁP 1946',
          title: 'Tự Do Trong Khuôn Khổ Pháp Quyền',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1C2530]">
              <p>
                Ngày 9/11/1946, Quốc hội khóa I đã thông qua bản <strong>Hiến pháp đầu tiên</strong> của nước Việt Nam Dân chủ Cộng hòa do Hồ Chí Minh làm Trưởng ban soạn thảo.
              </p>
              <div className="p-3 bg-[#FAF6EC] border border-[#8FA8C4] rounded space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#26486A] uppercase block font-semibold">
                  ĐIỀU 9 — HIẾN PHÁP 1946
                </span>
                <p className="text-[12px] italic text-[#253A52]">
                  &ldquo;Đàn bà ngang quyền với đàn ông về mọi phương diện. Mọi công dân Việt Nam đều bình đẳng trước pháp luật.&rdquo;
                </p>
              </div>
              <p className="text-[12px] text-[#4A5D73]">
                Tự do trong tư tưởng Hồ Chí Minh là tự do có tổ chức, có pháp quyền bảo đảm, phục vụ lợi ích của đa số quần chúng nhân dân lao động.
              </p>
            </div>
          ),
        },
      },
      {
        spreadIndex: 1,
        leftPage: {
          pageNumber: 3,
          kicker: 'DANH MỤC QUYỀN CÔNG DÂN',
          title: '10 Quyền Tự Do Căn Bản',
          body: (
            <div className="space-y-2 text-[12px] sm:text-[13px] leading-relaxed text-[#1C2530]">
              <p className="mb-2">Hiến pháp 1946 xác lập 10 quyền nền tảng của người dân Việt Nam mới:</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11.5px]">
                <div className="p-1.5 bg-[#EEF4FA] rounded">1. Tự do ngôn luận</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">2. Tự do xuất bản</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">3. Tự do tổ chức & hội họp</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">4. Tự do tín ngưỡng</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">5. Tự do cư trú & đi lại</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">6. Quyền bất khả xâm phạm thân thể</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">7. Thư tín được bảo đảm</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">8. Quyền tư hữu tài sản</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">9. Quyền bầu cử & ứng cử</div>
                <div className="p-1.5 bg-[#EEF4FA] rounded">10. Quyền học tập của quốc dân</div>
              </div>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 4,
          kicker: 'HỒ SƠ LỊCH SỬ',
          title: 'Bà Tám Cầm Lá Phiếu',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1C2530]">
              <p>
                Ngày 6/1/1946 — cuộc Tổng tuyển cử đầu tiên trong lịch sử Việt Nam. Lần đầu tiên, một người phụ nữ nông dân, người mù chữ, người nghèo khổ cũng được trao một lá phiếu bình đẳng như bất kỳ ai:
              </p>
              <div className="p-3 bg-[#E8EFF6] border-l-2 border-[#26486A] rounded-r text-[12px] italic text-[#1C2A3A]">
                &ldquo;Trước đây chúng ta là nô lệ, nay chúng ta là công dân tự do của một nước độc lập. Lá phiếu của các bạn chứng minh quyền làm chủ đất nước.&rdquo;
              </div>
              <p className="text-[12px] text-[#4A5D73]">
                Tự do biến một người nô lệ thành chủ nhân của đất nước. Đó là bước chuyển hóa vĩ đại nhất về mặt nhân vị con người.
              </p>
            </div>
          ),
        },
      },
      {
        spreadIndex: 2,
        leftPage: {
          pageNumber: 5,
          kicker: 'CÂY CẦU NỐI',
          title: 'Tự Do Mở Đường Cho Hạnh Phúc',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1C2530]">
              <p>
                Nếu Độc Lập là mảnh đất giải phóng, thì <strong>Tự Do</strong> chính là khí trời và quyền năng để người dân gieo trồng hạt giống <strong>Hạnh Phúc</strong>.
              </p>
              <p>
                Không có tự do ngôn luận, nhân dân không thể đóng góp xây dựng chính quyền. Không có tự do kinh doanh và học tập, nhân dân không thể thoát nghèo và nâng cao dân trí.
              </p>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 6,
          kicker: 'BƯỚC TIẾP THEO',
          title: 'Đích Đến Cuối Cùng',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1C2530]">
              <p>
                Độc lập đã có, tự do đã mở — vậy mục đích tối thượng của sự nghiệp cách mạng là gì?
              </p>
              <div className="p-4 bg-[#FAF6EC] border border-[#26486A] rounded-lg text-center space-y-3 shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#26486A] uppercase block">
                  QUYỂN TIẾP THEO
                </span>
                <p className="font-serif font-semibold text-sm text-[#1C2530]">
                  Khám phá Quyển III: Hạnh Phúc — Thước Đo Thực Tế Của Cách Mạng
                </p>
                <button
                  onClick={onOpenScale}
                  className="px-4 py-2 bg-[#26486A] hover:bg-[#345D85] text-[#F8F4EA] font-serif text-[12px] tracking-wide rounded-full transition-all transform hover:scale-105 shadow"
                >
                  Kiểm Chứng Cân Bằng Giá Trị →
                </button>
              </div>
            </div>
          ),
        },
      },
    ],
    hanhphuc: [
      {
        spreadIndex: 0,
        leftPage: {
          pageNumber: 1,
          kicker: 'CHƯƠNG III · ĐÍCH ĐẾN TỐI THƯỢNG',
          title: 'Hạnh Phúc — Thước Đo Của Chế Độ',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1E2818]">
              <p className="font-serif first-letter:float-left first-letter:text-4xl first-letter:pr-2 first-letter:font-bold first-letter:text-[#35582F]">
                Trong toàn bộ di sản Hồ Chí Minh, <strong>Hạnh phúc</strong> không bao giờ là những lời hứa hão huyền ở tương lai xa xôi, mà là cơm ăn, áo mặc, chỗ ở, và việc học hành của từng người dân ngay trong đời thực.
              </p>
              <div className="p-3 bg-[#EBF2E8] border-l-2 border-[#35582F] rounded-r text-[12px] italic text-[#253820]">
                &ldquo;Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập, dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.&rdquo;
                <span className="block mt-1 font-mono text-[10px] uppercase not-italic text-[#35582F]/80">— Trả lời các nhà báo nước ngoài (1/1946)</span>
              </div>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 2,
          kicker: 'CẢNH TỈNH LỊCH SỬ',
          title: 'Bức Thư Ngày 17/10/1945',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1E2818]">
              <p>
                Chỉ 45 ngày sau khi đọc Tuyên ngôn Độc lập, Chủ tịch Hồ Chí Minh đã gửi thư cho Ủy ban nhân dân các kỳ, tỉnh, huyện và làng. Bức thư chứa đựng câu nói định nghĩa cả tư tưởng Người:
              </p>
              <div className="p-3 bg-[#F8F5EC] border-2 border-[#547348] rounded shadow-sm text-center">
                <p className="font-serif font-bold text-[13.5px] text-[#1D321A] leading-relaxed italic">
                  &ldquo;Nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.&rdquo;
                </p>
              </div>
              <p className="text-[12px] text-[#425938]">
                Câu nói này thiết lập mối quan hệ KIỂM CHỨNG: đời sống nhân dân là chiếc cân đo lường giá trị thực tế của nền độc lập.
              </p>
            </div>
          ),
        },
      },
      {
        spreadIndex: 1,
        leftPage: {
          pageNumber: 3,
          kicker: 'CỤ THỂ HÓA HẠNH PHÚC',
          title: 'Hạnh Phúc Vật Chất & Tinh Thần',
          body: (
            <div className="space-y-2 text-[12px] sm:text-[13px] leading-relaxed text-[#1E2818]">
              <p className="mb-2">Ngày 3/9/1945, trong phiên họp đầu tiên của Chính phủ, Người đề ra 6 nhiệm vụ cấp bách:</p>
              <div className="space-y-2">
                <div className="p-2 bg-[#EEF5EB] border-l-2 border-[#547348] rounded-r">
                  <strong>1. Diệt giặc đói:</strong> Phát động tăng gia sản xuất ngay lập tức để cứu dân.
                </div>
                <div className="p-2 bg-[#EEF5EB] border-l-2 border-[#547348] rounded-r">
                  <strong>2. Diệt giặc dốt:</strong> Mở chiến dịch chống nạn mù chữ (Bình dân học vụ).
                </div>
                <div className="p-2 bg-[#EEF5EB] border-l-2 border-[#547348] rounded-r">
                  <strong>3. Tự do tín ngưỡng:</strong> Lương giáo đoàn kết, tôn trọng đời sống tinh thần của nhân dân.
                </div>
              </div>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 4,
          kicker: 'PHÁP LÝ TIÊU NGỮ',
          title: 'Sắc Lệnh Số 49 (12/10/1945)',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1E2818]">
              <p>
                Tại sao sáu chữ <strong>Độc lập – Tự do – Hạnh phúc</strong> xuất hiện dưới quốc hiệu Việt Nam trên mọi văn bản công quyền?
              </p>
              <div className="p-3 bg-[#F8F5EC] border border-[#8DAA82] rounded space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-[#35582F] uppercase block font-semibold">
                  SẮC LỆNH SỐ 49
                </span>
                <p className="text-[12px] italic text-[#253820]">
                  &ldquo;Xét vì cần nêu cao một kỷ nguyên mới để đánh dấu vào lịch sử nước ta, những độc lập, tự do và hạnh phúc mà chính thể dân chủ cộng hòa mang lại cho dân chúng.&rdquo;
                </p>
              </div>
              <p className="text-[12px] text-[#425938]">
                Tiêu ngữ quốc gia không phải là một khẩu hiệu trang trí, mà là một <strong>cam kết pháp lý</strong> của chính quyền đối với nhân dân!
              </p>
            </div>
          ),
        },
      },
      {
        spreadIndex: 2,
        leftPage: {
          pageNumber: 5,
          kicker: 'TAM GIÁC BIỆN CHỨNG',
          title: 'Ba Giá Trị — Một Chỉnh Thể',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1E2818]">
              <p>
                Ba giá trị Độc Lập – Tự Do – Hạnh Phúc tạo thành một vòng tròn biện chứng khép kín:
              </p>
              <ul className="space-y-2 text-[12.5px] pl-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-[#35582F] font-bold">●</span>
                  <span><strong>Độc Lập</strong> là tiền đề, là cái gốc nuôi dưỡng Tự Do và Hạnh Phúc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35582F] font-bold">●</span>
                  <span><strong>Tự Do</strong> là con đường, là môi trường để nhân dân làm chủ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35582F] font-bold">●</span>
                  <span><strong>Hạnh Phúc</strong> là mục tiêu cuối cùng và là thước đo kiểm chứng sự vững bền của Độc Lập.</span>
                </li>
              </ul>
            </div>
          ),
        },
        rightPage: {
          pageNumber: 6,
          kicker: 'TƯƠNG TÁC TỔNG KẾT',
          title: 'Kiểm Tra Sức Nặng Trên Chiếc Cân',
          body: (
            <div className="space-y-3 text-[13px] sm:text-[14px] leading-relaxed text-[#1E2818]">
              <p>
                Trang sách đã khép lại toàn bộ 3 tập cẩm nang. Giờ là lúc bạn trực tiếp đặt các giá trị lên đòn cân để kiểm chứng phương trình biện chứng:
              </p>
              <div className="p-4 bg-[#F8F5EC] border border-[#35582F] rounded-lg text-center space-y-3 shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#35582F] uppercase block">
                  CÂN BẰNG BIỆN CHỨNG
                </span>
                <p className="font-serif font-semibold text-sm text-[#1E2818]">
                  Độc Lập (2) = Tự Do (1) + Hạnh Phúc (1)
                </p>
                <button
                  onClick={onOpenScale}
                  className="px-5 py-2.5 bg-[#35582F] hover:bg-[#436E3B] text-[#F8F5EC] font-serif text-[12px] tracking-wide rounded-full transition-all transform hover:scale-105 shadow-md"
                >
                  Mở Mô Hình Chiếc Cân →
                </button>
              </div>
            </div>
          ),
        },
      },
    ],
  };

  const currentSpreadData = spreads[bookType][currentSpread];
  const totalSpreads = spreads[bookType].length;

  const handleNextSpread = () => {
    if (currentSpread < totalSpreads - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentSpread((prev) => prev + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 450);
    }
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentSpread((prev) => prev - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 450);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextSpread();
      if (e.key === 'ArrowLeft') handlePrevSpread();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread, isFlipping]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, rgba(35,28,20,0.88) 0%, rgba(15,12,8,0.96) 100%)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Background ambient light */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${meta.color} 0%, transparent 60%)`,
        }}
      />

      {/* Top action bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between pointer-events-auto z-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#C4B296]">
            {meta.title}
          </span>
          <span className="text-[#C4B296]/40">·</span>
          <span className="font-serif italic text-xs text-[#C4B296]/70">{meta.year}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenScale}
            className="px-3 py-1.5 bg-[#FAF3E0]/10 hover:bg-[#FAF3E0]/20 border border-[#C4B296]/30 text-[#EADFC7] rounded-full text-xs font-serif transition-colors flex items-center gap-1.5"
          >
            <span>⚖️</span>
            <span className="hidden sm:inline">Chiếc Cân Biện Chứng</span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#C4B296]/30 bg-[#251E16]/80 text-[#EADFC7] hover:bg-[#FAF3E0]/20 flex items-center justify-center text-sm font-sans transition-colors"
            title="Đóng sách (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* SPREAD CONTAINER (Open Book Spread) */}
      <div
        className="relative w-full max-w-5xl h-[78vh] max-h-[640px] flex rounded-lg shadow-2xl overflow-hidden"
        style={{
          perspective: 2000,
          background: '#2A2016',
          boxShadow: '0 30px 90px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Book Spine Center Crease */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 pointer-events-none z-30"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.3) 100%)',
          }}
        />

        {/* Bookmark Ribbon hanging down center */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-24 pointer-events-none z-40 rounded-b shadow-lg"
          style={{
            background: `linear-gradient(180deg, ${meta.color} 0%, #B8860B 100%)`,
          }}
        />

        {/* LEFT PAGE */}
        <div
          className="relative flex-1 h-full p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F9F4E8 0%, #EFE5D0 85%, #E5D6BD 100%)',
            boxShadow: 'inset -15px 0 25px rgba(50,35,20,0.08)',
          }}
        >
          {/* Header */}
          <div className="border-b border-[#C8B896]/40 pb-2">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#7A6348]">
              {currentSpreadData.leftPage.kicker}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1712] mt-0.5">
              {currentSpreadData.leftPage.title}
            </h3>
          </div>

          {/* Body */}
          <div className="flex-1 py-4 overflow-y-auto pr-1">
            {currentSpreadData.leftPage.body}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-[#C8B896]/40 flex items-center justify-between text-[10px] font-mono text-[#7A6348]">
            <span>{currentSpreadData.leftPage.pageNumber}</span>
            <span className="font-serif italic capitalize">Hồ Chí Minh Toàn Tập</span>
          </div>
        </div>

        {/* RIGHT PAGE */}
        <div
          className="relative flex-1 h-full p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(225deg, #F9F4E8 0%, #EFE5D0 85%, #E5D6BD 100%)',
            boxShadow: 'inset 15px 0 25px rgba(50,35,20,0.08)',
            transformOrigin: 'left center',
            transform: isFlipping && flipDirection === 'next' ? 'rotateY(-60deg)' : 'none',
            transition: 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {/* Header */}
          <div className="border-b border-[#C8B896]/40 pb-2">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#7A6348]">
              {currentSpreadData.rightPage.kicker}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E1712] mt-0.5">
              {currentSpreadData.rightPage.title}
            </h3>
          </div>

          {/* Body */}
          <div className="flex-1 py-4 overflow-y-auto pr-1">
            {currentSpreadData.rightPage.body}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-[#C8B896]/40 flex items-center justify-between text-[10px] font-mono text-[#7A6348]">
            <span className="font-serif italic capitalize">HCM202 · Chương 3</span>
            <span>{currentSpreadData.rightPage.pageNumber}</span>
          </div>
        </div>
      </div>

      {/* Bottom page controls */}
      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 z-20">
        <button
          onClick={handlePrevSpread}
          disabled={currentSpread === 0 || isFlipping}
          className={`px-4 py-2 rounded-full font-serif text-xs tracking-wide transition-all ${
            currentSpread === 0
              ? 'opacity-30 cursor-not-allowed bg-[#2A2016] text-[#C4B296]'
              : 'bg-[#FAF3E0]/15 hover:bg-[#FAF3E0]/25 text-[#EADFC7] border border-[#C4B296]/30 shadow'
          }`}
        >
          ← Trang trước
        </button>

        <span className="font-mono text-xs text-[#C4B296]/80 px-2">
          {currentSpread + 1} / {totalSpreads}
        </span>

        <button
          onClick={handleNextSpread}
          disabled={currentSpread === totalSpreads - 1 || isFlipping}
          className={`px-4 py-2 rounded-full font-serif text-xs tracking-wide transition-all ${
            currentSpread === totalSpreads - 1
              ? 'opacity-30 cursor-not-allowed bg-[#2A2016] text-[#C4B296]'
              : 'bg-[#FAF3E0]/15 hover:bg-[#FAF3E0]/25 text-[#EADFC7] border border-[#C4B296]/30 shadow'
          }`}
        >
          Trang sau →
        </button>
      </div>
    </div>
  );
}
