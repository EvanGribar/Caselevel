import { financials, formatMillions } from "./case-data";

export function CaseExhibit() {
  return (
    <table className="financials">
      <caption className="visually-hidden">Two years of fictional retailer financials</caption>
      <thead>
        <tr><th scope="col">USD</th><th scope="col">Year 1</th><th scope="col">Year 2</th></tr>
      </thead>
      <tbody>
        {financials.map(({ label, prior, current }) => (
          <tr key={label}><th scope="row">{label}</th><td>{formatMillions(prior)}</td><td>{formatMillions(current)}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
