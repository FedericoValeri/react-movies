import { urlGenres } from "../endpoint";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreateDTO, genreDTO } from "./genres.model";

export default function EditGenre() {
  return (
    <>
      <EditEntity<genreCreateDTO, genreDTO>
        url={urlGenres}
        entityName="Genres"
        indexURL="/genres"
      >
        {(entity, edit) => (
          <GenreForm
            model={entity}
            onSubmit={async (value) => {
              // when the form is posted
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
