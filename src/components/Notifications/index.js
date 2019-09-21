import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import en from 'date-fns/locale/en-US'; // date/time format locale
// parseISO - converts a date in string format into Date object from JS
// formatDistance will show how long a notification was created since now.
import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    // hasUnread must be a boolean, however Array.find will not return a boolear, but it returns
    // the notification object. If we need a boolean from this array function, we must add !! (double bang)
    // in order to return a boolean (or Boolean(notifications.fund(...)))
    () => !!notifications.find(notification => notification.read === false),
    [notifications] // remember, everytime notifications is changed, this function will be fired
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt), // notification.createdAt is string format originally
          new Date(), // current time from user's machine
          {
            addSuffix: true,
            locale: en,
          }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        {/* hasUnread is a custom property when there is unread notification */}
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as read
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
