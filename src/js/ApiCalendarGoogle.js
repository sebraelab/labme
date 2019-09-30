// google calendar IDs
const myKey = 'AIzaSyABCLg02DnJ0PqwUMpM6vwOPRSlSc7L3Ls';
const netflixId = 'ikc1o4rhld3ct31t3fakps0et8@group.calendar.google.com';
const ciscoId = `54ela9729018idmddcse06ua8s@group.calendar.google.com`;
const godaddyId = `1olon5hik9hb8nbb38u2cunolg@group.calendar.google.com`;
const cycladesId = `pnigeguu21lnfimambh78efu90@group.calendar.google.com`;
const googleId = `7rm846f3m1g5eqaf3r24ufv538@group.calendar.google.com`;
const appleId = `3vqabbtk3pbcl20oph1h7vmupc@group.calendar.google.com`;
const berkeleyId = `tl71k1baadlege5qiv4mvdtb30@group.calendar.google.com`;
const anexosId = `ogjvprvjudma7dicvqm0oj13ds@group.calendar.google.com`;
const openEventsId = `jjidbfu6he1nnq7udt0uj23vfg@group.calendar.google.com`;
const baseurl = 'https://www.googleapis.com/calendar/v3/calendars/';

//export default class ApiCalendarGoogle {
//constructor() {

//}
const calcTimeMax = (timeMin, timeMax) => {
  if (timeMax === 30)
    timeMax = new Date(timeMin.getTime() + (timeMax * 24 * 60 * 60 * 1000));
  return timeMax;
}

const requestAllCalendar = (timeMin = new Date(), timeMax = 30) => {
  let end = calcTimeMax(timeMin, timeMax).toISOString()
  let params = `/events?key=${myKey}&timeMin=${timeMin.toISOString()}
								&timeMax=${end}`
  console.log(baseurl + netflixId + params);
  return Promise.all(
    [fetch(baseurl + netflixId + params).then(response => response.json()),
    fetch(baseurl + ciscoId + params).then(response => response.json()),
    fetch(baseurl + godaddyId + params).then(response => response.json()),
    fetch(baseurl + cycladesId + params).then(response => response.json()),
    fetch(baseurl + googleId + params).then(response => response.json()),
    fetch(baseurl + appleId + params).then(response => response.json()),
    fetch(baseurl + berkeleyId + params).then(response => response.json()),
    fetch(baseurl + anexosId + params).then(response => response.json()),
    fetch(baseurl + openEventsId + params).then(response => response.json())
    ]
  )
}

export default function resumeAllCalendar() {
  return new Promise((resolve, reject) => {
    var calendars = requestAllCalendar();
    var resume = [];
    calendars.then(calendars => {
      calendars.forEach(calendar => {
        var resumeitem = {};
        resumeitem["place"] = calendar.summary;
        resumeitem["items"] = [];
        calendar.items.forEach(item => {
          let jsonresumeitem = {};
          jsonresumeitem["sumary"] = item.summary;
          jsonresumeitem["start"] = item.start;
          jsonresumeitem["end"] = item.end;
          resumeitem["items"].push(jsonresumeitem);
        });
        resume.push(resumeitem);
      });
      let resumejson = JSON.stringify(resume)
      resolve(resumejson);
    });
  });

}
//}