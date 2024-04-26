import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouterAnalytics } from '@src/base/components/router-analytics/router-analytics';
import routes from '@src/routes';

const HomeView = lazy(() => import('@src/home/views/home-view'));
const EventsView = lazy(() => import('@src/events/views/events-view'));

export const Router = () => {
  return (
    <BrowserRouter>
      <RouterAnalytics>
        <Routes>
          {routes.map(({ path, name }) => {
            const ViewComponent = getViewComponentByViewName(name);
            const element = (
              <Suspense fallback={<></>}>
                <ViewComponent />
              </Suspense>
            );
            return <Route path={path} element={element} key={name} />;
          })}
        </Routes>
      </RouterAnalytics>
    </BrowserRouter>
  );
};

function getViewComponentByViewName(viewName){
  return {
    'home': HomeView,
    'events': EventsView,
  }[viewName];
}
