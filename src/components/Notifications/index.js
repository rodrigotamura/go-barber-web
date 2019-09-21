import React from 'react';

import { MdNotifications } from 'react-icons/md';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  return (
    <Container>
      <Badge hasUnread>
        {/* hasUnread is a custom property when there is unread notification */}
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList>
        <Scroll>
          <Notification unread>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification unread>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification unread>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification unread>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
          <Notification>
            <p>You have a new appointment tomorrow</p>
            <time>2 days ago</time>
            <button stype="button">Mark as read</button>
          </Notification>
        </Scroll>
      </NotificationList>
    </Container>
  );
}
