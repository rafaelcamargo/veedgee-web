import { Icon } from '@src/base/components/icon/icon';

export const Close = props => {
  return (
    <Icon {...props} name="close">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="10" y1="10" x2="30" y2="30"/>
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30" y1="10" x2="10" y2="30"/>
      </svg>
    </Icon>
  );
};


