import { Icon } from '@src/base/components/icon/icon';

export const Notification = props => {
  return (
    <Icon {...props} name="notification">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 40 40">
        <g>
          <rect fill="#FFC8CA" x="12.17" y="12.61" transform="matrix(6.123234e-17 -1 1 6.123234e-17 -0.9565 40.9565)" width="15.65" height="16.7"/>
          <path fill="#FF0033" d="M20.78,6h-1.57L20,9.13L20.78,6z"/>
          <path fill="#FF0033" d="M28.03,7.56l-1.49-0.48l-0.22,3.22L28.03,7.56z"/>
          <path fill="#FF0033" d="M13.46,7.08l-1.49,0.48l1.71,2.74L13.46,7.08z"/>
          <path fill="#7A808B" d="M22.01,18.35c0,1.44-1.17,2.61-2.61,2.61c-1.44,0-2.61-1.17-2.61-2.61H8.96V34h22.07V18.35H22.01z"/>
        </g>
      </svg>
    </Icon>
  );
};
