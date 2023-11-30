import React from 'react';
import { useRouter } from 'next/router';
import Detail from './detail';
import { allEvents } from '@/providers/EventRepository'; 

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return null; 
  }

  const events = allEvents();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <p>Event not found</p>; 
  }

  return <Detail {...event} />;
};

export default EventDetailPage;
