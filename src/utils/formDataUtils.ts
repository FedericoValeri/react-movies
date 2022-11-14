import { actorCreateDTO } from "../actors/actors.model";

export function convertActorToFormData(actor: actorCreateDTO): FormData {
  const formData = new FormData();
  formData.append("name", actor.name);
  if (actor.biography) {
    formData.append("biography", actor.biography);
  }
  if (actor.dateOfBirth) {
    formData.append("dateOfBirth", formatDate(actor.dateOfBirth));
  }
  if (actor.picture) {
    formData.append("picture", actor.picture);
  }
  return formData;
}

function formatDate(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("it", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [{ value: day }, , { value: month }, , { value: year }] =
    format.formatToParts(date);
  return `${day}-${month}-${year}`;
}
