import { Icon } from '@src/base/components/icon/icon';

const Shoe = props => {
  return (
    <Icon {...props} name="shoe">
      <path data-stroke d="M7.429,22.943C7.429,22.943 6.08,18.357 8.165,15.73C10.054,16.622 14.091,18.794 18.012,14.352C20.756,15.997 24.056,19.016 27.288,20.289C30.519,21.562 32.858,21.123 33,24.859C30.577,26.139 21.571,25.477 21.571,25.477C21.571,25.477 18.82,22.943 14.123,22.943L7.429,22.943Z" />
      <path data-stroke d="M19.427,16.189L17.891,18.146" />
      <path data-stroke d="M21.536,17.075L20,19.033" />
      <path data-stroke d="M23.323,18.479L22.109,20.026" />
      <path data-stroke d="M27.288,20.289C27.288,20.289 25.731,20.358 25.028,22.624" />
      <rect data-stroke x="7.626" y="22.943" width="7.179" height="2.705" />
    </Icon>
  );
};

export default Shoe;
