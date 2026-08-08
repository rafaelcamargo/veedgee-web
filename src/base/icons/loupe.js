import { Icon } from '@src/base/components/icon/icon';

const Loupe = props => {
  return (
    <Icon {...props} name="loupe">
      <circle data-stroke cx="19.249" cy="19.249" r="9.249" />
      <path data-stroke d="M25.79,25.79L30,30" />
    </Icon>
  );
};

export default Loupe;
