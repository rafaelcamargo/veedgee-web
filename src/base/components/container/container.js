import './container.styl';

export const Container = ({ children }) => {
  return (
    <div className="v-container">
      {children}
    </div>
  );
};
