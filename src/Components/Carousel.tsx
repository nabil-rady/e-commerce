import React from "react";

interface CarouselProps {
  gallery: string[];
}

interface CarouselState {
  index: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  state = {
    index: 0,
  };

  nextElement = () => {
    this.setState((prevState) => ({
      ...prevState,
      index: (prevState.index + 1) % this.props.gallery.length,
    }));
  };

  prevElement = () => {
    this.setState((prevState) => ({
      ...prevState,
      index:
        prevState.index - 1 < 0
          ? this.props.gallery.length - 1
          : prevState.index - 1,
    }));
  };

  render(): React.ReactNode {
    const carouselContainerClassName =
      this.props.gallery.length === 1
        ? "basis-2/5 lg:max-h-[560px]"
        : "basis-3/5 lg:max-h-[560px]";
    return (
      <div className={carouselContainerClassName}>
        <div className="flex flex-col lg:flex-row h-full gap-12">
          {this.props.gallery.length !== 1 && (
            <div className="flex gap-3 basis-0 grow lg:h-full lg:flex-col cursor-pointer">
              {this.props.gallery.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    this.setState({
                      index,
                    });
                  }}
                  className="flex-1 lg:min-h-0"
                >
                  <img
                    src={image}
                    className="h-full object-cover brightness-95 aspect-square"
                    alt={`product-${index}`}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="basis-0 grow-[5] h-full">
            <div
              data-testid="product-gallery"
              className="overflow-x-hidden relative flex h-full"
            >
              {this.props.gallery.length !== 1 && (
                <>
                  <button
                    onClick={() => this.nextElement()}
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 bg-black opacity-75 z-10 flex justify-center items-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 10 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.09158L8.5 8.58363L1 16.0757"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => this.prevElement()}
                    className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 bg-black opacity-75 z-10 flex justify-center items-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 10 17"
                      fill="none"
                      className="rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.09158L8.5 8.58363L1 16.0757"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
              {this.props.gallery.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-full shrink-0 grow-0 overflow-y-auto flex"
                  style={{
                    alignItems: "safe center",
                    transform: `translateX(${this.state.index * -100}%)`,
                    transitionDuration: "350ms",
                  }}
                >
                  <img
                    src={image}
                    className="transition-transform w-full brightness-95"
                    alt={`product-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
