export type VolumeId = 'doclap' | 'tudo' | 'hanhphuc';

export interface Reading {
  date: string;
  title: string;
  passage: string;
  passageType: 'quote' | 'idea';
  attribution: string;
  heading: string;
  paragraphs: string[];
  takeaway: string;
  question: string;
  options: [string, string];
  correct: number;
  feedback: [string, string];
  source: number;
}

export interface Volume {
  id: VolumeId;
  roman: string;
  title: string;
  subtitle: string;
  question: string;
  role: string;
  readings: Reading[];
}

export const references = [
  { title: 'Tuyên ngôn Độc lập', date: '02.09.1945', detail: 'Quyền con người và quyền độc lập của dân tộc. Bài giới thiệu văn kiện trên Báo điện tử Chính phủ.', url: 'https://baochinhphu.vn/y-nghia-thoi-dai-va-su-tai-sinh-cua-mot-quoc-gia-mot-dan-toc-102230831191731827.htm' },
  { title: 'Những nhiệm vụ cấp bách của Nhà nước Việt Nam Dân chủ Cộng hòa', date: '03.09.1945', detail: 'Chống đói, chống dốt và xây dựng chính quyền dân chủ trong buổi đầu độc lập. Báo Quân đội nhân dân.', url: 'https://www.qdnd.vn/tu-lieu-ho-so/ngay-nay-nam-xua/ngay-3-9-1945-chu-tich-ho-chi-minh-chu-tri-phien-hop-dau-tien-cua-hoi-dong-chinh-phu-704362' },
  { title: 'Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng', date: '17.10.1945', detail: 'Báo Cứu quốc, số 69. Nội dung được giới thiệu bởi Hội Chữ thập đỏ TP. Hồ Chí Minh.', url: 'https://chuthapdotphcm.org.vn/tin-tuc/neu-nuoc-doc-lap-ma-dan-khong-huong-hanh-phuc-tu-do-thi-doc-lap-cung-chang-co-nghia-ly-gi' },
  { title: 'Hiến pháp năm 1946', date: '09.11.1946', detail: 'Điều 1 về quyền bính của nhân dân; các điều 6–10 về quyền bình đẳng và tự do. Bản văn trên Cổng Thông tin điện tử Chính phủ.', url: 'https://chinhphu.vn/?classid=1&docid=5803&pageid=27160&typegroupid=1' },
  { title: 'Khát vọng phát triển Việt Nam phồn vinh, hạnh phúc', date: 'Tư liệu đối chiếu', detail: 'Dẫn lời Hồ Chí Minh về độc lập, tự do, cơm ăn, áo mặc và học hành. Cổng Thông tin điện tử Bộ Khoa học và Công nghệ.', url: 'https://mst.gov.vn/hoc-tap-va-lam-theo-tu-tuong-dao-duc-phong-cach-ho-chi-minh-hien-thuc-hoa-khat-vong-phat-trien-viet-nam-phon-vinh-hanh-phuc-197148521.htm' },
];

export const volumes: Volume[] = [
  {
    id: 'doclap', roman: 'I', title: 'Độc lập', subtitle: 'Gốc rễ của một dân tộc', question: 'Ai quyết định vận mệnh của mình?', role: 'Điều kiện nền tảng',
    readings: [
      {
        date: '02 tháng 9, 1945', title: 'Một dân tộc\ncất tiếng.',
        passage: 'Nước Việt Nam có quyền hưởng tự do và độc lập', passageType: 'quote', attribution: 'Trích Tuyên ngôn Độc lập, 1945',
        heading: 'Từ thân phận thuộc địa đến quyền tự quyết',
        paragraphs: ['Tại Ba Đình, lời tuyên bố độc lập khẳng định Việt Nam là một dân tộc có quyền tự quyết định vận mệnh của mình.', 'Trong lập luận của Hồ Chí Minh, quyền sống và quyền tự do của con người được mở rộng thành quyền bình đẳng, quyền sống và quyền tự do của các dân tộc.'],
        takeaway: 'Độc lập trả lời câu hỏi: dân tộc có được tự quyết định con đường của mình không?',
        question: 'Điều gì thay đổi căn bản khi một dân tộc giành được độc lập?', options: ['Tên gọi của chính quyền', 'Quyền tự quyết vận mệnh'], correct: 1,
        feedback: ['Tên gọi chưa nói lên thực chất. Hãy nhìn vào ai có quyền quyết định vận mệnh dân tộc.', 'Đúng. Độc lập trước hết là quyền tự quyết của cả dân tộc, chứ không chỉ là một danh xưng.'], source: 0,
      },
      {
        date: 'Suy ngẫm từ văn kiện', title: 'Có tên trên\nbản đồ. Đã đủ?',
        passage: 'Độc lập phải là thực chất, chứ không chỉ tồn tại trên danh nghĩa.', passageType: 'idea', attribution: 'Diễn giải của nhóm',
        heading: 'Một phép thử cho quyền tự quyết',
        paragraphs: ['Hãy hình dung một đất nước có quốc kỳ và tên riêng, nhưng mọi quyết định quan trọng đều do một thế lực bên ngoài áp đặt.', 'Đó là tình huống giả định để phân biệt hình thức với thực chất: quyền lựa chọn con đường phát triển phải thuộc về chính dân tộc ấy.'],
        takeaway: 'Độc lập là nền tảng để bảo vệ quyền làm chủ, không phải một vật trang trí.',
        question: 'Trong tình huống này, điều gì còn thiếu?', options: ['Quyền quyết định thực sự', 'Thêm những biểu tượng'], correct: 0,
        feedback: ['Đúng. Quyền tự quyết phải có thực trong đời sống chính trị của dân tộc.', 'Biểu tượng có ý nghĩa, nhưng không thể thay thế quyền tự quyết thực sự.'], source: 0,
      },
      {
        date: '03 tháng 9, 1945', title: 'Ngày mới.\nViệc chưa xong.',
        passage: 'Giành được độc lập là mở ra khả năng xây dựng một cuộc sống mới.', passageType: 'idea', attribution: 'Diễn giải của nhóm',
        heading: 'Sau ngày độc lập, nhìn về phía nhân dân',
        paragraphs: ['Ngay trong phiên họp đầu tiên của Chính phủ, Hồ Chí Minh nêu những nhiệm vụ cấp bách như chống đói, chống dốt, tổ chức tổng tuyển cử.', 'Như vậy, bảo vệ nền độc lập và chăm lo quyền lợi của dân phải đi cùng nhau. Một nước tự chủ chưa tự động làm cho mỗi người dân trở thành người làm chủ.'],
        takeaway: 'Độc lập mở cánh cửa. Tự do cho biết ai được bước qua cánh cửa ấy.',
        question: 'Câu hỏi nào cần được đặt tiếp sau độc lập dân tộc?', options: ['Nhân dân có thực sự làm chủ không?', 'Hành trình đã kết thúc chưa?'], correct: 0,
        feedback: ['Đó là lý do chúng ta mở cuốn Tự do: từ quyền của dân tộc đến quyền của mỗi người.', 'Độc lập là bước ngoặt lớn, nhưng câu chuyện còn tiếp ở quyền và cuộc sống của nhân dân.'], source: 1,
      },
    ],
  },
  {
    id: 'tudo', roman: 'II', title: 'Tự do', subtitle: 'Cánh cửa của người làm chủ', question: 'Độc lập rồi, người dân được gì?', role: 'Quyền được hiện thực hóa',
    readings: [
      {
        date: '09 tháng 11, 1946', title: 'Từ người dân\nđến người chủ.',
        passage: 'Tất cả quyền bính trong nước là của toàn thể nhân dân Việt Nam', passageType: 'quote', attribution: 'Trích Điều 1, Hiến pháp 1946',
        heading: 'Chủ quyền quốc gia phải gắn với quyền của dân',
        paragraphs: ['Hiến pháp 1946 khẳng định quyền lực thuộc về nhân dân, ghi nhận quyền bình đẳng và các quyền tự do của công dân.', 'Trong tư tưởng Hồ Chí Minh, giải phóng dân tộc gắn với giải phóng con người. Người dân cần được tham gia, bày tỏ ý kiến và làm chủ cuộc sống của mình.'],
        takeaway: 'Tự do đưa ý nghĩa của độc lập từ cấp độ dân tộc đến từng con người.',
        question: 'Dấu hiệu nào thể hiện rõ vai trò người làm chủ?', options: ['Chỉ nhận những quyết định có sẵn', 'Có tiếng nói và quyền tham gia'], correct: 1,
        feedback: ['Chỉ được thông báo chưa đồng nghĩa với làm chủ. Quyền tham gia của người dân mới là điểm cốt lõi.', 'Đúng. Tự do gắn với vị thế chủ thể của người dân, không chỉ với sự thay đổi của bộ máy.'], source: 3,
      },
      {
        date: 'Một tình huống để suy ngẫm', title: 'Một quyền.\nHai cuộc đời.',
        passage: 'Có quyền học tập. Nhưng có thể bước vào lớp học hay chưa?', passageType: 'idea', attribution: 'Tình huống minh họa của nhóm',
        heading: 'Khi quyền gặp những rào cản thực tế',
        paragraphs: ['Hai người đều có quyền học tập. Một người có trường, có sách; người còn lại phải bỏ học vì thiếu ăn.', 'Quyền được ghi nhận là thiết yếu. Để quyền ấy đi vào đời sống, còn cần những điều kiện vật chất, giáo dục và cơ hội tiếp cận thực tế.'],
        takeaway: 'Tự do và điều kiện sống hỗ trợ nhau: quyền cần có khả năng được thực hiện.',
        question: 'Làm gì để quyền học tập trở thành một cơ hội thật?', options: ['Chỉ ghi thêm lời cam kết', 'Gỡ rào cản để người dân được học'], correct: 1,
        feedback: ['Cam kết cần thiết, nhưng chưa đủ nếu người học vẫn không thể đến trường.', 'Đúng. Đây là chiếc cầu từ quyền tự do đến điều kiện sống và phát triển của con người.'], source: 1,
      },
      {
        date: 'Mối liên hệ thứ hai', title: 'Có tiếng nói.\nCó tương lai.',
        passage: 'Đời sống tốt đẹp cần cả quyền làm chủ và điều kiện để phát triển.', passageType: 'idea', attribution: 'Diễn giải của nhóm',
        heading: 'Tự do không tách khỏi hạnh phúc',
        paragraphs: ['Chỉ đáp ứng nhu cầu vật chất mà bỏ qua quyền làm chủ thì chưa phản ánh đầy đủ giá trị con người.', 'Ngược lại, quyền chỉ ở trên giấy cũng chưa đủ. Chính mối liên hệ hai chiều này dẫn chúng ta đến Hạnh phúc: người dân thực sự sống như thế nào?'],
        takeaway: 'Hạnh phúc không thay thế tự do. Tự do là một phần của đời sống hạnh phúc.',
        question: 'Một cuộc sống tốt đẹp cần điều gì?', options: ['Cả quyền làm chủ lẫn điều kiện sống', 'Chỉ cần đời sống vật chất'], correct: 0,
        feedback: ['Đúng. Hai mặt bổ sung cho nhau; không thể dùng mặt này để xóa bỏ mặt kia.', 'Vật chất là thiết yếu, nhưng con người còn cần quyền, phẩm giá và khả năng tự quyết.'], source: 2,
      },
    ],
  },
  {
    id: 'hanhphuc', roman: 'III', title: 'Hạnh phúc', subtitle: 'Hoa trái trong đời sống', question: 'Giá trị ấy hiện ra trong cuộc sống ra sao?', role: 'Mục tiêu và thước đo',
    readings: [
      {
        date: 'Khát vọng vì nhân dân', title: 'Một bữa cơm.\nMột lớp học.',
        passage: 'đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành', passageType: 'quote', attribution: 'Trích lời Hồ Chí Minh, 1946',
        heading: 'Hạnh phúc có một hình hài rất cụ thể',
        paragraphs: ['Hạnh phúc không chỉ là một cảm xúc. Trong khát vọng của Hồ Chí Minh, nó hiện ra qua cơm ăn, áo mặc, học hành và cơ hội phát triển của mỗi người.', 'Những điều bình dị ấy giải thích vì sao chống đói, chống dốt được đặt ra ngay từ buổi đầu của nhà nước mới.'],
        takeaway: 'Hãy nhìn vào cuộc sống của nhân dân để hiểu giá trị của những mục tiêu chính trị.',
        question: 'Dấu hiệu nào giúp kiểm chứng thành quả trong đời sống?', options: ['Một khẩu hiệu được nhắc nhiều lần', 'Người dân được ăn no và học hành'], correct: 1,
        feedback: ['Lời nói cần được kiểm chứng bằng những thay đổi thực tế đối với con người.', 'Đúng. Giá trị được cảm nhận qua những điều kiện sống và cơ hội thực sự của nhân dân.'], source: 4,
      },
      {
        date: '17 tháng 10, 1945', title: 'Độc lập\ncó nghĩa khi…',
        passage: 'nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.', passageType: 'quote', attribution: 'Trích Thư gửi Ủy ban nhân dân, 1945',
        heading: 'Một câu nói nối cả ba cuốn sách',
        paragraphs: ['Trong thư gửi các cấp chính quyền, Hồ Chí Minh đặt hạnh phúc và tự do của dân vào trung tâm trách nhiệm của nhà nước.', 'Độc lập vì thế không tự chứng minh ý nghĩa chỉ bằng sự tồn tại. Ý nghĩa ấy cần được thể hiện ở việc nhân dân có thực sự hưởng tự do và cuộc sống tốt đẹp hay không.'],
        takeaway: 'Hạnh phúc của nhân dân soi trở lại ý nghĩa của nền độc lập.',
        question: 'Quan hệ nào vừa được làm rõ?', options: ['Đời sống nhân dân kiểm chứng ý nghĩa độc lập', 'Hạnh phúc khiến độc lập không còn cần thiết'], correct: 0,
        feedback: ['Đúng. Đây là mối liên hệ quay trở lại, giúp bản đồ ý nghĩa không chỉ là một đường thẳng.', 'Không. Độc lập vẫn là nền tảng; hạnh phúc cho thấy nền tảng ấy có mang lại giá trị cho con người không.'], source: 2,
      },
      {
        date: 'Trở lại câu hỏi ban đầu', title: 'Ba giá trị.\nMột con người.',
        passage: 'Độc lập tạo nền tảng. Tự do mở khả năng. Hạnh phúc thể hiện thành quả.', passageType: 'idea', attribution: 'Sơ đồ diễn giải của nhóm',
        heading: 'Không phải ba khẩu hiệu rời nhau',
        paragraphs: ['Ba cuốn sách là ba góc nhìn vào cùng một mục tiêu: giải phóng và phát triển con người.', 'Trong phạm vi Chương 3, mối liên hệ này làm rõ vì sao độc lập dân tộc gắn với chủ nghĩa xã hội: giải phóng dân tộc phải đi cùng xây dựng đời sống ấm no, tự do, hạnh phúc cho nhân dân.'],
        takeaway: 'Không phải làm xong độc lập mới nghĩ đến tự do và hạnh phúc. Ba giá trị gắn bó trong cùng một mục tiêu.',
        question: 'Một nước độc lập đã đủ để người dân sống tốt chưa?', options: ['Đã đủ, mọi điều khác sẽ tự đến', 'Còn phải hiện thực hóa tự do và hạnh phúc'], correct: 1,
        feedback: ['Không có sự tự động ấy. Chính sách và hành động phải biến mục tiêu thành đời sống thực.', 'Bạn đã nối được ba giá trị. Hãy thử chiếc cân ở phần kết để kiểm chứng lập luận của mình.'], source: 2,
      },
    ],
  },
];

export const mapRelations = [
  { title: 'Độc lập → Tự do', label: 'Tạo nền tảng', text: 'Quyền tự quyết của dân tộc tạo nền tảng để bảo vệ quyền làm chủ của nhân dân. Nhưng độc lập không tự động bảo đảm mọi quyền tự do.' },
  { title: 'Tự do ↔ Hạnh phúc', label: 'Bổ sung cho nhau', text: 'Quyền làm chủ và điều kiện sống hỗ trợ nhau. Quyền học tập cần có trường, có sách; đời sống đủ đầy cũng cần phẩm giá và tiếng nói.' },
  { title: 'Hạnh phúc → Độc lập', label: 'Kiểm chứng ý nghĩa', text: 'Nhân dân thực sự hưởng tự do, hạnh phúc là thước đo ý nghĩa của nền độc lập. Độc lập vẫn là nền tảng cần bảo vệ, không bị thay thế.' },
];
