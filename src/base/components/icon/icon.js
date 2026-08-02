export const Icon = ({ name, children, ...rest }) => {
  return (
    <div className={`v-icon v-icon-${name}`} aria-hidden="true" {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        {children}
      </svg>
    </div>
  );
};
