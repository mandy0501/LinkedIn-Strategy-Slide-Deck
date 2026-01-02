import { SlideData } from '../types';

export const defaultSlides: SlideData[] = [
  {
    id: '1',
    type: 'intro',
    title: 'LinkedIn 經營攻略',
    subtitle: '履歷被看見！打造你的數位莊園',
    author: 'Robin Hsu',
    items: [
      { text: '數據真相', icon: 'check-circle' },
      { text: '被動求職', icon: 'check-circle' },
      { text: '流量密碼', icon: 'check-circle' },
      { text: '冠軍思維', icon: 'check-circle' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '2',
    type: 'agenda',
    title: 'Agenda',
    items: [
      { text: '思維重塑 (Mindset Shift)', subtext: '紅海 vs 藍海，為什麼 99% 的人都在做白工？' },
      { text: '門面優化 (Profile Optimization)', subtext: '決策者視角：如何通過黃金六秒的考驗？' },
      { text: '人脈佈局 (Networking Strategy)', subtext: '破解 80% 隱藏市場：校友、弱連結與主動出擊。' },
      { text: '內功心法 (The Inner Game)', subtext: '頂尖人才的社交貨幣、自我投資、OMO線上+線下連結。' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '3',
    type: 'concept',
    title: '為什麼你需要 LinkedIn ?',
    subtitle: '模組一：思維重塑',
    callout: 'Q: 你認為 LinkedIn 和 104/人力銀行最大的差別是什麼？\n104 是「比價」的紅海 (靜態)；LinkedIn 是「價值談判」的藍海 (動態)。',
    items: [
      { text: '莊園理論', subtext: '傳統求職是打獵 (餓了才去狩獵)；LinkedIn 是經營莊園 (系統性的培育、灌溉、繁衍... 永續耕耘豐富的資源！' },
      { text: 'PR99原則', subtext: '99%的認為它是靜態履歷；頂尖的Top1將把它視為24小時曝光的舞台/自我品牌。' },
      { text: '隱藏市場', subtext: '80% 的好職缺未公開，是透過「人脈」、被(獵頭)搜尋」成交的。' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '4',
    type: 'concept',
    title: '2026 三大關鍵趨勢',
    subtitle: '模組一：思維重塑',
    items: [
      { text: '圖片、影音優先', subtext: '演算法與眼球都愛視覺化的真實感，一定要圖文並茂 (影片更加分)。', icon: 'video' },
      { text: '真實性', subtext: '不要只寫 Job Description，要寫你的掙扎、失敗與成長故事。', icon: 'heart' },
      { text: 'AI是你的職涯副駕駛', subtext: '善用各式AI收集素材，提升質量，但是一定要有個人觀點，空泛的廢文會被降權。', icon: 'bot' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '5',
    type: 'concept',
    title: '決策者視角：黃金六秒法則',
    subtitle: '模組二：黃金檔案優化',
    callout: 'Q: 當我打開你的 Profile，我只花 6 秒決定是否聯繫。我看哪裡？\nHeadline(技能/關鍵字)、產業/職能經歷(相關性)、照片 (專業/信任感)。',
    codeBlock: {
        title: 'Headline 優化公式',
        content: '[職能角色] + [具體成果] + [專業領域]\n\n❌ Senior Engineer\n✅ Senior Backend Dev | Helping FinTech Scale to 1M Users | Python & Go Expert'
    },
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '6',
    type: 'concept',
    title: '關於我 (About) 的寫作策略',
    subtitle: '模組二：黃金檔案優化',
    items: [
      { text: '不要寫：我是誰，我做了什麼' },
      { text: '要寫：我能解決誰的痛苦' },
      { text: '技巧：埋入 JD (Job Description) 關鍵字以利 SEO' },
      { text: '結構：Hook (鉤子) → Story (職涯故事) → Achievement (量化數據) → CTA (互動性)' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '7',
    type: 'concept',
    title: '主動出擊的連結策略',
    subtitle: '模組三：人脈與求職',
    callout: 'Q: 申請工作前，除了等待，你還能做什麼？\n主動出擊、找出有效連結甚至是產業前輩、HR人員。',
    items: [
      { text: '客製化邀請內容', subtext: '不發送空白邀請：說明「你是誰」+「為何連結」+「我欣賞你的觀點」。' },
      { text: '朋友的朋友還是你的朋友', subtext: '利用地區、學歷、證照、社群，找出在目標公司的學長姐，這是最容易的切入點。' },
      { text: '勇敢邀約面談 (Coffee Chat)', subtext: '不求職缺，只求指點。問：行業面臨挑戰？」、轉職可能會遇到什麼門檻」。' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '8',
    type: 'concept',
    title: '社交貨幣 | 人脈存摺',
    subtitle: '模組四：內功心法',
    items: [
      { text: '留言矩陣：每天 15 分鐘，去同領域專家的文章下留「高價值觀點」。' },
      { text: '成就他人：轉發或讚美他人的成就，是獲取好感的最快捷徑。' },
      { text: '弱連結：神奇的轉職機會，可能來自「多年只見一次面」、僅在LinkedIn互動過」的朋友。' },
      { text: '提供(情緒)價值：升官、轉職、下午茶、下車文....通通給他愛心刷一排！' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '9',
    type: 'concept',
    title: '頂尖人才的自我修煉',
    subtitle: '模組四：內功心法',
    callout: 'Q: 如何確保持續輸出高品質的內容？\n線上影響力，源自於線下的「飽讀詩書」與「高品質輸入」',
    items: [
      { text: '極致的自我投資 (Input)', subtext: '「打開你的 iPhone/iPad 耗電分析，時間都花在哪裡？。」分配時間給吸收相關領域的新知與提升技能。你的輸出品質，決定了你的身價。' },
      { text: '走出去 (Output)', subtext: 'LinkedIn 是放大器，不是製造機。多參加實體活動與論壇，面對面淬煉出「有效社交」，再將這些連結帶回線上經營。' }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '10',
    type: 'concept',
    title: '打造你的LinkedIn數位莊園',
    subtitle: '立即行動',
    items: [
      { text: '檔案建檢：Headline 套用公式、照片專業化、About用彙整寫法', icon: 'check-circle', highlight: true },
      { text: '固定發文：發表活動心得、考照成就、職場金句、人生格言', icon: 'check-circle', highlight: true },
      { text: '社交投資：每天 15 分鐘、去留言、去按讚、去轉發、去建立新連結', icon: 'check-circle', highlight: true },
      { text: '時間分配：關注產業新知、少滑短影音、多用LinkedIn', icon: 'check-circle', highlight: true },
      { text: '人脈連結：每月參加一場活動、鎖定目標交換名片、強迫自己要有收穫！', icon: 'check-circle', highlight: true }
    ],
    footerText: '2026 LinkedIn Strategy'
  },
  {
    id: '11',
    type: 'outro',
    title: '現在就建立連結！',
    author: 'Robin Hsu',
    subtitle: '電商總監 & 職涯教練',
    content: 'https://www.linkedin.com/in/robin-hsu-2b59a9a5',
    items: [
      { text: '『年紀越大，機會越多！』', subtext: '這是我最近在一場聚會上，聽到最有感觸的一段話' },
      { text: '『讓人殺職的不是公司，而是主管。』', subtext: '商計經典題目，什麼樣的公司會吸引你？團隊氣氛' },
      { text: '『你知道嗎？只要你比其他主管健康，你就贏了』', subtext: '同事在得知某主管因病生倒病後，脫口說了這句話。' }
    ],
    footerText: '2026 LinkedIn Strategy'
  }
];