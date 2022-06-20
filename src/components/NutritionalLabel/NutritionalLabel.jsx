import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel({ item }) {
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>
      <h4 className="item-name">{item.item_name}</h4>
      <ul className="fact-list">
        {nutritionFacts.map(({ id, label, attribute }) => (
          <NutritionalLabelFact key={id} label={label} value={item[attribute]} />
        ))}
      </ul>
    </div>
  )
}

export function NutritionalLabelFact({ label, value }) {
  return (
    <li className="nutrition-fact">
      <span className="fact-label">{label}</span>{" "}
      <span className="fact-value">{value}</span>
    </li>
  )
}

export default NutritionalLabel
