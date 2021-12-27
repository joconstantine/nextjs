import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  const notification = activeNotification ? (
    <Notification
      title={activeNotification?.title}
      message={activeNotification?.message}
      status={activeNotification?.status}
    />
  ) : null;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification}
    </Fragment>
  );
}

export default Layout;
