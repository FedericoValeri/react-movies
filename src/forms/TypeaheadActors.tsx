import { Typeahead } from "react-bootstrap-typeahead";
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

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <Typeahead
        id="typeahed"
        onChange={(actor) => {
          console.log(actor);
        }}
        options={actors}
        labelKey="name"
        filterBy={["name"]}
        placeholder="Write the name of the actor..."
        minLength={1}
      />
    </div>
  );
}

interface typeaheadActorProps {
  displayName: string;
  actors: actorMovieDTO[];
}
