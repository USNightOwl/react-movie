import { Actor, MoviesOfActor } from "../types/actor.type";
import { PREFIX } from "../types/prefix"
import http from "../utils/http";

const URL = PREFIX.PERSON;
export const actorApi = {
  getActorDetail({ actorId, params }: { actorId: string; params?: object }) {
    return http.get<Actor>(`${URL}/${actorId}`, { params })
  },
  getActorMovies({ actorId, params }: { actorId: string; params?: object }) {
    return http.get<MoviesOfActor>(`${URL}/${actorId}/movie_credits`, { params })
  }
}