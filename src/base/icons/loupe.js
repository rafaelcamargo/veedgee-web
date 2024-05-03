import { Icon } from '@src/base/components/icon/icon';

export const Loupe = props => {
  return (
    <Icon {...props} name="loupe">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <g>
          <path fill="#717C84" d="M18.2,13c2.87,0,5.2,2.33,5.2,5.2s-2.33,5.2-5.2,5.2S13,21.07,13,18.2S15.33,13,18.2,13 M18.2,11   c-3.98,0-7.2,3.22-7.2,7.2s3.22,7.2,7.2,7.2s7.2-3.22,7.2-7.2S22.18,11,18.2,11L18.2,11z" />
        </g>
        <line fill="none" stroke="#717C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="23.25" y1="23.29" x2="29" y2="29"/>
      </svg>
    </Icon>
  );
};

