import { useState } from "react";
import EventCard from "../../components/EventCard/evencard";
import Select from "../../components/Select/select";
import { useData } from "../../contexts/DataContext/datacontexts";
import Modal from "../Modal/modal";
import ModalEvent from "../ModalEvent/modalevent";

import "./style.css";

// import React, { useState, useEffect } from "react";
// import { api } from "../../contexts/DataContext/datacontexts";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await api.loadData();
//       setEvents(data.events);
//     };
//     fetchData();
//   }, []);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredEvents = selectedCategory
//     ? events.filter((event) => event.type === selectedCategory)
//     : events;

//   return (
//     <div>
//       <div>
//         <button
//           data-testid="collapse-button-testid"
//           onClick={() => handleCategorySelect(null)}
//         >
//           Toutes les catégories
//         </button>
//         <button onClick={() => handleCategorySelect("soirée entreprise")}>
//           Soirée entreprise
//         </button>
//         <button onClick={() => handleCategorySelect("forum")}>Forum</button>
//       </div>
//       <div>
//         {filteredEvents.map((event) => (
//           <div key={event.id}>
//             <h3>{event.title}</h3>
//             <p>{event.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Events;

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((_events, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // const totalEvents =
  // data?.events.filter((event) => (type ? event.type === type : true))
  //   .length || 0;

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // const pageNumber = Math.ceil(totalEvents / PER_PAGE);
  // const typeList = Array.from(new Set(data?.events.map((event) => event.type)));
  // console.log("Data loaded:", data);
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* <Select
            selection={typeList}
            onChange={(value) => changeType(value)}
            titleEmpty={false}
            label="Type d'événement"></Select> */}
          /<Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
              //  {/* {Array.from({ length: pageNumber }, (_, n) => (
              //   <a
              //     key={`page-${n + 1}`}
              //     href="#events"
              //     onClick={() => setCurrentPage(n + 1)}
              //   >
              //     {n + 1}
              //   </a> */}
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
