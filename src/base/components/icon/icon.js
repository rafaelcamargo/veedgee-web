export const Icon = ({ name, children, strokeColor, strokeWidth, size, style, ...rest }) => {
  const iconStyle = {
    ...buildIconStyles({ strokeColor, strokeWidth, size }),
    ...style
  };

  return (
    <div className={`v-icon v-icon-${name}`} aria-hidden="true" style={iconStyle} {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        {children}
      </svg>
    </div>
  );
};

function buildIconStyles({ strokeColor, strokeWidth, size }) {
  return Object.entries({
    '--v-icon-stroke-color': strokeColor,
    '--v-icon-stroke-width': strokeWidth,
    '--v-icon-width': size,
    '--v-icon-height': size
  }).reduce((result, [key, value]) => {
    return value ? { ...result, [key]: value } : result;
  }, {});
}
