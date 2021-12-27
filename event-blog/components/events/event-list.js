import EventItem from './event-item';

import classes from './event-list.module.css';

const EventList = ({ items }) => {
  console.log(items);
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem {...item} key={item.id} />
      ))}
    </ul>
  );
};

export default EventList;
