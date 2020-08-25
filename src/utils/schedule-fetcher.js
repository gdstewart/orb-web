import Moment from "moment-timezone";

export default async function getCurrentSchedule(station) {
    var schedule = [[], [], [], [], [], [], []];
    const today = Moment().isoWeekday();
    const localTimezone = Moment.tz.guess();
    var info;
    var stationTimezone;
    try {
        if (station === "NTS 1") {
            const searchUrl = "https://nts.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/London";
        } else if (station === "NTS 2") {
            const searchUrl = "https://nts2.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/London";
        } else if (station === "The Lot Radio") {
            const searchUrl = "https://thelot.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "America/New_York";
        } else if (station === "n10.as") {
            const searchUrl = "https://n10as.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "America/New_York";
        } else if (station === "Dublab") {
            info = "https://www.dublab.com/schedule";
        } else if (station === "Worldwide FM") {
            const searchUrl = "https://worldwidefm.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/London";
            /*} else if (station === "Seoul Community Radio") {
                const searchUrl = "https://seoulcommunityradio.airtime.pro/api/week-info";
                const response = await fetch(searchUrl);   
                info = await response.json(); 
                stationTimezone = "Asia/Seoul";*/
        } else if (station === "Cashmere Radio") {
            const searchUrl = "https://cashmereradio.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/Berlin";
        } else if (station === "Dublin Digital Radio") {
            const searchUrl = "https://dublindigitalradio.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/Dublin";
        } else if (station === "8 Ball Radio") {
            const searchUrl = "https://eightball.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "America/New_York";
        } else if (station === "New New World Radio") {
            info = "https://nnwradio.com/#schedule";
        } else if (station === "Boxout.fm") {
            const searchUrl = "https://boxoutfm.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Asia/Kolkata";
        } else if (station === "The Word Radio") {
            const searchUrl = "https://thewordradio.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/Brussels";
            /*} else if (station === "Soho Radio (Music)") {
                info = "https://www.sohoradiolondon.com/schedule/";*/
        } else if (station === "KMAH Radio") {
            info = "https://kmah-radio.com/";
        } else if (station === "Foundation FM") {
            info = "https://foundation.fm/";
        } else if (station === "20ft Radio") {
            info = "https://www.20ftradio.net/events";
        } else if (station === "Skylab Radio") {
            info = "https://skylab-radio.com/timetable";
        } else if (station === "1020 Radio") {
            info = "https://1020.live/schedule";
        } else if (station === "Netil Radio") {
            info = "https://www.facebook.com/netilradio/";
        } else if (station === "Frission Radio") {
            const searchUrl = "https://frission.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/London";
            /*} else if (station === "Resonance FM") {
                info = "https://resonancefm.com/schedule";*/
        } else if (station === "Resonance Extra") {
            info = "https://extra.resonance.fm/schedule";
        } else if (station === "BBC Radio 6") {
            info = "https://www.bbc.co.uk/schedules/p00fzl65";
        } else if (station === "WFMU") {
            info = "https://www.wfmu.org/table";
            /*} else if (station === "Hotel Radio Paris") {
                info = "https://hotelradioparis.com/";*/
        } else if (station === "Noods Radio") {
            const searchUrl = "https://noodsradio.airtime.pro/api/week-info";
            const response = await fetch(searchUrl);
            info = await response.json();
            stationTimezone = "Europe/London";
        } else if (station === "Reprezent Radio") {
            info = "https://www.reprezent.org.uk/#/schedule";
        } else if (station === "ISO Radio") {
            info = "https://www.isoradio.to/";
        }

        if (stationTimezone != null) {
            var extraDaysChecked = false;
            for (var i = 0; i < 8; i++) {
                if (info[Object.keys(info)[today + i - 1]] !== null) {
                    var day = info[Object.keys(info)[today + i - 1]];
                    for (var j = 0; j < day.length; j++) {
                        var startTime = Moment.tz(day[j].start_timestamp, stationTimezone);
                        var startTimeLocal = startTime.clone().tz(localTimezone);
                        if (startTimeLocal.day() < startTime.day()) {
                            if (i !== 0) schedule[i - 1].push(startTimeLocal.format("h:mma") + " " + getFormattedName(day[j].name));
                        } else if (startTimeLocal.day() > startTime.day()) {
                            if (i !== 6) schedule[i + 1].push(startTimeLocal.format("h:mma") + " " + getFormattedName(day[j].name));
                        } else {
                            if (i === 7) {
                                j = day.length;
                            } else {
                                if (i === 0 && today !== 1 && !extraDaysChecked) {
                                    var yesterday = info[Object.keys(info)[today - 1]];
                                    for (var k = 0; k < yesterday.length; k++) {
                                        var startTimeExtra = Moment.tz(yesterday[k].start_timestamp, stationTimezone);
                                        var startTimeLocalExtra = startTimeExtra.clone().tz(localTimezone);
                                        if (startTimeLocalExtra.day() > startTimeExtra.day()) {
                                            schedule[i].push(startTimeLocalExtra.format("h:mma") + " " + getFormattedName(yesterday[k].name));
                                        }
                                    }
                                    extraDaysChecked = true;
                                }
                                schedule[i].push(startTimeLocal.format("h:mma") + " " + getFormattedName(day[j].name));
                            }
                        }
                    }
                }
            }
            return schedule;
        } else return info;

    } catch (error) {
        return "Schedule not found";
    }
}

var getFormattedName = (name) => {
    if (name.startsWith(" - "))
        return name.substr(3, name.length);
    if (name.includes("&amp;"))
        return name.replace("&amp;", "&");
    if (name.includes("&#039;"))
        return name.replace("&#039;", "'");
    return name;
}
