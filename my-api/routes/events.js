const express = require('express');
const router = express.Router();

// Dummy events data
const events = [
  { title: 'Shubharambh 2024', date: '2024-01-12', location: 'vrindavan', description: 'Shubharambh 2024 is a celebration at Vrindavan Chandrodaya Mandir' },
  { title: 'Shobha Yatra', date: '2024-01-13', location: 'Mathura', description: 'Shobha Yatra Vrindavan Chandrodaya Mandir celebrated Shobha Yatra as part of the Kartik Utsav Festival' },
  { title: 'Gita fest 2024', date: '2024-01-14', location: 'Vrindavan Chandrodaya Mandir', description: 'Vrindavan Chandrodaya Mandir organised Gita Fest 2023, an interschool cultural competition from December 20 to 22. The event was conducted as part of Gita Jayanti celebrations and included categories like Gita Quiz, Gita Shloka Chanting, Collage Making and Theatre. Over 1000 students from 15 schools in Braj enthusiastically participated in this three-day event. ' },
  { title: 'Hare Krishna Movement', date: '2024-01-15', location: 'Mathura', description: 'Hare Krishna Movement, Vrindavan (HKMV) is a charitable Trust registered in the year 2008 and is based in Vrindavan town located in Mathura district of Uttar Pradesh, India. One of the major projects of the organization is Annadan- providing free meals to the needy' },

  
 
];

router.get('/', (req, res) => {
  try {
    const selectedDate = req.query.date;

    if (selectedDate) {
      // Filter events for the selected date
      const selectedEvents = events.filter(event => event.date === selectedDate);
      if (selectedEvents.length === 0) {
        throw new Error(`No events found for the date ${selectedDate}`);
      }
      res.json(selectedEvents);
    } else {
      // Return all events if no date is provided
      if (!events || events.length === 0) {
        throw new Error('No events found');
      }
      res.json(events);
    }
  } catch (error) {
    console.error(error.message);

    // Send the error message in the response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
