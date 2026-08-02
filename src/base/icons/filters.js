import { Icon } from '@src/base/components/icon/icon';

const Filters = props => {
  return (
    <Icon {...props} name="filters">
      <line data-stroke x1="30" y1="15" x2="10" y2="15"/>
      <line data-stroke x1="30" y1="20" x2="16" y2="20"/>
      <line data-stroke x1="30" y1="25" x2="22" y2="25"/>
    </Icon>
  );
};

export default Filters;
