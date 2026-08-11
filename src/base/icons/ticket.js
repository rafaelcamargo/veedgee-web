import { Icon } from '@src/base/components/icon/icon';

const Ticket = props => {
  return (
    <Icon {...props} name="ticket">
      <path data-stroke d="M8.622,27.529L5.078,23.985L23.985,5.078L27.529,8.622C26.467,9.684 26.467,11.409 27.529,12.471C28.591,13.533 30.316,13.533 31.378,12.471L34.922,16.015L16.015,34.922L12.471,31.378C13.533,30.316 13.533,28.591 12.471,27.529C11.409,26.467 9.684,26.467 8.622,27.529Z" />
      <path data-stroke d="M19.01,12.929L20.424,14.343" />
      <path data-stroke d="M22.333,16.252L23.748,17.667" />
      <path data-stroke d="M25.657,19.576L27.071,20.99" />
    </Icon>
  );
};

export default Ticket;
