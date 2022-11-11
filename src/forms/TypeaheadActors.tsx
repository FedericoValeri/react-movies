import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { actorMovieDTO } from "../actors/actors.model";

export default function TypeaheadActor(props: typeaheadActorProps) {
  const actors: actorMovieDTO[] = [
    {
      id: 1,
      name: "Tom Holland",
      character: "",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg",
    },
    {
      id: 2,
      name: "Cate Blanchett",
      character: "",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Cate_Blanchett_Cannes_2018_2_%28cropped%29.jpg/200px-Cate_Blanchett_Cannes_2018_2_%28cropped%29.jpg",
    },
    {
      id: 3,
      name: "George Clooney",
      character: "",
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/George_Clooney_2016.jpg/220px-George_Clooney_2016.jpg",
    },
  ];

  const selected: actorMovieDTO[] = [];

  const [draggedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);

  function handleDragStart(actor: actorMovieDTO) {
    setDraggedElement(actor);
  }

  function handleDragOver(actor: actorMovieDTO) {
    if (!draggedElement) {
      return;
    }
    if (actor.id !== draggedElement.id) {
      const draggedElementIndex = props.actors.findIndex(
        (a) => a.id === draggedElement.id
      );
      const actorIndex = props.actors.findIndex((a) => a.id === actor.id);
      const actors = [...props.actors];
      actors[actorIndex] = draggedElement;
      actors[draggedElementIndex] = actor;
      props.onAdd(actors);
    }
  }

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <Typeahead
        id="typeahed"
        onChange={(actors) => {
          if (props.actors.findIndex((a) => a.id === actors[0].id) === -1) {
            props.onAdd([...props.actors, actors[0]]);
          }
          console.log(actors);
        }}
        options={actors}
        labelKey={(actor) => actor.name}
        filterBy={["name"]}
        placeholder="Type actor..."
        minLength={1}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(actor) => (
          <>
            <img
              src={actor.picture}
              alt="actor"
              style={{ height: "64px", width: "64px", marginRight: "10px" }}
            />
            <span>{actor.name}</span>
          </>
        )}
      />
      <ul className="list-group">
        {props.actors.map((actor) => (
          <li
            className="list-group-item list-group-item-action"
            key={actor.name}
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
          >
            {props.listUI(actor)}
            <span
              className="badge badge-primary badge-pill text-dark pointer"
              style={{ marginLeft: "0.5rem" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface typeaheadActorProps {
  displayName: string;
  actors: actorMovieDTO[];
  onAdd(actors: actorMovieDTO[]): void;
  onRemove(actors: actorMovieDTO): void;
  listUI(actor: actorMovieDTO): ReactElement;
}
