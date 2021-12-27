import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
  };
};

export default AllEventsPage;
