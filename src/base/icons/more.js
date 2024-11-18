import { Icon } from '@src/base/components/icon/icon';

export const More = props => {
  return (
    <Icon {...props} name="share">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
        <circle fill="#333333" cx="20" cy="13" r="2"/>
        <circle fill="#333333" cx="20" cy="20" r="2"/>
        <circle fill="#333333" cx="20" cy="27" r="2"/>
      </svg>
    </Icon>
  );
};
