export const Loader = ({ children }) => {
  return (
    <div className="v-loader" role="status">
      {children}
      <span className="v-loader-item"></span>
      <span className="v-loader-item"></span>
      <span className="v-loader-item"></span>
    </div>
  );
};


