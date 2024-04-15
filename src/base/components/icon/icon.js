import './icon.styl';

export const Icon = ({ name, children, ...rest }) => {
  return (
    <div className={`v-icon v-icon-${name}`} {...rest}>
      {children}
    </div>
  );
};
