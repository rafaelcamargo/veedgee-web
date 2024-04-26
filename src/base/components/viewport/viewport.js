import { Topbar } from '@src/base/components/topbar/topbar';
import { Footer } from '@src/base/components/footer/footer';

export const Viewport = ({ children }) => {
  return (
    <div className="v-viewport">
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};
