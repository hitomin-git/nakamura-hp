import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, Clock, MapPin, ChevronRight } from "lucide-react";

const LINE_URL = "https://lin.ee/W4OFa8G";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%B5%A4%E5%9D%822%E4%B8%81%E7%9B%AE21-5%20%E8%97%A4%E5%92%8C%E8%B5%A4%E5%9D%82%E3%82%B3%E3%83%BC%E3%83%97";
const MAP_EMBED =
  "https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%B5%A4%E5%9D%822%E4%B8%81%E7%9B%AE21-5%20%E8%97%A4%E5%92%8C%E8%B5%A4%E5%9D%82%E3%82%B3%E3%83%BC%E3%83%97&output=embed";

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1712232907812-4bd219a99a49?w=1600&h=900&fit=crop&auto=format",
    alt: "静かな和室の空間",
  },
  {
    url: "https://images.unsplash.com/photo-1715388693816-443d278beffb?w=1600&h=900&fit=crop&auto=format",
    alt: "窓から見える緑の森",
  },
  {
    url: "https://images.unsplash.com/photo-1753552502151-93914d36ecf2?w=1600&h=900&fit=crop&auto=format",
    alt: "伝統的な和の室内装飾",
  },
];

const LINE_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M12 2C6.48 2 2 5.86 2 10.6c0 4.24 3.53 7.79 8.3 8.48.32.07.76.21.87.49.1.25.06.64.03.89l-.14.86c-.04.25-.2.99.86.54 1.06-.45 5.73-3.37 7.82-5.77C21.2 13.99 22 12.38 22 10.6 22 5.86 17.52 2 12 2z" />
  </svg>
);

function useScrollFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollFadeUp();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function LineBtnGreen({ label = "かんたんLINE予約", className = "" }: { label?: string; className?: string }) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 bg-[#06C755] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#05a847] transition-colors ${className}`}
    >
      {LINE_ICON}
      <span>{label}</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "施術料金", href: "#pricing" },
    { label: "お客様の声", href: "#voice" },
    { label: "初めての方へ", href: "#first-visit" },
    { label: "アクセス", href: "#footer" },
  ];

  const isLight = scrolled;
  const textColor = isLight ? "text-foreground" : "text-white";
  const textColorMuted = isLight ? "text-foreground/70" : "text-white/80";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isLight
          ? "bg-[#F4F1EA]/96 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-black/50 via-black/20 to-transparent"
      }`}
      style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className={`text-base font-medium tracking-widest transition-colors ${textColor}`}
          style={{ fontFamily: "'Shippori Mincho', serif", letterSpacing: "0.15em" }}
        >
          中村鍼灸整体院
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="relative" onMouseLeave={() => setDropOpen(false)}>
            <button
              className={`flex items-center gap-1 text-sm transition-colors ${textColorMuted} hover:${isLight ? "text-foreground" : "text-white"}`}
              onMouseEnter={() => setDropOpen(true)}
              onClick={() => setDropOpen(!dropOpen)}
            >
              当院について
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropOpen ? "rotate-180" : ""}`} />
            </button>
            {dropOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#F4F1EA] border border-border rounded-lg shadow-lg overflow-hidden">
                <a
                  href="#concept"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setDropOpen(false)}
                >
                  中村鍼灸整体院だからできること
                </a>
                <a
                  href="#greeting"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setDropOpen(false)}
                >
                  ごあいさつ
                </a>
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${textColorMuted}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LineBtnGreen />
        </div>

        <button
          className={`lg:hidden p-2 transition-colors ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#F4F1EA] border-t border-border px-6 py-6 flex flex-col gap-0">
          <a
            href="#concept"
            className="text-sm py-3.5 border-b border-border/50 text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            中村鍼灸整体院だからできること
          </a>
          <a
            href="#greeting"
            className="text-sm py-3.5 border-b border-border/50 text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            ごあいさつ
          </a>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm py-3.5 border-b border-border/50 text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-5">
            <LineBtnGreen className="w-full justify-center" />
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative h-screen min-h-[600px] overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={slide.url} alt={slide.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-16 max-w-5xl">
        <div className="space-y-4">
          <span
            className="inline-block text-white/70 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
          >
            Nakamura Acupuncture &amp; Seitai
          </span>
          <h1
            className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
          >
            動ける身体は、<br />
            人生の<em className="not-italic text-[#A8C29A]">選択肢</em>を増やす。
          </h1>
          <p
            className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
          >
            肩こり、腰痛、不眠、疲れ。<br />
            頑張り続けるあなたの身体に、<br />
            鍼灸と整体で本来の力を取り戻す。
          </p>
          <a
            href="#first-visit"
            className="inline-flex items-center gap-2 text-white border border-white/50 hover:border-white px-6 py-3 text-sm tracking-wider transition-colors hover:bg-white/10 mt-2"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", letterSpacing: "0.1em" }}
          >
            初めての方へ
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
            }`}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-[0.4em] flex flex-col items-center gap-1"
        style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
      >
        <span>SCROLL</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}

function SectionLabel({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="flex flex-col gap-0.5">
        <span
          className="text-accent text-xs tracking-[0.35em] uppercase"
          style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
        >
          {en}
        </span>
        <h2
          className="text-foreground text-2xl md:text-3xl"
          style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
        >
          {ja}
        </h2>
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel en="About Us" ja="当院について" />
      </FadeUp>

      {/* Concept */}
      <div id="concept" className="mb-24">
        <FadeUp>
          <div className="flex items-center gap-3 mb-10 text-muted-foreground">
            <span
              className="text-xs tracking-[0.25em]"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
            >
              01 — Concept
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <FadeUp delay={100}>
            <h3
              className="text-2xl md:text-3xl leading-snug mb-6"
              style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
            >
              中村鍼灸整体院<br />だからできること
            </h3>
            <div className="aspect-[4/3] bg-muted overflow-hidden rounded-sm">
              <img
                src="/room.webp"
                alt="院内の様子"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <p
              className="text-foreground/75 leading-[2] mb-10 text-sm md:text-base"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              その不調は、日々を頑張ってきた証です。中村鍼灸整体院は、鍼灸と整体の技術で身体と丁寧に向き合い、痛みの奥にある原因を見極めながら、本来もつ自然治癒力を引き出す施術をお届けします。初めての方にも安心していただけるよう、まずはお話をじっくり伺うことから始めます。
            </p>

            <ul className="space-y-7">
              {[
                {
                  num: "01",
                  title: "丁寧なカウンセリング",
                  body: "症状だけでなく、生活習慣やお身体の癖まで伺い、根本原因を一緒に見つけていきます。",
                },
                {
                  num: "02",
                  title: "経験に基づく確かな技術",
                  body: "鍼灸と整体、双方の知見を組み合わせ、お一人おひとりに合わせた施術を組み立てます。",
                },
                {
                  num: "03",
                  title: "通いやすい立地と時間",
                  body: "赤坂・溜池山王・六本木一丁目の3駅から、いずれも徒歩5分の立地。お仕事帰りや家事の合間にも立ち寄れます。",
                },
              ].map((item) => (
                <li key={item.num} className="flex gap-5">
                  <span
                    className="text-accent text-xs mt-1 shrink-0 tracking-wider"
                    style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h4
                      className="text-foreground text-sm font-medium mb-1.5"
                      style={{ fontFamily: "'Shippori Mincho', serif" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-foreground/65 text-sm leading-relaxed"
                      style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
                    >
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      {/* Greeting */}
      <div id="greeting">
        <FadeUp>
          <div className="flex items-center gap-3 mb-10 text-muted-foreground">
            <span className="text-xs tracking-[0.25em]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
              02 — Greeting
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <h3
            className="text-2xl md:text-3xl mb-12"
            style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
          >
            ごあいさつ
          </h3>
        </FadeUp>

        <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start">
          <FadeUp delay={150}>
            <div className="text-center md:text-left">
              <div className="w-36 h-36 md:w-full md:aspect-square rounded-full md:rounded-none bg-muted overflow-hidden mx-auto md:mx-0 mb-3">
                <img
                  src="/nakamura_face.jpg"
                  alt="院長 中村勇斗"
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                className="text-xs text-muted-foreground tracking-wide"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                院長　中村 勇斗
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
              <h4
                className="text-base mb-5"
                style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
              >
                院長紹介
              </h4>
              <div className="space-y-4 text-sm leading-[2] text-foreground/75 font-light">
                <p>はじめまして。中村鍼灸整体院 院長の中村です。</p>
                <p>
                  大阪で鍼灸師としてのキャリアをスタートし、海外での解剖研修や東京・港区での臨床経験を経て、この赤坂の地に開院いたしました。
                </p>
                <p>
                  「とりあえず楽になりたい」ではなく、「なぜこの不調が起きているのか」を正しく知りたい方へ。当院は、その問いに真剣に向き合いたい方のための場所です。完全プライベートな空間で、誰にも急かされることなく、ご自身の身体とじっくり向き合う時間をご提供します。
                </p>
                <p>まずはお気軽にご相談ください。「なんとなく」から、より良い一歩を始めましょう。</p>
              </div>

              <div className="mt-6 mb-8 border-l-2 border-accent pl-4">
                <div
                  className="text-base"
                  style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
                >
                  院長　中村 勇斗
                </div>
                <div className="text-xs text-muted-foreground tracking-widest mt-0.5">nakamura yuto</div>
              </div>

              <h4
                className="text-sm mb-4"
                style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
              >
                経歴
              </h4>
              <ul className="space-y-2 text-sm text-foreground/65 font-light">
                {[
                  "1999年　大阪府生まれ",
                  "はり師・きゅう師　国家資格取得",
                  "大阪府内の鍼灸整体院に勤務",
                  "海外にて解剖学研修に参加",
                  "東京都港区の美容鍼灸整体院に勤務",
                  "月1回、札幌にて施術を担当",
                  "中村鍼灸整体院　開院（2027年予定）",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-accent mt-1.5 text-[6px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "#EDEAE2" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <SectionLabel en="Price" ja="施術料金" />
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <FadeUp delay={100}>
            <div className="bg-[#F4F1EA] p-8 md:p-10">
              <h3
                className="text-base mb-1"
                style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
              >
                施術料金
              </h3>
              <p
                className="text-xs text-muted-foreground mb-6"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                （90分）
              </p>
              <table className="w-full text-sm" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 font-medium text-foreground/60 text-xs tracking-wider">メニュー</th>
                    <th className="text-right pb-3 font-medium text-foreground/60 text-xs tracking-wider">料金（税込）</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "初回施術", price: "¥9,000" },
                    { name: "鍼灸整体", price: "¥18,000" },
                    { name: "鍼灸整体＋美容鍼", price: "¥21,000" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td
                        className="py-4 text-foreground"
                        style={{ fontFamily: "'Shippori Mincho', serif" }}
                      >
                        {row.name}
                      </td>
                      <td className="py-4 text-right text-foreground font-medium">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div>
              <h3
                className="text-base mb-5"
                style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
              >
                【医療費控除】について
              </h3>
              <p
                className="text-sm text-foreground/70 leading-relaxed mb-7 font-light"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                当院は保健所へ正式に開設届を提出している鍼灸院となります。そのため症状改善を目的とした鍼灸施術に関しては、医療費控除の対象となる場合がございます。
              </p>
              <ol className="space-y-5">
                {[
                  {
                    num: "01",
                    title: "医療費控除の対象になる可能性がある",
                    body: "肩こり・腰痛・頭痛・自律神経症状など、治療目的の施術は医療費控除の対象として扱われる場合があります。",
                  },
                  {
                    num: "02",
                    title: "確定申告時に活用できる",
                    body: "領収書を保管いただくことで、確定申告時の医療費控除申請にご利用いただけます。",
                  },
                  {
                    num: "03",
                    title: "実質的なご負担軽減に繋がる場合がある",
                    body: "医療費控除を活用することで、税負担の軽減に繋がるケースもございます。",
                  },
                ].map((item) => (
                  <li key={item.num} className="flex gap-4" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                    <span className="text-accent text-xs mt-0.5 shrink-0 tracking-wider font-medium">{item.num}</span>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-1" style={{ fontFamily: "'Shippori Mincho', serif" }}>
                        {item.title}
                      </h5>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-muted-foreground mt-6 leading-relaxed font-light" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                ※ 美容目的の施術は対象外となる場合があります。<br />
                ※ 詳細は税務署または顧問税理士様へご確認ください。
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function VoiceSection() {
  const voices = [
    { body: "長年悩んでいた肩こりが、通ううちにずいぶん楽になりました。丁寧な説明で毎回安心して施術を受けられます。", who: "40代・女性" },
    { body: "歩くのもつらかった腰痛が嘘のようです。もっと早く来ればよかったと思っています。", who: "60代・男性" },
    { body: "鍼が初めてで不安でしたが、痛みはほとんどなく、施術後は身体が軽くなりました。", who: "30代・女性" },
  ];

  return (
    <section id="voice" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel en="Customer's Voice" ja="お客様の声" />
        <p
          className="text-sm text-foreground/60 -mt-6 mb-12 font-light"
          style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
        >
          実際に通っていただいているお客様からいただいたお声の一部をご紹介します。
        </p>
      </FadeUp>

      <div className="grid md:grid-cols-3 gap-6">
        {voices.map((v, i) => (
          <FadeUp key={i} delay={i * 100}>
            <div className="bg-[#EDEAE2] p-7 flex flex-col gap-4 h-full">
              <span
                className="text-accent text-4xl leading-none"
                style={{ fontFamily: "'Shippori Mincho', serif" }}
              >
                "
              </span>
              <p
                className="text-sm text-foreground/75 leading-[2] flex-1 font-light"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                {v.body}
              </p>
              <div
                className="text-xs text-muted-foreground tracking-wide pt-2 border-t border-border"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                {v.who}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function FirstVisitSection() {
  const [openQ, setOpenQ] = useState<number | null>(null);

  const steps = [
    { num: "01", title: "ご予約", body: "LINEにてご希望の日時をご連絡ください。" },
    { num: "02", title: "問診・カウンセリング", body: "お身体の状態や生活習慣について、じっくりお話を伺います。" },
    { num: "03", title: "施術", body: "カウンセリングをもとに、鍼灸・整体を組み合わせて施術いたします。" },
    { num: "04", title: "アフターケア", body: "今後の通院ペースやセルフケアの方法をご案内し、次回のご予約を承ります。" },
  ];

  const faqs = [
    {
      q: "施術は痛いですか？",
      a: "髪の毛ほどの細さの鍼を使用するため、痛みを感じる方は少ないです。ツボに鍼が入ると「ひびき」と呼ばれる独特の鈍い感覚が出ることがありますが、これは鍼がしっかり効いているサインです。",
    },
    {
      q: "どのような服装で伺えばいいですか？",
      a: "普段着のままお越しいただいて問題ありません。院内に着替えもご用意しておりますので、動きやすい服装がなくてもご安心ください。",
    },
    {
      q: "施術時間はどれくらいですか？",
      a: "コースにより異なりますが、初診の方はカウンセリングを含めて60〜90分ほどお時間をいただいております。",
    },
    {
      q: "使用する鍼は使い捨てですか？",
      a: "当院ではディスポーザブル（使い捨て）の鍼を使用しており、使い回しは一切ございません。感染症等のご心配なくお受けいただけます。",
    },
  ];

  return (
    <section
      id="first-visit"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "#EDEAE2" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <SectionLabel en="For First-time Visitors" ja="初めての方へ" />
          <p
            className="text-sm text-foreground/60 -mt-6 mb-14 font-light"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
          >
            ご来院からお会計までの流れと、よくいただくご質問をまとめました。
          </p>
        </FadeUp>

        {/* Flow */}
        <FadeUp delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {steps.map((step, i) => (
              <div key={i}>
                <div
                  className="text-accent text-xs tracking-[0.2em] mb-3"
                  style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 500 }}
                >
                  {step.num}
                </div>
                <div className="w-full h-px bg-border mb-4" />
                <h3
                  className="text-sm font-medium mb-2"
                  style={{ fontFamily: "'Shippori Mincho', serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs text-foreground/60 leading-relaxed font-light"
                  style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* FAQ */}
        <FadeUp delay={150}>
          <h3
            className="text-lg mb-6"
            style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
          >
            よくあるご質問
          </h3>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-border last:border-b">
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-foreground/80 transition-colors"
                  onClick={() => setOpenQ(openQ === i ? null : i)}
                  style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
                >
                  <span className="flex items-center gap-3 text-sm">
                    <span className="text-accent font-medium text-xs">Q</span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${
                      openQ === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openQ === i && (
                  <p
                    className="pb-5 text-sm text-foreground/65 leading-[2] pl-6 font-light"
                    style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="mt-12 text-center">
            <p
              className="text-sm text-foreground/60 mb-5 font-light"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
            >
              ご不明な点がございましたら、お気軽にLINEよりお問い合わせください。
            </p>
            <LineBtnGreen label="LINEで相談・予約する" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  const weekdays = ["月", "火", "水", "木", "金", "土", "日祝"];

  return (
    <footer id="footer" className="bg-primary text-primary-foreground pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12">
          <div>
            <div
              className="text-xl mb-2"
              style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500, letterSpacing: "0.1em" }}
            >
              中村鍼灸整体院
            </div>
            <p
              className="text-primary-foreground/50 text-xs tracking-widest mb-8"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
            >
              Nakamura Acupuncture &amp; Seitai
            </p>

            <div className="space-y-2 text-sm text-primary-foreground/70 mb-6" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>〒107-0052　東京都港区赤坂２丁目２１−５　藤和赤坂コープ</span>
              </div>
              <div className="flex gap-2 items-start">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>10:00〜21:00（最終受付 19:30）　定休日：不定休</span>
              </div>
            </div>

            <div className="mb-6">
              <table className="text-xs border-collapse" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
                <thead>
                  <tr>
                    {weekdays.map((d) => (
                      <th key={d} className="w-8 h-8 text-primary-foreground/40 font-normal border border-primary-foreground/10">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {weekdays.map((d) => (
                      <td key={d} className="w-8 h-8 text-center text-accent border border-primary-foreground/10">
                        ○
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <LineBtnGreen />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/70 border border-primary-foreground/20 hover:border-primary-foreground/50 text-sm px-5 py-2.5 rounded-full transition-colors"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
              >
                マップを見る →
              </a>
            </div>
          </div>

          <div className="h-64 md:h-auto bg-primary/50 rounded-sm overflow-hidden">
            <iframe
              src={MAP_EMBED}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="中村鍼灸整体院 地図"
              className="w-full h-full min-h-[200px]"
            />
          </div>
        </div>

        <nav
          className="flex flex-wrap gap-5 text-xs text-primary-foreground/40 border-t border-primary-foreground/10 pt-6 mb-4"
          style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
        >
          {[
            { label: "トップページ", href: "#top" },
            { label: "当院について", href: "#about" },
            { label: "施術料金", href: "#pricing" },
            { label: "お客様の声", href: "#voice" },
            { label: "初めての方へ", href: "#first-visit" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary-foreground/70 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div
          className="flex flex-col sm:flex-row justify-between text-[11px] text-primary-foreground/30 gap-1"
          style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
        >
          <span>© 中村鍼灸整体院</span>
          <span>はり師・きゅう師 国家資格保有</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const weekdays = ["月", "火", "水", "木", "金", "土", "日祝"];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          className="bg-primary text-primary-foreground rounded-lg shadow-2xl p-5 w-64"
          style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-primary-foreground/70">ただいま受付中</span>
          </div>
          <h4
            className="text-sm font-medium mb-3"
            style={{ fontFamily: "'Shippori Mincho', serif" }}
          >
            診察時間・予約
          </h4>
          <table className="text-xs border-collapse w-full mb-2">
            <thead>
              <tr>
                {weekdays.map((d) => (
                  <th key={d} className="text-center p-1 text-primary-foreground/40 font-normal border border-primary-foreground/10 text-[10px]">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekdays.map((d) => (
                  <td key={d} className="text-center p-1 text-accent border border-primary-foreground/10 text-[10px]">
                    ○
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] text-primary-foreground/50 mb-3 leading-relaxed">
            10:00〜21:00（最終受付 19:30）<br />定休日：不定休
          </p>
          <p className="text-[11px] text-primary-foreground/50 mb-4 leading-relaxed">
            〒107-0052　東京都港区赤坂２丁目２１−５　藤和赤坂コープ
            <br />
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              マップを見る →
            </a>
          </p>
          <LineBtnGreen label="LINEで予約する" className="w-full justify-center text-xs" />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-primary-foreground w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="診察時間・予約"
      >
        {open ? <X className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
    >
      <Header />
      <Hero />
      <AboutSection />
      <PricingSection />
      <VoiceSection />
      <FirstVisitSection />
      <Footer />
      <FloatingWidget />
    </div>
  );
}
