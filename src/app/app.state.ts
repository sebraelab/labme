// import { AppState as CoreState } from './core/core.state';
import { EventosState } from './eventos/state/eventos.state';

// export interface AppState extends CoreState {
export interface AppState {
  eventos: EventosState;
}
