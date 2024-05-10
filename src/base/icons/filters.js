import { Icon } from '@src/base/components/icon/icon';

export const Filters = props => {
  return (
    <Icon {...props} name="filters">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30" y1="15" x2="10" y2="15"/>
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30" y1="20" x2="16" y2="20"/>
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="30" y1="25" x2="22" y2="25"/>
      </svg>
    </Icon>
  );
};
