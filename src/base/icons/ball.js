import { Icon } from '@src/base/components/icon/icon';

const Ball = props => {
  return (
    <Icon {...props} name="ball">
      <circle data-stroke cx="20" cy="20" r="11" />
      <path data-stroke d="M20,14.837L24.91,18.405L23.034,24.177L16.966,24.177L15.09,18.405L20,14.837Z" />
      <path data-stroke d="M17.419,9.395L20,11.27L22.581,9.395" />
      <path data-stroke d="M20,11.27L20,14.837" />
      <path data-stroke d="M9.116,19.178L11.698,17.302L10.712,14.268" />
      <path data-stroke d="M11.698,17.302L15.121,18.382" />
      <path data-stroke d="M15.855,30.097L14.869,27.063L11.678,27.063" />
      <path data-stroke d="M14.869,27.063L16.966,24.177" />
      <path data-stroke d="M28.322,27.063L25.131,27.063L24.145,30.097" />
      <path data-stroke d="M25.131,27.063L23.034,24.177" />
      <path data-stroke d="M29.288,14.268L28.302,17.302L30.884,19.178" />
      <path data-stroke d="M28.302,17.302L24.91,18.405" />
    </Icon>
  );
};

export default Ball;
