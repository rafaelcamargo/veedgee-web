import { Container } from '@src/base/components/container/container';
import { Viewport } from '@src/base/components/viewport/viewport';
import { EventList } from '@src/events/components/event-list/event-list';

export const EventsView = () => {
  return (
    <div className="v-events-view">
      <Viewport>
        <Container>
          <EventList />
        </Container>
      </Viewport>
    </div>
  );
};
