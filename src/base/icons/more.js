import { Icon } from '@src/base/components/icon/icon';

const More = props => {
  return (
    <Icon {...props} name="share">
      <circle data-shape cx="20" cy="13" r="2"/>
      <circle data-shape cx="20" cy="20" r="2"/>
      <circle data-shape cx="20" cy="27" r="2"/>
    </Icon>
  );
};

export default More;
