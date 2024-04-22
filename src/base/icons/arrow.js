import { Icon } from '@src/base/components/icon/icon';

export const Arrow = props => {
  return (
    <Icon {...props} name="arrow">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <polygon fill="#FF0033" points="9.16,6 9.16,12.38 23.11,12.38 6,29.49 10.51,34 27.62,16.89 27.62,30.84 34,30.84 34,6 "/>
      </svg>
    </Icon>
  );
};
