import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/evencard";
import Select from "../../components/Select/select";
import { useData } from "../../contexts/DataContext/datacontexts";
import Modal from "../Modal/modal";
import ModalEvent from "../ModalEvent/modalevent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  // Il n'y avait aucun useEffect et les datas filtrés n'étaient pas mis à jour
  useEffect(() => {
    if (data?.events) {
      const filteredEventsAll = data.events.filter((event) => !type || event.type === type);
      const paginatedEvents = filteredEventsAll.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      );
      setFilteredEvents(paginatedEvents);
      setPageNumber(Math.ceil(filteredEventsAll.length / PER_PAGE));
    }
  }, [data, type, currentPage]);

  const changeType = (evtType) => {
    if (!evtType) {
      setType(null);
    } else {
      setType(evtType);
    }
    setCurrentPage(1);
  };

  const typeList = new Set(data?.events?.map((event) => event.type));
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={changeType} 
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
            {[...Array(pageNumber)].map((_, n) => (
              <a 
                key={`page-${n + 1}`}
                href="#events" 
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;