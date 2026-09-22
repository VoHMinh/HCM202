/* Crop only the isolated sheets supplied by the user. The overview is reference only. */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const temp = process.env.TEMP;
const sources = {
  'hanh-phuc': 'd2de51dc-d640-41a0-9e10-54fd08d69d2c',
  items: '5093ac83-fe35-4199-86ea-6ff2bc7f9c05',
  tiles: '62b331bc-93c0-4a5e-a419-62d531fb65e1',
  icons: 'e51fc14e-fac2-46c1-9ef6-77f751a9af44',
  buildings: '082d5623-9271-4be8-86fc-5af891544bcc',
  panels: '718e364f-6b36-4340-8c74-4b9247812cef',
  characters: '998c2d53-93e2-4684-9d84-217371ed49d3',
  'doc-lap': '3e279fad-01dd-4015-8087-9098dfca0b8b',
  seasons: '560a922a-4160-4e7c-9c49-f8eaa616a2df',
  'tu-do': '25aa2543-0a30-4a28-a271-6d777105f90c',
};
const crops = [];
function add(sheet, name, box, plantStage) { crops.push({ sheet, name, box, plantStage }); }
function grid(sheet, names, xs, ys, folder = sheet) {
  names.forEach((name, i) => { const col = i % (xs.length - 1), row = Math.floor(i / (xs.length - 1)); add(sheet, `${folder}/${name}`, [xs[col], ys[row], xs[col + 1] - xs[col], ys[row + 1] - ys[row]]); });
}
[[0,220,520,345],[610,0,580,576],[0,575,578,655],[578,575,676,655]].forEach((b,i) => add('doc-lap', `plants/doc-lap/stage-${i+1}`, b, i+1));
[[0,670,246,190],[247,560,263,301],[510,425,350,436],[860,355,394,506]].forEach((b,i) => add('hanh-phuc', `plants/hanh-phuc/stage-${i+1}`, b, i+1));
[[0,780,252,255],[253,560,251,475],[505,420,316,615],[822,240,432,795]].forEach((b,i) => add('tu-do', `plants/tu-do/stage-${i+1}`, b, i+1));
grid('items', ['score','water','seed','wood','stone','fertilizer','shield','knowledge','harvest-glow','damage','balance','warning'], [0,390,735,1095,1448], [0,395,728,1086]);
grid('tiles', ['soil-empty','soil-planted','grass','stone-path','pond','rice-field','cottage','river-house','bush','rocks','lotus','landscape'], [0,362,724,1086,1448], [0,335,707,1086]);
grid('characters', ['doi-idle','doi-attack','dot-idle','dot-attack','thief-run','thief-idle','gardener','farmer','scholar','harvester'], [0,277,567,825,1154,1448], [0,545,1086]);
grid('seasons', ['season-1','season-2','season-3','season-4'], [0,373,737,1074,1448], [225,868]);
const buildings = [ ['fence-wood',[0,165,376,370]],['fence-quyen',[376,145,368,390]],['wall-stone',[744,225,400,310]],['flag',[1144,0,304,550]],['gate-pham-gia',[0,550,493,530]],['gate-stone',[493,552,431,528]],['watchtower',[924,525,270,555]],['warning-lantern',[1194,550,254,530]] ];
buildings.forEach(([n,b]) => add('buildings', `buildings/${n}`, b));
grid('icons', ['plant','harvest','defense','steal','trophy','hourglass','info','settings','gong','home'], [0,300,584,869,1145,1448], [0,351,638], 'ui');
[['mail',[0,638,340,260]],['avatar',[340,638,263,260]],['round-frame',[603,630,350,270]],['panel',[953,645,495,253]],['button-paper',[0,900,728,186]],['button-red',[728,900,720,186]]].forEach(([n,b]) => add('icons',`ui/${n}`,b));
[['popup-giac-doi',[10,25,532,564]],['popup-bat-dau-mua-4',[542,45,461,543]],['leaderboard',[10,590,984,486]],['toast-bi-trom',[1003,48,445,128]],['toast-thu-hoach',[1003,179,445,120]],['toast-xay-hang-rao',[1003,300,445,118]],['toast-the-tri-thuc',[1003,419,445,122]],['toast-bi-tan-cong',[1003,542,445,143]]].forEach(([n,b]) => add('panels',`ui/${n}`,b));

async function trimAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0=info.width,y0=info.height,x1=0,y1=0;
  for(let y=0;y<info.height;y++) for(let x=0;x<info.width;x++) if(data[(y*info.width+x)*4+3]>25){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}
  return sharp(input).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).png().toBuffer();
}
async function main() {
  await fs.mkdir(path.join(root,'public/raw-assets'),{recursive:true});
  for(const [name,id] of Object.entries(sources)) {
    const to=path.join(root,`public/raw-assets/${name}-sheet.png`);
    try { await fs.access(to); } catch { await fs.copyFile(path.join(temp,`codex-clipboard-${id}.png`),to); }
  }
  const manifest = {};
  const characterRaw = await sharp(path.join(root,'public/raw-assets/characters-sheet.png')).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const cw=characterRaw.info.width, ch=characterRaw.info.height, seen=new Uint8Array(cw*ch), components=[];
  for(let p=0;p<cw*ch;p++){
    if(seen[p]||characterRaw.data[p*4+3]<25)continue;
    const q=[p];seen[p]=1;
    for(let i=0;i<q.length;i++){const k=q[i],x=k%cw;for(const n of [x>0?k-1:-1,x<cw-1?k+1:-1,k-cw,k+cw])if(n>=0&&n<cw*ch&&!seen[n]&&characterRaw.data[n*4+3]>=25){seen[n]=1;q.push(n);}}
    if(q.length>20000)components.push(q);
  }
  const seeds=[[140,330],[430,320],[685,340],[995,355],[1300,330],[190,820],[470,785],[710,780],[990,780],[1290,780]];
  for(const crop of crops) {
    const [left,top,width,height]=crop.box;
    let buffer=await sharp(path.join(root,`public/raw-assets/${crop.sheet}-sheet.png`)).extract({left,top,width,height}).png().toBuffer();
    if(crop.sheet==='characters') {
      const idx=crops.filter(c=>c.sheet==='characters').indexOf(crop), [sx,sy]=seeds[idx];
      const distances=components.map(q=>{let x=0,y=0;q.forEach(p=>{x+=p%cw;y+=Math.floor(p/cw)});return Math.hypot(x/q.length-sx,y/q.length-sy)});
      const q=components[distances.indexOf(Math.min(...distances))];
      const pixels=Buffer.alloc(cw*ch*4);q.forEach(p=>characterRaw.data.copy(pixels,p*4,p*4,p*4+4));
      buffer=await sharp(pixels,{raw:{width:cw,height:ch,channels:4}}).png().toBuffer();
    }
    buffer=await trimAlpha(buffer);
    if(crop.plantStage){
      const size=[175,285,390,480][crop.plantStage-1];
      const resized=await sharp(buffer).resize({width:size,height:size,fit:'inside'}).png().toBuffer();
      const m=await sharp(resized).metadata();
      buffer=await sharp({create:{width:512,height:512,channels:4,background:'#00000000'}}).composite([{input:resized,left:Math.floor((512-m.width)/2),top:500-m.height}]).png().toBuffer();
    }
    const rel=`/assets/game/${crop.name}.png`;
    await fs.mkdir(path.dirname(path.join(root,'public',rel)),{recursive:true});
    await fs.writeFile(path.join(root,'public',rel),buffer);
    manifest[crop.name]=rel;
  }
  await fs.mkdir(path.join(root,'src/lib'),{recursive:true});
  await fs.writeFile(path.join(root,'src/lib/assets-manifest.ts'),`// Generated by scripts/prepare-game-assets.cjs.\nexport const GAME_ASSETS = ${JSON.stringify(manifest,null,2)} as const;\nexport type GameAsset = keyof typeof GAME_ASSETS;\nexport type PlantType = 'doc-lap' | 'tu-do' | 'hanh-phuc';\nexport type PlantStage = 1 | 2 | 3 | 4;\nexport const plantAsset = (type: PlantType, stage: PlantStage) => GAME_ASSETS[\`plants/\${type}/stage-\${stage}\`];\n`);
  const thumbs=await Promise.all(crops.map(async (c,i)=>({input:await sharp(path.join(root,`public/assets/game/${c.name}.png`)).resize(130,130,{fit:'contain',background:'#ded2b4'}).png().toBuffer(),left:(i%8)*140,top:Math.floor(i/8)*140})));
  await fs.mkdir(path.join(root,'artifacts'),{recursive:true});
  await sharp({create:{width:1120,height:Math.ceil(crops.length/8)*140,channels:4,background:'#ded2b4'}}).composite(thumbs).png().toFile(path.join(root,'artifacts/game-asset-contact-sheet.png'));
  console.log(`Prepared ${crops.length} assets and TypeScript manifest.`);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
