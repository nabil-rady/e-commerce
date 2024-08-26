import React from "react";
import { Attribute, AttributeSet } from "../types/Attribute";
import toKebabCase from "../utils/toKebabCase.ts";

interface AttributeProps {
  attributeSet: AttributeSet;
}

interface AttributeState {
  selectedAttribute: Attribute;
}

class SwatchAttribute extends React.Component<AttributeProps, AttributeState> {
  state = {
    selectedAttribute: this.props.attributeSet.items[0],
  };

  setAttribute(attribute: Attribute) {
    this.setState({
      selectedAttribute: attribute,
    });
  }

  render(): React.ReactNode {
    return (
      <div className="flex my-2 gap-2">
        {this.props.attributeSet.items.map((attribute, index) => (
          <label
            key={attribute.id}
            htmlFor={
              toKebabCase(this.props.attributeSet.id) +
              "-" +
              toKebabCase(attribute.id)
            }
            onClick={() => {
              this.setAttribute(attribute);
            }}
            className="w-[36px] h-[36px] flex justify-center border-2 border-black hover:border-primary has-[:checked]:border-primary cursor-pointer"
          >
            <div
              className="w-full box-border m-[2.5px]"
              style={{
                backgroundColor: attribute.value,
              }}
            ></div>
            <input
              type="radio"
              id={
                toKebabCase(this.props.attributeSet.id) +
                "-" +
                toKebabCase(attribute.id)
              }
              defaultChecked={index === 0}
              name={toKebabCase(this.props.attributeSet.id)}
              className="appearance-none"
            />
          </label>
        ))}
      </div>
    );
  }
}

class TextAttribute extends React.Component<AttributeProps, AttributeState> {
  state = {
    selectedAttribute: this.props.attributeSet.items[0],
  };

  setAttribute(attribute: Attribute) {
    this.setState({
      selectedAttribute: attribute,
    });
  }

  render(): React.ReactNode {
    return (
      <div
        data-testid={toKebabCase(this.props.attributeSet.id)}
        className="flex my-2 gap-2"
      >
        {this.props.attributeSet.items.map((attribute, index) => (
          <label
            key={attribute.id}
            htmlFor={
              toKebabCase(this.props.attributeSet.id) +
              "-" +
              toKebabCase(attribute.id)
            }
            className="w-16 h-11 border-2 border-black flex justify-center items-center font-['Source_Sans_3'] focus:bg-selected focus:text-white hover:bg-selected hover:text-white has-[:checked]:bg-selected has-[:checked]:text-white cursor-pointer"
          >
            {attribute.displayValue}
            <input
              type="radio"
              id={
                toKebabCase(this.props.attributeSet.id) +
                "-" +
                toKebabCase(attribute.id)
              }
              defaultChecked={index === 0}
              name={toKebabCase(this.props.attributeSet.id)}
              value={attribute.value}
              className="appearance-none checked:bg-selected checked:text-white"
            />
          </label>
        ))}
      </div>
    );
  }
}

function renderAttribute(attributeSet: AttributeSet) {
  switch (attributeSet.type) {
    case "swatch":
      return <SwatchAttribute attributeSet={attributeSet} />;
    default:
      return <TextAttribute attributeSet={attributeSet} />;
  }
}

class AttributeComponent extends React.Component<AttributeProps> {
  render(): React.ReactNode {
    return (
      <div>
        <h2 className="text-lg font-bold">{this.props.attributeSet.name}:</h2>
        {renderAttribute(this.props.attributeSet)}
      </div>
    );
  }
}

export default AttributeComponent;
