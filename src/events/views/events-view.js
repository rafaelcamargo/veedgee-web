import(/* webpackChunkName: 'events-css' */ '@src/events/index.styl');
import { Container } from '@src/base/components/container/container';
import { Viewport } from '@src/base/components/viewport/viewport';
import { useEventFilters } from '@src/events/hooks/use-event-filters';
import { EventFilters } from '@src/events/components/event-filters/event-filters';
import { EventList } from '@src/events/components/event-list/event-list';
import { InstallationBanner } from '@src/installation/components/installation-banner/installation-banner';

const EventsView = () => {
  const { filters, setFilters } = useEventFilters();
  const handleFilterChange = newFilters => setFilters(newFilters);

  return (
    <div className="v-events-view">
      <Viewport
        topbarContent={
          <EventFilters filters={filters} onChange={handleFilterChange} />
        }
      >
        <Container>
          <InstallationBanner />
          <EventList filters={filters} onLoadMore={handleFilterChange} />
        </Container>
      </Viewport>
    </div>
  );
};

export default EventsView;
