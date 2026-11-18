import type { CSSProperties } from "react";
import { financials, formatMillions } from "./case-data";

const [revenue, goods, stores, profit] = financials;
const afterRevenue = profit.prior + (revenue.current - revenue.prior);
const afterGoods = afterRevenue - (goods.current - goods.prior);
const afterStores = afterGoods - (stores.current - stores.prior);

const rows = [
  { label: "Year 1 operating profit", from: 0, to: profit.prior, type: "total" },
  { label: "Revenue gain", from: profit.prior, to: afterRevenue, type: "gain" },
  { label: "Higher cost of goods", from: afterRevenue, to: afterGoods, type: "loss" },
  { label: "Higher store expenses", from: afterGoods, to: afterStores, type: "loss" },
  { label: "Year 2 operating profit", from: 0, to: profit.current, type: "total" },
] as const;

export function ProfitBridge() {
  return (
    <figure className="profit-bridge" aria-labelledby="bridge-h">
      <h3 id="bridge-h">Retail case profit bridge</h3>
      <dl className="bridge__rows">
        {rows.map(({ label, from, to, type }) => (
          <div className="bridge__row" data-type={type} key={label}>
            <dt>{label}</dt>
            <dd className="bridge__amount">
              {type === "gain" ? "+" : ""}{formatMillions(to - from)}
            </dd>
            <dd className="bridge__track" aria-hidden="true" style={{
              "--start": `${Math.min(from, to) / afterRevenue * 100}%`,
              "--length": `${Math.abs(to - from) / afterRevenue * 100}%`,
            } as CSSProperties}>
              <span />
            </dd>
          </div>
        ))}
      </dl>
      <div className="bridge__axis" aria-hidden="true">
        <div><span>$0m</span><span>{formatMillions(afterRevenue / 2)}</span><span>{formatMillions(afterRevenue)}</span></div>
      </div>
    </figure>
  );
}
