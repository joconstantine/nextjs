import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Button from '../../components/ui/button';
import EventList from '../../components/events/event-list';
import ResultsTitles from '../../components/events/results-title';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();

  const { data, error } = useSWR(
    'https://nextjs-course-13899-default-rtdb.asia-southeast1.firebasedatabase.app/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });

        setLoadedEvents(events);
      }
    }
  }, [data]);

  const filterData = router.query.slug;

  if (!loadedEvents || !filterData) {
    return <p className="center">Loading...</p>;
  }

  const [filterYear, filterMonth] = filterData;
  const numYear = +filterYear;
  const numMonth = +filterMonth;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your value.</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No record found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitles date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
