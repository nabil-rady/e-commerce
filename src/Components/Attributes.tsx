import React from "react";
import AttributeComponent from "./Attribute.tsx";
import { Attribute, AttributeSet } from "../types/Attribute";

interface AttributesProps {
  attributeSets: AttributeSet[];
}

interface AttributesState {
  selectedAttributes: Attribute[];
}

class AttributesComponent extends React.Component<
  AttributesProps,
  AttributesState
> {
  state = {
    selectedAttributes: this.props.attributeSets.map(
      (attributeSet) => attributeSet[0]
    ),
  };
  render(): React.ReactNode {
    return (
      <div className="mt-6">
        <form
          onSubmit={(e) => {
            console.log(e);
          }}
        >
          {this.props.attributeSets.map((attributeSet) => (
            <AttributeComponent
              key={attributeSet.id}
              attributeSet={attributeSet}
            />
          ))}
        </form>
      </div>
    );
  }
}

export default AttributesComponent;
