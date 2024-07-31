import React, { useEffect, useRef, useState } from 'react';
import { Box, Chip, Grid } from '@mui/material';
import gsap from 'gsap';

interface Event {
    id: number;
    name: string;
}

interface EventChipListProps {
    events: Event[];
}

// Chip component
const EventChip: React.FC<{ label: string; onRef: (ref: HTMLDivElement | null) => void }> = ({ label, onRef }) => {
    return (
        <Box
            ref={onRef}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Chip label={label} color="info" />
        </Box>
    );
};

const EventChipList: React.FC<EventChipListProps> = ({ events }) => {
    const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
    const chipsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (events.length > 0) {
            const timeoutId = setTimeout(() => {
                setVisibleEvents(events);


                const validRefs = chipsRef.current.filter(
                    (ref): ref is HTMLDivElement => ref !== null
                );

                gsap.fromTo(
                    validRefs,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
                );
            }, 10000); 

            return () => clearTimeout(timeoutId);
        }
    }, [events]);

    if (visibleEvents.length === 0) {
        return null;
    }

    return (
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
            {visibleEvents.map((event, index) => (
                <Grid item key={event.id} xs={12} sm={6} md={4}>
                    <EventChip
                        label={event.name}
                        onRef={(el) => {
                            // Ensure the ref is properly set
                            if (el) {
                                chipsRef.current[index] = el;
                            }
                        }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default EventChipList;
