// src/content/types.ts
// Kiểu dữ liệu cho toàn bộ nội dung. Component KHÔNG được hardcode chữ,
// mọi chuỗi văn bản đều đi qua các interface dưới đây.

export type SceneId =
  | 'intro'
  | 'doc-lap'
  | 'tu-do'
  | 'hanh-phuc'
  | 'meaning-map'
  | 'missing-value'
  | 'scale'
  | 'outro';

export type ValueId = 'doc-lap' | 'tu-do' | 'hanh-phuc';

/** Ba tầng mục tiêu — đáp ứng ràng buộc "phân biệt mục tiêu chính trị, xã hội, con người" */
export type Layer = 'political' | 'social' | 'human';

export interface LayerMeta {
  id: Layer;
  label: string;          // 'Chính trị'
  valueId: ValueId;
  subject: string;        // 'Dân tộc / quốc gia'
  testQuestion: string;
  ifMissing: string;
}

/** Nguồn trực tiếp — mỗi mục là 1 Source Card + 1 điểm trên timeline */
export interface Source {
  id: string;
  year: number;
  date: string;           // '17/10/1945' — để rỗng nếu chỉ biết năm
  title: string;
  publication: string;    // nơi công bố
  quote: string;          // NGUYÊN VĂN, render trong ngoặc kép + serif nghiêng
  gloss: string;          // diễn giải của nhóm, render sans-serif thường
  citation: string;       // 'Hồ Chí Minh Toàn tập, NXB CTQG Sự thật, 2011, t.?, tr.?'
  verified: boolean;      // false = CHƯA đối chiếu Toàn tập, phải hiện cảnh báo dev
  usedIn: SceneId[];
  layer: Layer;
}

/** Ba cạnh của meaning map — phần "ruột" của bài */
export interface Edge {
  id: 'A' | 'B' | 'C';
  from: ValueId;
  to: ValueId;
  relationLabel: string;  // 'điều kiện' | 'hiện thực hóa' | 'kiểm chứng'
  thesis: string;
  mechanism: string;
  counterpoint: string;   // phản đề / giới hạn — chỗ ăn điểm tư duy phản biện
  sourceIds: string[];
}

export interface Choice {
  id: string;
  label: string;
  isPreferred?: boolean;
  response: string;       // phản hồi sau khi chọn, KHÔNG dùng chữ "SAI"
}

/** Khung copy dùng chung cho mọi scene */
export interface SceneCopy {
  id: SceneId;
  index: number;
  layer?: Layer;
  kicker?: string;        // nhãn nhỏ phía trên tiêu đề
  title: string;
  lead?: string[];        // các dòng dẫn, mỗi phần tử là 1 dòng
  instruction?: string;   // hướng dẫn 1 dòng ở footer
  definition?: {
    term: string;
    body: string;
  };
  transition?: {          // câu hỏi bản lề cuối màn
    prompt: string[];
    choices: Choice[];
  };
  cta: string;            // chữ trên nút chính
  sourceIds: string[];
  estimatedSeconds: [number, number];
  /** payload riêng của từng scene, xem các interface bên dưới */
  payload?: unknown;
}

/* ---------- payload riêng từng scene ---------- */

export interface DecisionRow {
  id: string;
  question: string;       // 'Ai làm ra luật?'
  holderLocked: string;   // 'Chính quyền thực dân'
  holderUnlocked: string; // 'Nhân dân Việt Nam'
  note: string;           // hiện sau khi mở khóa
}

export interface RightCard {
  id: string;
  emoji: string;
  label: string;
  group: 'civil' | 'political' | 'socioeconomic';
  misplaceHint: string;   // giải thích khi người chơi xếp nhầm
}

export interface RightGroup {
  id: RightCard['group'];
  label: string;
  hint: string;
}

export interface HappinessCard {
  id: string;
  emoji: string;
  label: string;
  cost: number;
  unlocks: 'root' | 'trunk' | 'branch' | 'leaf' | 'flower';
  requires?: string[];    // id thẻ phải có trước
  note: string;
}

export interface QuizItem {
  id: string;
  situation: string;
  answerIds: ValueId[];   // có câu 2 đáp án
  explanation: string;
  nudge: string;          // gợi ý khi trả lời chưa đúng
  sourceIds: string[];
}
