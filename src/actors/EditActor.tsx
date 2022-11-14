import { urlActors } from "../endpoint";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/formDataUtils";
import ActorForm from "./ActorForm";
import { actorCreateDTO, actorDTO } from "./actors.model";

export default function EditActor() {
  function transform(actor: actorDTO): actorCreateDTO {
    return {
      name: actor.name,
      pictureURL: actor.picture,
      biography: actor.biography,
      dateOfBirth: new Date(actor.dateOfBirth),
    };
  }

  return (
    <EditEntity<actorCreateDTO, actorDTO>
      url={urlActors}
      entityName="Actor"
      indexURL="/actors"
      transformFormData={convertActorToFormData}
      transform={transform}
    >
      {(entity, edit) => (
        <ActorForm
          model={entity}
          onSubmit={async (values) => await edit(values)}
        />
      )}
    </EditEntity>
  );
}
