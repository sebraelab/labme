import * as moment from 'moment';

export const generateNextStartDate = startDate =>
  moment(startDate)
    .add(7, 'days')
    .toISOString();

export const parseQueryParamsToFiltro = queryParams => ({
  data_inicial: queryParams.data_inicial || Date(),
  espacos: queryParams.espacos ? queryParams.espacos.split(',') : []
});
