import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAtlas } from "../atlas/context";
import { store } from "../store/store";

const LEVELS = [
  ["A2", "پایه", "واژه‌های روزمره‌ات هنوز محکم نیست"],
  ["B1", "میانی", "هدف ۵.۵  – 6 نمره"],
  ["B2", "متوسط-بالا", "هدف ۶.۵  – 7 نمره"],
  ["C1", "پیشرفته", "هدف بالای ۷.۵"],
];

export function Onboarding() {
  const atlas = useAtlas();
  const [level, setLevel] = useState(1);
  const [goal, setGoal] = useState(10);
  const finish = () => store.settings({ onboarded: true, startLevel: atlas.cefr.indexOf(LEVELS[level][0]), dailyNew: goal });
  return (
    <div className="onboard" role="dialog" aria-modal="true" aria-label="خوش آمدی">
      <div className="onboard-card">
        <img className="onboard-art" src={`${import.meta.env.BASE_URL}brand/hero.webp`} alt="" />
        <div className="onboard-body">
          <p className="eyebrow">به واژه‌نگار خوش آمدی</p>
          <h1 className="display">
            {atlas.count.toLocaleString()} ستاره،
            <br />
            منتظر روشن‌شدن‌اند، یکی‌یکی.
          </h1>
          <fieldset>
            <legend>از کجا شروع می‌کنی؟</legend>
            <div className="choice-grid">
              {LEVELS.map(([code, name, desc], i) => (
                <button key={code} className={`choice ${level === i ? "is-on" : ""}`} onClick={() => setLevel(i)} aria-pressed={level === i}>
                  <span className={`chip chip-level lv-${code}`}>{code}</span>
                  <b>{name}</b>
                  <small>{desc}</small>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>روزی چند ستاره تازه روشن کنی؟</legend>
            <div className="segmented segmented-wide">
              {[5, 10, 15, 20].map((n) => (
                <button key={n} className={goal === n ? "is-on" : ""} onClick={() => setGoal(n)} aria-pressed={goal === n}>
                  {n} ستاره{n === 10 ? " · پیشنهادی"  : ""}
                </button>
              ))}
            </div>
          </fieldset>
          <button className="btn btn-primary btn-xl" onClick={finish}>
            شروع  <ArrowRight size={20} />
          </button>
          <p className="muted">ثبت‌نام لازم نیست. پیشروی فقط روی همین دستگاه می‌ماند و هر وقت بخواهی از «پروفایل» تغییرش می‌دهی.</p>
        </div>
      </div>
    </div>
  );
}
