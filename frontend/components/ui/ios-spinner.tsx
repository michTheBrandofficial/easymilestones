import { percentage, sec } from "@/lib/utils";

const IOSSpinner: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <div className="w-full flex justify-center items-center py-24">
      <div className="flex relative w-fit h-fit">
        {Array(8)
          .fill("")
          .map((_, i) => {
            const styles = {} as Record<string, any>;
            if (color) styles.backgroundColor = color;
            return (
              <div
                key={i}
                className="w-[3px] h-1.5 bg-[#A3A3AB] rounded-full fade-animation "
                style={{
                  transform: `rotate(${45 * i}deg) translateY(${percentage(
                    125
                  )})`,
                  position: "absolute",
                  left: percentage(49),
                  top: percentage(43),
                  animationDelay: sec(i * 0.125),
                  ...styles,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default IOSSpinner;
