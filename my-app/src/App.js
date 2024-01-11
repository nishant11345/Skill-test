import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEvents, setShowEvents] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const fetchEvents = async (date) => {
    try {
      const url = date
        ? `http://localhost:4000/api/events?date=${date.toISOString().split('T')[0]}`
        : 'http://localhost:4000/api/events';
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        // Update the events state
        setEvents(data);
  
        // Update the filtered events state based on the selected option
        setFilteredEvents(selectedOption === 'allEvents' ? data : []);
      } else {
        // Handle error response
        console.error('Error fetching events:', data);
        setFilteredEvents(null);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setFilteredEvents(null);
    }
  };
  
  
  useEffect(() => {
    if (showEvents) {
      if (selectedOption === 'allEvents') {
        // Fetch events when "All Events" is selected
        fetchEvents().then(() => {
          // After fetching, set the selected option to trigger state updates
          setSelectedOption('allEvents');
        });
      } else if (selectedOption === 'selectByDate') {
        // Fetch events for the selected date
        fetchEvents(selectedDate);
      }
    }
  }, [showEvents, selectedOption, selectedDate]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBackButtonClick = () => {
    setSelectedEvent(null);
  };

  const handleShowEventsClick = () => {
    setShowEvents(!showEvents);
    setSelectedOption(null);
  };

  const handleSelectByDateClick = () => {
    setShowEvents(true);
    setSelectedOption('selectByDate');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterByDateClick = async () => {
    try {
      if (selectedDate) {
        // Format the date in 'YYYY-MM-DD' format
        const formattedDate = selectedDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
  
        // Fetch events for the selected date
        const url = `http://localhost:4000/api/events?date=${formattedDate}`;
        const response = await fetch(url);
        const data = await response.json();
  
        // Update the filtered events state
        setFilteredEvents(data);
  
        // Set filterButtonClicked to true when the button is clicked
        setFilterButtonClicked(true);
  
        // Check if there are no events for the selected date
        if (data.length === 0) {
          console.log(`No events found for the date ${formattedDate}`);
        }
      }
    } catch (error) {
      console.error('Error fetching events for the selected date:', error);
      // In case of an error, set filteredEvents to null
      setFilteredEvents(null);
    }
  };
  
  
  

  const handleAllEventsClick = () => {
    setShowEvents(true);
    setSelectedOption('allEvents');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upcoming Events</h1>
      </header>
      <div className="events-container">
        <div className="show-events-dropdown">
          <button onClick={handleShowEventsClick}>Show Events ▼</button>
          {showEvents && (
            <div className="options-dropdown">
              <div onClick={() => handleAllEventsClick()}>All Events</div>
              <div onClick={handleSelectByDateClick}>Select by Date</div>
            </div>
          )}
        </div>
  
        {selectedOption === 'selectByDate' && (
          <div>
            <DatePicker selected={selectedDate} onChange={handleDateChange} />
            <button className='filterbutton' onClick={handleFilterByDateClick}>Filter by Date</button>
  
            {filterButtonClicked && filteredEvents !== null && (
  filteredEvents.length > 0 ? (
    filteredEvents.map((event) => (
      <div key={event.title} className="event" onClick={() => handleEventClick(event)}>
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
    ))
  ) : (
    <div>No events found for the selected date</div>
  )
)}
          </div>
        )}
  
        {selectedEvent ? (
          <div className="event-details">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <button onClick={handleBackButtonClick}>Back to Events</button>
          </div>
        ) : (
          <div>
         
            {selectedOption === 'allEvents' && (
              // Render the list of all events
              events.map((event) => (
                <div key={event.title} className="event" onClick={() => handleEventClick(event)}>
                  <h2>{event.title}</h2>
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
  
};

export default App;