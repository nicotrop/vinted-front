import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const Slider = ({ rtl, values, setValues }) => {
  return (
    <div className="slider-wrapper">
      <div className="slide-component-1">
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          rtl={rtl}
          onChange={(num) => setValues(num)}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#2cb1ba", "#ccc"],
                    min: MIN,
                    max: MAX,
                    rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                backgroundColor: "#2cb1ba",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-17px",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "35px",
                  fontSize: "12px",
                  fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
                  padding: "2px",
                  borderRadius: "4px",
                  backgroundColor: "#2cb1ba",
                  textAlign: "center",
                }}
              >
                {values[index].toFixed(0)} €
              </div>
              <div
                style={{
                  height: "5px",
                  width: "5px",
                  backgroundColor: isDragged ? "#2cb1ba" : "#2cb1ba",
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Slider;
