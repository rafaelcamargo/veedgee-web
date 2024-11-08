import { Icon } from '@src/base/components/icon/icon';

export const Harrow = props => {
  return (
    <Icon {...props} name="harrow">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <polyline fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" points="20.2,10.9 29.8,20.5 20.2,30.1"/>
        <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="9.8" y1="20.5" x2="29.8" y2="20.5"/>
      </svg>
    </Icon>
  );
};
