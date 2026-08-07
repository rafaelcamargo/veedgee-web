export const Button = ({ children, theme, className, ...rest }) => {
  return (
    <button className={buildClassName(theme, className)} {...rest}>
      {children}
    </button>
  );
};

function buildClassName(theme, className){
  return [
    'v-button',
    getThemeClassName(theme),
    className
  ].join(' ').replace(/\s+/g, ' ').trim();
}

function getThemeClassName(theme){
  return {
    'primary': 'v-button-primary',
    'icon': 'v-button-icon'
  }[theme];
}
