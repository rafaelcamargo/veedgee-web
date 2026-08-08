export const DrawerImage = ({ src, alt, description }) => {
  return (
    <div className="v-drawer-image">
      <img src={src} alt={alt} />
      <div className="v-drawer-image-gradient" aria-hidden="true" />
      {
        description && (
          <div className="v-drawer-image-description">
            {description}
          </div>
        )
      }
    </div>
  );
};
