import { financials, formatMillions } from "../case-data";
import "./profitability-tree.css";

const operatingProfit = financials[3];

export function ProfitabilityTree() {
  return (
    <figure className="case-board" aria-labelledby="case-board-title">
      <figcaption className="case-board__label">
        <span>Sample case</span>
        <span>Operations consulting</span>
      </figcaption>
      <div className="case-board__sheet">
        <div className="case-board__heading">
          <h2 id="case-board-title">Why did the retailer’s profit fall?</h2>
        </div>
        <div className="issue-tree">
          <div className="issue-tree__root">
            <p>Operating profit</p>
            <dl>
              <div><dt>Year 1</dt><dd>{formatMillions(operatingProfit.prior)}</dd></div>
              <div><dt>Year 2</dt><dd>{formatMillions(operatingProfit.current)}</dd></div>
              <div><dt>Change</dt><dd>{formatMillions(operatingProfit.current - operatingProfit.prior)}</dd></div>
            </dl>
          </div>
          <div className="issue-tree__connector" aria-hidden="true">
            <span />
          </div>
          <div className="issue-tree__branches">
            <div><p>Revenue</p><span>Price × volume</span></div>
            <div><p>Costs</p><span>Fixed + variable costs</span></div>
          </div>
        </div>
      </div>
    </figure>
  );
}
