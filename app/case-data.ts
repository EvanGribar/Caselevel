export const caseQuestion = "Why did profit fall?";

export const financials = [
  { label: "Revenue", prior: "$24.0m", current: "$26.0m" },
  { label: "Cost of goods", prior: "$14.4m", current: "$15.6m" },
  { label: "Store expenses", prior: "$5.6m", current: "$7.8m" },
  { label: "Operating profit", prior: "$4.0m", current: "$2.6m" },
];

export const options = [
  { label: "Revenue fell", feedback: "Revenue rose by $2.0m. Compare the size of the two expense increases." },
  { label: "Cost of goods rose", feedback: "Cost of goods rose by $1.2m. Check whether store expenses rose by more." },
  { label: "Store expenses rose", feedback: "Store expenses rose by $2.2m, more than the $1.2m increase in cost of goods. Together they outweighed the $2.0m revenue gain." },
];

export const correctOption = 2;
