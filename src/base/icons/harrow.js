import { Icon } from '@src/base/components/icon/icon';

const Harrow = props => {
  return (
    <Icon {...props} name="harrow">
      <polyline data-stroke points="20.2,10.9 29.8,20.5 20.2,30.1"/>
      <line data-stroke x1="9.8" y1="20.5" x2="29.8" y2="20.5"/>
    </Icon>
  );
};

export default Harrow;
