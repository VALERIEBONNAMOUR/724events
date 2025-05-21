import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext/datacontexts";
import { getMonth } from "../../helpers/Date/date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date).getTime() - new Date(evtB.date).getTime()
  );

  // cette fonction permet de changer de slide en cliquant sur le radio button
    const handlePaginationClick = (newIndex) => {
    setIndex(newIndex);
  };

  // Modification du use effect

  useEffect(() => {
    const timer = setTimeout(() => {
      if (byDateDesc?.length) {
        setIndex(prevIndex =>
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc?.length]);
  return (
    <div className="SlideCardList">

      {byDateDesc?.map((event, idx) => (
        
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handlePaginationClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;