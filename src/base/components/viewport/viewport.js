import { Topbar } from '@src/base/components/topbar/topbar';
import { Footer } from '@src/base/components/footer/footer';

export const Viewport = ({ children, topbarContent }) => {
  return (
    <div className="v-viewport">
      <Topbar>
        {topbarContent}
      </Topbar>
      {children}
      <Footer />
    </div>
  );
};
