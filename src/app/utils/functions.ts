import * as moment from 'moment';

export const generateNextStartDate = startDate =>
  moment(startDate)
    .add(7, 'days')
    .toISOString();
