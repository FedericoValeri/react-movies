import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { actorMovieDTO } from "../actors/actors.model";
import { urlActors } from "../endpoint";

export default function TypeaheadActor(props: typeaheadActorProps) {
  const [actors, setActors] = useState<actorMovieDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selected: actorMovieDTO[] = [];
  const [draggedElement, setDraggedElement] = useState<
    actorMovieDTO | undefined
  >(undefined);

  function handleSearch(query: string) {
    setIsLoading(true);
    axios
      .get(`${urlActors}/searchByName/${query}`)
      .then((response: AxiosResponse<actorMovieDTO[]>) => {
        setActors(response.data);
        setIsLoading(false);
      });
  }

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
      <AsyncTypeahead
        id="typeahed"
        onChange={(actors) => {
          if (props.actors.findIndex((a) => a.id === actors[0].id) === -1) {
            actors[0].character = "";
            props.onAdd([...props.actors, actors[0]]);
          }
        }}
        options={actors}
        labelKey={(actor) => actor.name}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
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
