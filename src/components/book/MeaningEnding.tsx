'use client';

import { useState, type CSSProperties } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { mapRelations } from '@/content/library';

export function MeaningEnding({ onRead }: { onRead: (index: number) => void }) {
  const [weights, setWeights] = useState<string[]>([]);
  const [relation, setRelation] = useState(0);
  const freedom = weights.includes('freedom');
  const happiness = weights.includes('happiness');
  const complete = freedom && happiness;
  const decoy = weights.includes('symbol');
  const toggle = (id: string) => setWeights(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  return <section className="ending-scene scene-enter" aria-labelledby="ending-title">
    <div className="ending-intro"><span className="eyebrow">Lời kết · Chiếc cân của độc lập</span><h1 id="ending-title">Độc lập để<br /><em>nhân dân sống tốt.</em></h1>
      <p>Đĩa trái đã có độc lập. Điều gì ở đĩa phải làm cho nền độc lập ấy có ý nghĩa với con người?</p>
      <div className="scale-options">{[{ id: 'symbol', text: 'Thêm một danh xưng' }, { id: 'freedom', text: 'Quyền làm chủ' }, { id: 'happiness', text: 'Đời sống ấm no' }].map(item => <button key={item.id} aria-pressed={weights.includes(item.id)} onClick={() => toggle(item.id)}>{weights.includes(item.id) ? <Check size={16} /> : <span>+</span>}{item.text}</button>)}</div>
      <p className="scale-feedback" role="status">{complete ? 'Bạn đã nối được cả ba giá trị. Quyền làm chủ và đời sống tốt đẹp cùng làm sáng tỏ ý nghĩa của độc lập.' : freedom ? 'Đã có tiếng nói của người dân. Còn cần điều kiện sống để những quyền ấy trở thành thực tế.' : happiness ? 'Đã có đời sống vật chất. Nhưng hạnh phúc còn cần tự do, phẩm giá và quyền làm chủ.' : decoy ? 'Một danh xưng mới không tự làm thay đổi cuộc sống. Chiếc cân này đo ý nghĩa, không đo hình thức.' : 'Chọn các yếu tố để thử lập luận của bạn.'}</p>
    </div>
    <div className={`scale-exhibit ${complete ? 'is-balanced' : ''}`}>
      <div className="balance" role="img" aria-label={complete ? 'Chiếc cân cân bằng: độc lập gắn với tự do và hạnh phúc' : 'Chiếc cân chưa cân bằng'}>
        <div className="balance-pillar" /><div className="balance-base" />
        <div className="balance-beam" style={{ '--angle': complete ? '0deg' : freedom || happiness ? '-6deg' : '-13deg' } as CSSProperties}>
          <div className="balance-pan pan-left"><div className="pan-content">Độc lập</div></div>
          <div className="balance-pan pan-right"><div className="pan-content">{freedom && <span>Tự do</span>}{happiness && <span>Hạnh phúc</span>}{!freedom && !happiness && <span>?</span>}</div></div>
        </div><span className="balance-pin" />
      </div>
      <blockquote>{complete ? '“nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì.”' : 'Điều gì làm cho độc lập có ý nghĩa?'}<cite>{complete ? 'Hồ Chí Minh · Thư gửi Ủy ban nhân dân, 17.10.1945' : 'Một mô hình diễn giải, không phải phép đo định lượng.'}</cite></blockquote>
    </div>
    <div className="meaning-links"><div className="relation-tabs" aria-label="Ba mối liên hệ">{mapRelations.map((item, i) => <button key={item.title} aria-pressed={relation === i} onClick={() => setRelation(i)}><span>{item.label}</span><strong>{item.title}</strong></button>)}</div><p aria-live="polite">{mapRelations[relation].text}</p><button className="text-button" onClick={() => onRead(relation)}>Đọc lại luận điểm <ArrowRight size={15} /></button></div>
  </section>;
}
