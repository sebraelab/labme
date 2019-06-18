import { CalendarsState } from './calendars/state/calendars.state';
import { EspacosState } from './espacos/state/espacos.state';

export interface AppState {
  calendars: CalendarsState;
  espacos: EspacosState;
}
