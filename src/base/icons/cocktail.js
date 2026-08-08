import { Icon } from '@src/base/components/icon/icon';

const Cocktail = props => {
  return (
    <Icon {...props} name="cocktail">
      <path data-stroke d="M20,22.19L29.792,12.005L10.208,12.005L20,22.19Z" />
      <path data-stroke d="M20,22.19L20,32" />
      <path data-stroke d="M15.529,32L24.471,32" />
      <ellipse data-stroke cx="21.211" cy="17.098" rx="1.933" ry="1.903" />
      <path data-stroke d="M22.508,15.693L29.738,8" />
    </Icon>
  );
};

export default Cocktail;
