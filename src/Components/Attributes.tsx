import React from "react";
import AttributeComponent from "./Attribute.tsx";
import { Attribute, AttributeSet } from "../types/Attribute";

interface AttributesProps {
  attributeSets: AttributeSet[];
  selectedAttributes: (Attribute | null)[];
  overlay?: boolean;
  setAttribute?: (attribute: Attribute, index: number) => void;
}

class AttributesComponent extends React.Component<AttributesProps> {
  render(): React.ReactNode {
    return this.props.attributeSets.map((attributeSet, index) => (
      <AttributeComponent
        overlay={this.props.overlay}
        key={attributeSet.id}
        attributeSet={attributeSet}
        selectedAttribute={this.props.selectedAttributes[index]}
        index={index}
        setAttribute={this.props.setAttribute}
      />
    ));
  }
}

export default AttributesComponent;
