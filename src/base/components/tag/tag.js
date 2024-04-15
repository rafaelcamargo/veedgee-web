import './tag.styl';

export const Tag = ({ children, ...rest }) => {
  return (
    <span className="v-tag" {...rest}>
      {children}
    </span>
  );
};
