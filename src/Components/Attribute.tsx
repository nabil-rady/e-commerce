import React from "react";
import { Attribute, AttributeSet } from "../types/Attribute";
import toKebabCase from "../utils/toKebabCase.ts";

interface AttributeProps {
  attributeSet: AttributeSet;
  selectedAttribute: Attribute;
  index: number;
  overlay?: boolean;
  setAttribute?: (attirbute: Attribute, index: number) => void;
}

class SwatchAttribute extends React.Component<AttributeProps> {
  setAttribute(attirbute: Attribute, index: number) {
    if (this.props.setAttribute !== undefined)
      this.props.setAttribute(attirbute, index);
  }

  render(): React.ReactNode {
    const attributeContainerClassName = this.props.overlay
      ? "w-[20px] h-[20px] flex justify-center border-2 border-black enabled:hover:border-primary has-[:checked]:border-primary enabled:cursor-pointer"
      : "w-[36px] h-[36px] flex justify-center border-2 border-black enabled:hover:border-primary has-[:checked]:border-primary enabled:cursor-pointer";
    return (
      <div className="flex flex-wrap my-2 gap-2">
        {this.props.attributeSet.items.map((attribute, index) => (
          <label
            key={attribute.id}
            onClick={() => {
              this.setAttribute(attribute, index);
            }}
            data-testid={
              this.props.overlay
                ? "cart-item-attribute-" +
                  toKebabCase(this.props.attributeSet.name) +
                  "-" +
                  toKebabCase(attribute.id) +
                  (this.props.selectedAttribute.id === attribute.id
                    ? "-selected"
                    : "")
                : ""
            }
            className={attributeContainerClassName}
          >
            <div
              className="w-full box-border m-[2.5px]"
              style={{
                backgroundColor: attribute.value,
              }}
            ></div>
            <input
              aria-disabled={this.props.overlay}
              disabled={this.props.overlay}
              type="radio"
              data-displayvalue={attribute.displayValue}
              data-id={attribute.id}
              onChange={() => {
                this.setAttribute(attribute, this.props.index);
              }}
              checked={this.props.selectedAttribute.id === attribute.id}
              className="appearance-none"
            />
          </label>
        ))}
      </div>
    );
  }
}

class TextAttribute extends React.Component<AttributeProps> {
  setAttribute(attirbute: Attribute, index: number) {
    if (this.props.setAttribute !== undefined)
      this.props.setAttribute(attirbute, index);
  }

  render(): React.ReactNode {
    const attributeContainerClassName = this.props.overlay
      ? "min-w-[24px] min-h-[24px] p-1 text-sm border-2 border-black flex justify-center items-center font-['Source_Sans_3'] has-[:enabled]:focus:bg-darkGray has-[:enabled]:focus:text-white has-[:enabled]:hover:bg-darkGray has-[:enabled]:hover:text-white has-[:checked]:bg-darkGray has-[:checked]:text-white has-[:enabled]:cursor-pointer"
      : "min-w-[64px] min-h-[44px] p-1 border-2 border-black flex justify-center items-center font-['Source_Sans_3'] has-[:enabled]:focus:bg-darkGray has-[:enabled]:focus:text-white has-[:enabled]:hover:bg-darkGray has-[:enabled]:hover:text-white has-[:checked]:bg-darkGray has-[:checked]:text-white has-[:enabled]:cursor-pointer";
    return (
      <div
        data-testid={
          this.props.overlay
            ? "cart-item-attribute-" + toKebabCase(this.props.attributeSet.name)
            : toKebabCase(this.props.attributeSet.name)
        }
        className="flex flex-wrap my-2 gap-2"
      >
        {this.props.attributeSet.items.map((attribute, index) => (
          <label key={attribute.id} className={attributeContainerClassName}>
            {attribute.displayValue}
            <input
              aria-disabled={this.props.overlay}
              disabled={this.props.overlay}
              type="radio"
              data-displayvalue={attribute.displayValue}
              data-id={attribute.id}
              checked={this.props.selectedAttribute.id === attribute.id}
              onChange={() => {
                this.setAttribute(attribute, this.props.index);
              }}
              value={attribute.value}
              className="appearance-none checked:bg-darkGray checked:text-white"
            />
          </label>
        ))}
      </div>
    );
  }
}

function renderAttribute(
  attributeSet: AttributeSet,
  selectedAttribute: Attribute,
  index: number,
  setAttribute?: (attribute: Attribute, index: number) => void,
  overlay?: boolean
) {
  switch (attributeSet.type) {
    case "swatch":
      return (
        <SwatchAttribute
          attributeSet={attributeSet}
          selectedAttribute={selectedAttribute}
          overlay={overlay}
          setAttribute={setAttribute}
          index={index}
        />
      );
    default:
      return (
        <TextAttribute
          attributeSet={attributeSet}
          selectedAttribute={selectedAttribute}
          overlay={overlay}
          setAttribute={setAttribute}
          index={index}
        />
      );
  }
}

class AttributeComponent extends React.Component<AttributeProps> {
  render(): React.ReactNode {
    return (
      <div>
        <h2 className="text-lg font-bold">{this.props.attributeSet.name}:</h2>
        {renderAttribute(
          this.props.attributeSet,
          this.props.selectedAttribute,
          this.props.index,
          this.props.setAttribute,
          this.props.overlay
        )}
      </div>
    );
  }
}

export default AttributeComponent;
