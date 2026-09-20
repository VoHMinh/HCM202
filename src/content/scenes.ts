// src/content/scenes.ts
// TOÀN BỘ chữ nghĩa của sản phẩm nằm ở đây. Component chỉ import và render.
// Quy tắc: mỗi màn hình hiển thị tối đa ~40 chữ cùng lúc, phần dài đẩy vào SourceCard.
//
// ⚠️ TRƯỚC KHI NỘP: mọi Source có verified === false phải được đối chiếu với
// Hồ Chí Minh Toàn tập (NXB Chính trị quốc gia Sự thật, 2011) và điền số tập/trang.

import type {
  DecisionRow,
  Edge,
  HappinessCard,
  Layer,
  LayerMeta,
  QuizItem,
  RightCard,
  RightGroup,
  SceneCopy,
  SceneId,
  Source,
} from './types';

/* =========================================================
   0. LUẬN ĐIỂM TRỤC
   ========================================================= */

export const THESIS =
  'Trong tư tưởng Hồ Chí Minh, Độc lập – Tự do – Hạnh phúc không phải ba khẩu hiệu đặt cạnh nhau ' +
  'mà là một hệ mục tiêu có thứ tự và có kiểm chứng: độc lập là điều kiện, tự do là nội dung, ' +
  'hạnh phúc là thước đo — và chính hạnh phúc của nhân dân mới chứng minh nền độc lập có ý nghĩa thực tế hay không.';

export const PROJECT = {
  title: 'BA GIÁ TRỊ — MỘT HÀNH TRÌNH',
  subtitle: 'Khám phá mối quan hệ Độc lập – Tự do – Hạnh phúc trong tư tưởng Hồ Chí Minh',
  courseCode: 'HCM202 · HCM-TT-C3-02 · Chương 3',
  scopeNote:
    'Sản phẩm tập trung vào mối quan hệ giữa ba giá trị theo các văn kiện giai đoạn 1919–1966, ' +
    'không bao quát toàn bộ tư tưởng Hồ Chí Minh.',
  disclaimer:
    'Các tình huống giả định trong sản phẩm là bài tập logic khái niệm, không mô tả hay đánh giá một quốc gia có thật.',
} as const;

/* =========================================================
   1. BA TẦNG MỤC TIÊU
   ========================================================= */

export const layers: Record<Layer, LayerMeta> = {
  political: {
    id: 'political',
    label: 'Chính trị',
    valueId: 'doc-lap',
    subject: 'Dân tộc / quốc gia',
    testQuestion: 'Dân tộc có quyền tự quyết vận mệnh của mình không?',
    ifMissing: 'Mọi quyền đều do bên ngoài ban phát, và có thể bị thu hồi bất cứ lúc nào.',
  },
  social: {
    id: 'social',
    label: 'Xã hội',
    valueId: 'tu-do',
    subject: 'Công dân trong xã hội',
    testQuestion: 'Người dân có quyền làm chủ và các quyền cơ bản không?',
    ifMissing: 'Độc lập chỉ đổi người cai trị, người dân vẫn không làm chủ.',
  },
  human: {
    id: 'human',
    label: 'Con người',
    valueId: 'hanh-phuc',
    subject: 'Từng con người cụ thể',
    testQuestion: 'Con người có điều kiện sống, học hành và phát triển không?',
    ifMissing: 'Quyền chỉ nằm trên giấy, chưa trở thành đời sống.',
  },
};

export const LAYER_CAVEAT =
  'Đây là cách phân tầng để làm rõ trọng tâm, không phải khẳng định mỗi giá trị chỉ thuộc đúng một tầng. ' +
  'Nội hàm ba giá trị giao nhau: tự do vừa là quyền chính trị, vừa là điều kiện của hạnh phúc.';

/* =========================================================
   2. NGUỒN TRỰC TIẾP
   ========================================================= */

export const sources: Source[] = [
  {
    id: 'yeu-sach-1919',
    year: 1919,
    date: '18/6/1919',
    title: 'Yêu sách của nhân dân An Nam gửi Hội nghị Versailles',
    publication: 'Ký tên Nguyễn Ái Quốc, gửi các đoàn đại biểu tại Hội nghị Versailles, Pháp',
    quote:
      'Tự do báo chí và tự do ngôn luận; tự do lập hội và hội họp; tự do cư trú ở nước ngoài và tự do xuất dương; ' +
      'tự do học tập, thành lập các trường kỹ thuật và chuyên nghiệp ở tất cả các tỉnh cho người bản xứ.',
    gloss:
      'Ngay từ văn bản chính trị đầu tiên, yêu cầu đưa ra không phải độc lập trừu tượng mà là những quyền rất cụ thể ' +
      'của con người. Tự do không phải phần thêm vào sau độc lập — nó có mặt ngay từ đầu.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.1, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['tu-do'],
    layer: 'social',
  },
  {
    id: 'viet-minh-1941',
    year: 1941,
    date: '1941',
    title: 'Chương trình Việt Minh / Kính cáo đồng bào',
    publication: 'Mặt trận Việt Minh',
    quote: 'Đem lại cho đồng bào tự do và hạnh phúc.',
    gloss:
      'Mục tiêu của cách mạng được nêu ngay từ 1941 không dừng ở đánh đuổi ngoại xâm, mà đã bao gồm tự do và hạnh phúc ' +
      'của nhân dân. Ba giá trị đi cùng nhau từ trước khi có nhà nước độc lập.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.3, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['intro', 'doc-lap'],
    layer: 'political',
  },
  {
    id: 'tuyen-ngon-1945',
    year: 1945,
    date: '2/9/1945',
    title: 'Tuyên ngôn Độc lập',
    publication: 'Đọc tại Quảng trường Ba Đình, Hà Nội',
    quote: 'Tất cả mọi người đều sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; ' +
      'trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc.',
    gloss:
      'Thao tác lập luận then chốt: Hồ Chí Minh mở đầu bằng quyền của CON NGƯỜI rồi suy rộng thành quyền của DÂN TỘC. ' +
      'Nghĩa là quyền dân tộc được đặt nền trên quyền con người, chứ không thay thế nó.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.4, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['doc-lap', 'meaning-map'],
    layer: 'political',
  },
  {
    id: 'nhiem-vu-cap-bach-1945',
    year: 1945,
    date: '3/9/1945',
    title: 'Những nhiệm vụ cấp bách của Nhà nước Việt Nam Dân chủ Cộng hòa',
    publication: 'Phiên họp đầu tiên của Chính phủ lâm thời',
    quote:
      'Nhân dân đang đói… Tôi đề nghị với Chính phủ là phát động một chiến dịch tăng gia sản xuất… ' +
      'Nạn dốt là một trong những phương pháp độc ác mà bọn thực dân dùng để cai trị chúng ta… ' +
      'Tôi đề nghị mở một chiến dịch chống nạn mù chữ.',
    gloss:
      'Sáu nhiệm vụ cấp bách đặt chống đói và chống dốt NGANG HÀNG với tổng tuyển cử và tự do tín ngưỡng. ' +
      'Đây là bằng chứng trực tiếp rằng mục tiêu con người và mục tiêu chính trị được xử lý đồng thời.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.4, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['hanh-phuc', 'meaning-map'],
    layer: 'human',
  },
  {
    id: 'sac-lenh-49',
    year: 1945,
    date: '12/10/1945',
    title: 'Sắc lệnh số 49 về tiêu đề công văn, giấy tờ',
    publication: 'Chủ tịch Chính phủ Việt Nam Dân chủ Cộng hòa ký ban hành',
    quote:
      'Xét vì cần nêu cao một kỷ nguyên mới để đánh dấu vào lịch sử nước ta, những độc lập, tự do và hạnh phúc ' +
      'mà chính thể dân chủ cộng hòa mang lại cho dân chúng.',
    gloss:
      'Đây là căn cứ pháp lý giải thích vì sao sáu chữ Độc lập – Tự do – Hạnh phúc trở thành tiêu ngữ quốc gia: ' +
      'chúng được xác định là thành quả mà chính thể mới phải mang lại cho dân, tức là một cam kết, không phải một khẩu hiệu.',
    citation: 'Công báo Việt Nam Dân chủ Cộng hòa, 1945 (CẦN ĐỐI CHIẾU BẢN GỐC)',
    verified: false,
    usedIn: ['intro', 'outro'],
    layer: 'political',
  },
  {
    id: 'thu-ubnd-1945',
    year: 1945,
    date: '17/10/1945',
    title: 'Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng',
    publication: 'Báo Cứu quốc',
    quote:
      'Ngày nay, chúng ta đã xây dựng nên nước Việt Nam Dân chủ Cộng hòa. Nhưng nếu nước độc lập mà dân không hưởng ' +
      'hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.',
    gloss:
      'Câu trích trung tâm của cả bài. Nó thiết lập quan hệ KIỂM CHỨNG: đời sống của nhân dân là thước đo thực tế ' +
      'về ý nghĩa của nền độc lập. Chỉ 45 ngày sau Tuyên ngôn Độc lập.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.4, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['meaning-map', 'missing-value', 'scale', 'outro'],
    layer: 'human',
  },
  {
    id: 'kien-quoc-1946',
    year: 1946,
    date: '10/1/1946',
    title: 'Nói chuyện tại Ủy ban Nghiên cứu kế hoạch kiến quốc',
    publication: 'Phiên họp đầu tiên của Ủy ban',
    quote:
      'Chúng ta phải thực hiện ngay: làm cho dân có ăn; làm cho dân có mặc; làm cho dân có chỗ ở; ' +
      'làm cho dân có học hành.',
    gloss:
      'Hạnh phúc được cụ thể hóa thành bốn điều kiện vật chất và văn hóa đo đếm được. Đây là lý do 7 thẻ ở Chặng 3 ' +
      'không phải do nhóm tự nghĩ ra.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.4, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['hanh-phuc'],
    layer: 'human',
  },
  {
    id: 'khong-co-gi-quy-hon-1966',
    year: 1966,
    date: '17/7/1966',
    title: 'Lời kêu gọi chống Mỹ, cứu nước',
    publication: 'Phát trên Đài Tiếng nói Việt Nam',
    quote:
      'Không có gì quý hơn độc lập, tự do. Đến ngày thắng lợi, nhân dân ta sẽ xây dựng lại đất nước ta ' +
      'đàng hoàng hơn, to đẹp hơn.',
    gloss:
      'Rất nhiều bài chỉ trích vế đầu. Vế sau mới là điểm mấu chốt: ngay trong câu khẳng định giá trị tối cao của ' +
      'độc lập, Hồ Chí Minh đã hướng ngay tới việc xây dựng đời sống. Độc lập không phải điểm kết thúc.',
    citation: 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.15, tr.— (CẦN ĐỐI CHIẾU)',
    verified: false,
    usedIn: ['doc-lap', 'outro'],
    layer: 'political',
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s])) as Record<string, Source>;

/* =========================================================
   3. BA CẠNH MEANING MAP
   ========================================================= */

export const edges: Edge[] = [
  {
    id: 'A',
    from: 'doc-lap',
    to: 'tu-do',
    relationLabel: 'điều kiện',
    thesis: 'Chủ quyền dân tộc là điều kiện tiên quyết để nhân dân có thể làm chủ.',
    mechanism:
      'Khi quyền lực nhà nước còn nằm trong tay ngoại bang, mọi quyền tự do của người dân chỉ là thứ được ban phát ' +
      'và có thể bị thu hồi. Phải có người quyết định cuối cùng là chính dân tộc thì quyền mới có chỗ đứng vững chắc.',
    counterpoint:
      'Nhưng độc lập chỉ là điều kiện CẦN, không phải điều kiện ĐỦ. Một quốc gia có chủ quyền vẫn có thể để dân ' +
      'không được hưởng quyền nào.',
    sourceIds: ['tuyen-ngon-1945', 'yeu-sach-1919'],
  },
  {
    id: 'B',
    from: 'tu-do',
    to: 'hanh-phuc',
    relationLabel: 'hiện thực hóa',
    thesis: 'Tự do phải được chuyển hóa thành điều kiện sống thực tế thì mới có nghĩa.',
    mechanism:
      'Quyền học tập không có trường và không biết chữ thì rỗng. Quyền bầu cử mà không đọc được lá phiếu thì rỗng. ' +
      'Vì vậy chống đói và chống dốt được đặt ngang hàng với tổng tuyển cử ngay trong phiên họp đầu tiên của Chính phủ.',
    counterpoint:
      'Ngược lại, chỉ lo đời sống vật chất mà không có quyền làm chủ thì con người được nuôi chứ không được ' +
      'tự quyết. Hai vế phải đi cùng nhau.',
    sourceIds: ['nhiem-vu-cap-bach-1945', 'kien-quoc-1946'],
  },
  {
    id: 'C',
    from: 'hanh-phuc',
    to: 'doc-lap',
    relationLabel: 'kiểm chứng',
    thesis: 'Đời sống của nhân dân là thước đo thực tế về ý nghĩa của nền độc lập.',
    mechanism:
      'Đây là cạnh biến sơ đồ tuyến tính thành vòng lặp có kiểm chứng. Nền độc lập không tự chứng minh giá trị ' +
      'của mình bằng việc tồn tại; nó được chứng minh qua việc người dân có thực sự hưởng tự do và hạnh phúc hay không.',
    counterpoint:
      'Điều này không có nghĩa độc lập chỉ là phương tiện. Không có độc lập thì không có chủ thể nào chịu trách nhiệm ' +
      'về đời sống của dân — nên quan hệ ở đây là kiểm chứng lẫn nhau, không phải thay thế.',
    sourceIds: ['thu-ubnd-1945', 'khong-co-gi-quy-hon-1966'],
  },
];

/* =========================================================
   4. PAYLOAD TỪNG SCENE
   ========================================================= */

const decisionRows: DecisionRow[] = [
  {
    id: 'lap-phap',
    question: 'Ai làm ra luật trên đất nước này?',
    holderLocked: 'Chính quyền bảo hộ',
    holderUnlocked: 'Nhân dân Việt Nam',
    note: 'Không tự làm ra luật thì mọi quyền đều là quyền đi xin.',
  },
  {
    id: 'thue',
    question: 'Ai định ra các thứ thuế và thu thuế?',
    holderLocked: 'Chính quyền bảo hộ',
    holderUnlocked: 'Nhân dân Việt Nam',
    note: 'Thuế thân, thuế chợ, thuế đò là những thứ bị bãi bỏ ngay sau 2/9/1945.',
  },
  {
    id: 'chien-tranh',
    question: 'Ai quyết định chiến tranh và hòa bình?',
    holderLocked: 'Chính quyền bảo hộ',
    holderUnlocked: 'Nhân dân Việt Nam',
    note: 'Đây là quyền phân biệt rõ nhất giữa một quốc gia và một thuộc địa.',
  },
  {
    id: 'doi-ngoai',
    question: 'Ai đại diện quốc gia trước thế giới?',
    holderLocked: 'Chính quyền bảo hộ',
    holderUnlocked: 'Nhân dân Việt Nam',
    note: 'Tuyên ngôn Độc lập 2/9/1945 chính là hành động thực hiện quyền này.',
  },
  {
    id: 'chon-nguoi-cam-quyen',
    question: 'Ai chọn người cầm quyền?',
    holderLocked: 'Chính quyền bảo hộ',
    holderUnlocked: 'Nhân dân Việt Nam',
    note: 'Tổng tuyển cử được đặt trong nhóm nhiệm vụ cấp bách nhất của nhà nước mới.',
  },
];

const rightGroups: RightGroup[] = [
  { id: 'civil', label: 'Quyền dân sự — thân thể', hint: 'Con người được bảo vệ khỏi sự tùy tiện.' },
  { id: 'political', label: 'Quyền chính trị — làm chủ', hint: 'Con người tham gia quyết định việc nước.' },
  { id: 'socioeconomic', label: 'Quyền kinh tế — xã hội — văn hóa', hint: 'Con người có điều kiện sống và phát triển.' },
];

const rightCards: RightCard[] = [
  { id: 'than-the', emoji: '🧍', label: 'Tự do thân thể', group: 'civil', misplaceHint: 'Đây là quyền bảo vệ con người khỏi bị bắt bớ tùy tiện — thuộc nhóm dân sự.' },
  { id: 'tin-nguong', emoji: '🕊️', label: 'Tự do tín ngưỡng', group: 'civil', misplaceHint: 'Tín ngưỡng thuộc đời sống tinh thần cá nhân, nhà nước không can thiệp — nhóm dân sự.' },
  { id: 'ngon-luan', emoji: '🗣️', label: 'Tự do ngôn luận', group: 'civil', misplaceHint: 'Là quyền của cá nhân được nói, trước khi là công cụ chính trị — nhóm dân sự.' },
  { id: 'binh-dang', emoji: '⚖️', label: 'Bình đẳng trước pháp luật', group: 'civil', misplaceHint: 'Yêu sách 1919 đòi người Việt được bảo đảm pháp lý như người Âu — nhóm dân sự.' },
  { id: 'bau-cu', emoji: '🗳️', label: 'Quyền bầu cử', group: 'political', misplaceHint: 'Bầu cử là cách người dân trao và thu quyền lực — nhóm chính trị.' },
  { id: 'ung-cu', emoji: '🙋', label: 'Quyền ứng cử', group: 'political', misplaceHint: 'Không chỉ được chọn, mà còn được ra làm — nhóm chính trị.' },
  { id: 'viec-nuoc', emoji: '🏛️', label: 'Quyền tham gia việc nước', group: 'political', misplaceHint: 'Làm chủ nghĩa là tham gia, không chỉ đi bỏ phiếu — nhóm chính trị.' },
  { id: 'hoc-tap', emoji: '📚', label: 'Quyền học tập', group: 'socioeconomic', misplaceHint: 'Nhiều người xếp nhầm vào nhóm dân sự. Học tập cần trường lớp, thầy cô, chi phí — nó là điều kiện xã hội, và chính vì vậy nó là cầu nối sang Hạnh phúc.' },
  { id: 'lam-viec', emoji: '🛠️', label: 'Quyền làm việc', group: 'socioeconomic', misplaceHint: 'Có việc làm là điều kiện kinh tế, không phải quyền tự do cá nhân thuần túy.' },
  { id: 'nghi-ngoi', emoji: '🌤️', label: 'Quyền nghỉ ngơi', group: 'socioeconomic', misplaceHint: 'Nghỉ ngơi chỉ có thật khi lao động được tổ chức và bảo vệ — nhóm kinh tế xã hội.' },
];

const happinessCards: HappinessCard[] = [
  { id: 'com-an', emoji: '🍚', label: 'Cơm ăn — diệt giặc đói', cost: 3, unlocks: 'root', note: 'Nhiệm vụ cấp bách số một, ngày 3/9/1945.' },
  { id: 'hoc-hanh', emoji: '📚', label: 'Học hành — diệt giặc dốt', cost: 3, unlocks: 'trunk', note: 'Đặt ngang hàng với chống đói, không phải sau nó.' },
  { id: 'ao-mac', emoji: '👕', label: 'Áo mặc', cost: 2, unlocks: 'branch', note: 'Một trong bốn điều phải làm ngay, 10/1/1946.' },
  { id: 'cho-o', emoji: '🏠', label: 'Chỗ ở', cost: 2, unlocks: 'branch', note: 'Một trong bốn điều phải làm ngay, 10/1/1946.' },
  { id: 'suc-khoe', emoji: '❤️', label: 'Chăm sóc sức khỏe', cost: 2, unlocks: 'leaf', note: 'Con người phải khỏe thì mới nói đến phát triển.' },
  { id: 'tham-gia', emoji: '🤝', label: 'Tham gia xã hội — tổng tuyển cử', cost: 3, unlocks: 'leaf', note: 'Hạnh phúc không chỉ là được nuôi, mà là được góp phần.' },
  { id: 'pham-gia', emoji: '⚖️', label: 'Quyền và phẩm giá', cost: 2, unlocks: 'flower', requires: ['com-an', 'hoc-hanh'], note: 'Cây chỉ nở hoa khi đã có rễ: phẩm giá khó giữ khi người ta còn đói và mù chữ.' },
];

const quizItems: QuizItem[] = [
  {
    id: 'q1',
    situation:
      'Một cộng đồng được bảo đảm đời sống vật chất khá đầy đủ, nhưng mọi quyết định quan trọng đều do một thế lực bên ngoài đưa ra.',
    answerIds: ['doc-lap'],
    explanation:
      'No đủ do người khác ban phát thì có thể bị thu lại bất cứ lúc nào. Không có quyền tự quyết thì không có gì bảo đảm cho chính sự no đủ ấy.',
    nudge: 'Gần rồi — hãy thử hỏi: ai là người quyết định cuối cùng trong tình huống này?',
    sourceIds: ['tuyen-ngon-1945'],
  },
  {
    id: 'q2',
    situation:
      'Một quốc gia có chủ quyền đầy đủ, nhưng người dân không được hưởng các quyền cơ bản và đời sống không được bảo đảm.',
    answerIds: ['tu-do', 'hanh-phuc'],
    explanation:
      'Đây đúng là tình huống Hồ Chí Minh cảnh báo trong thư ngày 17/10/1945: nước độc lập mà dân không hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì.',
    nudge: 'Tình huống này thiếu nhiều hơn một mắt xích. Thử đặt thêm một viên nữa.',
    sourceIds: ['thu-ubnd-1945'],
  },
  {
    id: 'q3',
    situation:
      'Hiến pháp ghi đủ mọi quyền tự do, nhưng phần lớn người dân không biết chữ, không có việc làm và không được chăm sóc y tế.',
    answerIds: ['hanh-phuc'],
    explanation:
      'Quyền trên giấy chưa phải quyền trong đời sống. Đây chính là cạnh B: tự do phải được hiện thực hóa thành điều kiện sống thì mới có nghĩa.',
    nudge: 'Các quyền đã được ghi nhận rồi. Vậy cái còn thiếu nằm ở tầng nào?',
    sourceIds: ['nhiem-vu-cap-bach-1945', 'kien-quoc-1946'],
  },
  {
    id: 'q4',
    situation:
      'Người dân mong muốn được học hành, có đời sống tốt hơn và được phát triển bản thân. Nguyện vọng này thuộc mục tiêu nào?',
    answerIds: ['hanh-phuc'],
    explanation:
      'Đây là tầng con người. Phân biệt được ba tầng chính trị — xã hội — con người nghĩa là bạn đã nắm được cấu trúc của cả hệ giá trị.',
    nudge: 'Hãy nhìn vào chủ thể: ở đây là từng con người cụ thể, hay là dân tộc?',
    sourceIds: ['kien-quoc-1946'],
  },
];

/* =========================================================
   5. COPY TỪNG SCENE
   ========================================================= */

export const scenes: Record<SceneId, SceneCopy> = {
  /* ---------- SCENE 0 ---------- */
  intro: {
    id: 'intro',
    index: 0,
    kicker: 'HCM202 · Chương 3',
    title: 'ĐỘC LẬP – TỰ DO – HẠNH PHÚC',
    lead: [
      'Bạn đã nhìn thấy sáu chữ này hàng nghìn lần.',
      'Trên mọi đơn từ, mọi công văn, mọi giấy khai sinh.',
      '',
      'Nhưng chúng chỉ đứng cạnh nhau trên một tiêu ngữ,',
      'hay chúng là ba mắt xích của cùng một hệ mục tiêu?',
    ],
    instruction: 'Di chuyển con trỏ để đọc dòng tiêu ngữ.',
    cta: 'BẮT ĐẦU HÀNH TRÌNH',
    sourceIds: ['sac-lenh-49', 'viet-minh-1941'],
    estimatedSeconds: [25, 40],
  },

  /* ---------- SCENE 1 ---------- */
  'doc-lap': {
    id: 'doc-lap',
    index: 1,
    layer: 'political',
    kicker: 'CHẶNG 1 · MỤC TIÊU CHÍNH TRỊ',
    title: 'ĐỘC LẬP',
    lead: ['Một dân tộc cần gì để tự quyết định tương lai của mình?'],
    instruction: 'Kéo con dấu “NHÂN DÂN VIỆT NAM” vào từng quyết định để chuyển quyền quyết định về tay dân tộc.',
    definition: {
      term: 'ĐỘC LẬP',
      body:
        'Chủ quyền quốc gia cộng với quyền dân tộc tự quyết. Không một quyền nào của người dân là vững chắc ' +
        'nếu người quyết định cuối cùng không phải là chính dân tộc đó.',
    },
    transition: {
      prompt: [
        'Năm 1945, nước đã độc lập.',
        'Nhưng hơn hai triệu người vừa chết đói. Hơn chín mươi phần trăm dân số không biết chữ.',
        'Như vậy đã đủ chưa?',
      ],
      choices: [
        {
          id: 'du',
          label: 'Đã đủ',
          response:
            'Hãy thử hỏi người vừa mất người thân vì đói xem nền độc lập ấy đã thay đổi được gì cho họ. ' +
            'Câu hỏi này không có ý bác bỏ giá trị của độc lập — nó hỏi độc lập để làm gì.',
        },
        {
          id: 'chua-du',
          label: 'Chưa đủ',
          isPreferred: true,
          response:
            'Hồ Chí Minh cũng nghĩ vậy. Và Người viết điều đó ra giấy chỉ bốn mươi lăm ngày sau Tuyên ngôn Độc lập.',
        },
      ],
    },
    cta: 'MỞ CÁNH CỬA THỨ HAI',
    sourceIds: ['viet-minh-1941', 'tuyen-ngon-1945', 'khong-co-gi-quy-hon-1966'],
    estimatedSeconds: [60, 90],
    payload: { decisionRows },
  },

  /* ---------- SCENE 2 ---------- */
  'tu-do': {
    id: 'tu-do',
    index: 2,
    layer: 'social',
    kicker: 'CHẶNG 2 · MỤC TIÊU XÃ HỘI',
    title: 'TỰ DO',
    lead: [
      'Đây là hồ sơ một công dân của nước Việt Nam mới, năm 1945.',
      'Bà Tám, 34 tuổi, làm ruộng ở Thái Bình, không biết chữ.',
      'Bà vừa trở thành người làm chủ đất nước. Vậy bà có những quyền gì?',
    ],
    instruction: 'Kéo từng tấm thẻ quyền vào đúng nhóm. Xếp nhầm cũng không sao — bạn sẽ được giải thích.',
    definition: {
      term: 'TỰ DO',
      body:
        'Người dân thực sự làm chủ: làm chủ thân thể, làm chủ tiếng nói, làm chủ nhà nước, ' +
        'và làm chủ chính đời sống của mình.',
    },
    transition: {
      prompt: [
        'Bà Tám bây giờ có quyền bầu cử.',
        'Nhưng bà không biết chữ, nên không đọc được lá phiếu.',
        'Quyền này đã thực sự được thực hiện chưa?',
      ],
      choices: [
        {
          id: 'roi',
          label: 'Đã thực hiện — quyền đã được ghi nhận',
          response:
            'Quyền đã được ghi nhận, nhưng chưa được thực hiện. Khoảng cách giữa hai điều đó chính là nội dung của chặng tiếp theo.',
        },
        {
          id: 'chua',
          label: 'Chưa — quyền trên giấy chưa phải quyền trong đời sống',
          isPreferred: true,
          response:
            'Chính xác. Và đó là lý do vì sao trong phiên họp đầu tiên của Chính phủ lâm thời, ' +
            'chống nạn mù chữ được đặt ngang hàng với tổ chức tổng tuyển cử.',
        },
      ],
    },
    cta: 'ĐI TIẾP',
    sourceIds: ['yeu-sach-1919', 'tuyen-ngon-1945'],
    estimatedSeconds: [90, 120],
    payload: { rightGroups, rightCards },
  },

  /* ---------- SCENE 3 ---------- */
  'hanh-phuc': {
    id: 'hanh-phuc',
    index: 3,
    layer: 'human',
    kicker: 'CHẶNG 3 · MỤC TIÊU CON NGƯỜI',
    title: 'HẠNH PHÚC',
    lead: [
      'Bạn có mười đơn vị nguồn lực và ba năm: 1945, 1946, 1947.',
      'Không đủ để làm tất cả cùng lúc.',
      'Hãy chọn thứ tự ưu tiên để nuôi lớn cây hạnh phúc của nhân dân.',
    ],
    instruction: 'Kéo thẻ vào cây. Mỗi lượt chỉ tiêu được số nguồn lực còn lại.',
    definition: {
      term: 'HẠNH PHÚC',
      body:
        'Không phải một cảm xúc. Trong tư tưởng Hồ Chí Minh, đó là điều kiện sống và phát triển thật sự của ' +
        'từng con người: ai cũng có cơm ăn áo mặc, ai cũng được học hành.',
    },
    transition: {
      prompt: [
        'Chính phủ lâm thời cũng đứng trước đúng bài toán này vào ngày 3 tháng 9 năm 1945.',
        'Hai việc được đặt lên đầu danh sách là diệt giặc đói và diệt giặc dốt — ngang hàng với tổng tuyển cử.',
      ],
      choices: [
        {
          id: 'tiep',
          label: 'Xem lại lựa chọn của tôi',
          isPreferred: true,
          response: 'Cây của bạn phản ánh thứ tự ưu tiên bạn đã chọn. Không có đáp án duy nhất, nhưng có đáp án có rễ và đáp án không có rễ.',
        },
      ],
    },
    cta: 'LÙI LẠI VÀ NHÌN TOÀN CẢNH',
    sourceIds: ['nhiem-vu-cap-bach-1945', 'kien-quoc-1946'],
    estimatedSeconds: [90, 120],
    payload: { happinessCards, budget: 10, rounds: ['1945', '1946', '1947'] },
  },

  /* ---------- SCENE 4 ---------- */
  'meaning-map': {
    id: 'meaning-map',
    index: 4,
    kicker: 'SƠ ĐỒ Ý NGHĨA',
    title: 'BA CHẶNG VỪA RỒI LÀ MỘT SƠ ĐỒ',
    lead: [
      'Đây là sơ đồ thường gặp: một chiều, từ trái sang phải.',
      'Nhưng nó còn thiếu một cạnh.',
    ],
    instruction: 'Kéo một đường nối từ HẠNH PHÚC trở về ĐỘC LẬP. Sau đó bấm vào từng cạnh để xem vì sao chúng liên hệ với nhau.',
    definition: {
      term: 'BA TẦNG MỤC TIÊU',
      body: LAYER_CAVEAT,
    },
    cta: 'THỬ MỘT THỬ THÁCH',
    sourceIds: ['thu-ubnd-1945', 'tuyen-ngon-1945', 'nhiem-vu-cap-bach-1945'],
    estimatedSeconds: [90, 150],
    payload: { edges, requiredDiscoveries: 3, counterLabel: 'CONNECTIONS DISCOVERED' },
  },

  /* ---------- SCENE 5 ---------- */
  'missing-value': {
    id: 'missing-value',
    index: 5,
    kicker: 'THỬ THÁCH',
    title: 'NẾU THIẾU MỘT GIÁ TRỊ?',
    lead: [PROJECT.disclaimer],
    instruction: 'Kéo viên đá còn thiếu vào ô trống. Có tình huống thiếu nhiều hơn một.',
    cta: 'ĐẾN MÀN CUỐI',
    sourceIds: ['thu-ubnd-1945'],
    estimatedSeconds: [90, 120],
    payload: { quizItems },
  },

  /* ---------- SCENE 6 ---------- */
  scale: {
    id: 'scale',
    index: 6,
    kicker: 'KẾT',
    title: 'CHIẾC CÂN CỦA ĐỘC LẬP',
    lead: ['Một bên đĩa cân đã có ĐỘC LẬP.', 'Hãy đặt vào bên còn lại thứ làm cho nó có nghĩa.'],
    instruction: 'Kéo các khối vào đĩa cân bên phải.',
    transition: {
      prompt: ['Cân đã thăng bằng.', 'Nhưng nó đang đo cái gì?'],
      choices: [
        {
          id: 'thu-lai',
          label: 'Thử lại với khối khác',
          isPreferred: true,
          response: 'Hai khối độc lập cân nhau chỉ cho ta sự cân bằng hình thức. Chiếc cân này đo ý nghĩa, không đo trọng lượng.',
        },
      ],
    },
    cta: 'XEM KẾT LUẬN',
    sourceIds: ['thu-ubnd-1945'],
    estimatedSeconds: [60, 90],
    payload: {
      leftBlock: 'doc-lap',
      solution: ['tu-do', 'hanh-phuc'],
      decoyFeedback: 'Cân đã thăng bằng. Nhưng nó đang đo cái gì?',
      revealQuote: sourceById['thu-ubnd-1945'].quote,
      revealAttribution:
        'Hồ Chí Minh, Thư gửi Ủy ban nhân dân các kỳ, tỉnh, huyện và làng, báo Cứu quốc, 17/10/1945',
      typewriterMsPerChar: 35,
    },
  },

  /* ---------- SCENE 7 ---------- */
  outro: {
    id: 'outro',
    index: 7,
    kicker: 'KẾT LUẬN',
    title: 'ĐỘC LẬP KHÔNG PHẢI ĐIỂM KẾT THÚC',
    lead: [
      'Độc lập tạo điều kiện cho tự do.',
      'Tự do phải trở thành đời sống thật của con người.',
      'Và hạnh phúc của nhân dân là thước đo ý nghĩa của chính nền độc lập ấy.',
    ],
    instruction: PROJECT.scopeNote,
    cta: 'XEM TOÀN BỘ NGUỒN TRỰC TIẾP',
    sourceIds: sources.map((s) => s.id),
    estimatedSeconds: [40, 60],
    payload: {
      timelineYears: [1919, 1941, 1945, 1946, 1966],
      credits: {
        courseCode: PROJECT.courseCode,
        citationNote:
          'Nhóm đối chiếu các trích dẫn theo Hồ Chí Minh Toàn tập, NXB Chính trị quốc gia Sự thật, 2011.',
        imageCreditNote: 'Ảnh tư liệu: ghi rõ nguồn từng ảnh tại đây trước khi nộp.',
      },
    },
  },
};

export const sceneOrder: SceneId[] = [
  'intro',
  'doc-lap',
  'tu-do',
  'hanh-phuc',
  'meaning-map',
  'missing-value',
  'scale',
  'outro',
];

/* =========================================================
   6. KIỂM TRA LÚC DEV — cảnh báo nguồn chưa đối chiếu
   ========================================================= */

if (process.env.NODE_ENV !== 'production') {
  const unverified = sources.filter((s) => !s.verified).map((s) => s.id);
  if (unverified.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `[content] ${unverified.length} nguồn chưa đối chiếu Hồ Chí Minh Toàn tập: ${unverified.join(', ')}`,
    );
  }
}
