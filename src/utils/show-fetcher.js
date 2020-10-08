import Moment from "moment-timezone";

export default async function getCurrentShowInfo(station, num) {
    var title = null, startTimestamp = null, endTimestamp = null, stationTimezone = null, startTimeLocal = null, endTimeLocal = null;
    const localTimezone = Moment.tz.guess();
    try {
        if (station === "NTS 1") {
            const searchUrl = "https://nts.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/London";
        } else if (station === "NTS 2") {
            const searchUrl = "https://nts2.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/London";
        } else if (station === "The Lot Radio") {
            const searchUrl = "https://thelot.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "America/New_York";
        } else if (station === "n10.as") {
            const searchUrl = "https://n10as.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "America/New_York";
        } else if (station === "Dublab") {
            const searchUrl = "https://api-1.dublab.com/wp-json/lazystate/v1/stream?";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info["/stream"].current.combo;
            startTimestamp = info["/stream"].current.start;
            endTimestamp = info["/stream"].current.end;
            stationTimezone = "America/Los_Angeles";
        } else if (station === "Worldwide FM") {
            const searchUrl = "https://worldwidefm.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/London";
            /*} else if (station === "Seoul Community Radio") {
                const searchUrl = "https://seoulcommunityradio.airtime.pro/api/live-info";
                const response = await fetch(searchUrl);   
                const info = await response.json(); 
                title = info.currentShow[0].name;*/
        } else if (station === "Cashmere Radio") {
            const searchUrl = "https://cashmereradio.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/Berlin";
        } else if (station === "Dublin Digital Radio") {
            const searchUrl = "https://dublindigitalradio.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/Dublin";
        } else if (station === "8 Ball Radio") {
            const searchUrl = "https://eightball.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "America/New_York";
        } else if (station === "New New World Radio") {
            const searchUrl = "https://nnw.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current.name;
            if (title.endsWith(" - New New World Radio"))
                title = title.substr(0, title.length - 22);
            startTimestamp = info.current.starts;
            endTimestamp = info.current.ends;
            stationTimezone = "Europe/London";
        } else if (station === "Boxout.fm") {
            const searchUrl = "https://boxoutfm.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            if (title.startsWith("boxout.fm - "))
                title = info.current.name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Asia/Kolkata";
        } else if (station === "The Word Radio") {
            const searchUrl = "https://thewordradio.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/Brussels";
            /*} else if (station === "Soho Radio (Music)") {
                const searchUrl = "https://public.radio.co/stations/s57043ec0a/status";
                const response = await fetch(searchUrl);
                const info = await response.json();
                title = info.current_track.title;
            } else if (station === "Soho Radio (Culture)") {
                const searchUrl = "https://public.radio.co/stations/s3f1b3fe79/status";
                const response = await fetch(searchUrl);
                const info = await response.json();
                title = info.current_track.title;*/
        } else if (station === "KMAH Radio") {
            const searchUrl = "https://public.radio.co/stations/sfb32271cb/status";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current_track.title;
            if (title.startsWith("kmah radio - "))
                title = title.substr(13, title.length);
            startTimestamp = info.current_track.start_time;
            endTimestamp = Moment(info.current_track.start_time).add(2, "h").format();
            stationTimezone = "Europe/London";
        } else if (station === "Foundation FM") {
            const searchUrl = "https://public.radio.co/stations/s0628bdd53/status";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current_track.title;
            if (title.startsWith("Foundation FM - ") || title.startsWith("FOUNDATION_FM - "))
                title = title.substr(16, title.length);
            else if (title.startsWith("Foundation FM  - "))
                title = title.substr(17, title.length);
            startTimestamp = info.current_track.start_time;
            if (title.toLowerCase().includes("brunch"))
                endTimestamp = Moment(info.current_track.start_time).add(3, "h").format();
            else if (title.toLowerCase().includes("catch") || title.toLowerCase().includes("happy hour") || title.toLowerCase().includes("the specialists"))
                endTimestamp = Moment(info.current_track.start_time).add(2, "h").format();
            else if (title.toLowerCase().includes("takeover") || title.toLowerCase().includes("playlist") || title.toLowerCase().includes("hour"))
                endTimestamp = Moment(info.current_track.start_time).add(1, "h").format();
            else
                startTimestamp = "Unknown duration";
            stationTimezone = "Europe/London";
        } else if (station === "20ft Radio") {
            const searchUrl = "https://app.20ftradio.net/stream-status.php";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.shoutcast.track;
            startTimestamp = "now";
            endTimestamp = 1;
        } else if (station === "Skylab Radio") {
            const searchUrl = "https://skylab-radio.com/api/airtime/current";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current.name;
            startTimestamp = info.current.starts;
            endTimestamp = info.current.ends;
            stationTimezone = "Europe/London";
        } else if (station === "1020 Radio") {
            const searchUrl = "https://1020.live/player/meta/get";
            const response = await fetch(searchUrl);
            const info = await response.json();
            startTimestamp = "Unknown duration";
            if (title.startsWith("1020 Archive")) endTimestamp = "∞";
        } else if (station === "Netil Radio") {
            const searchUrl = "https://studio.mixlr.com/api/stations/4/schedule.json";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.on_air.show.title;
            if (title == null) title = "Archive";
            startTimestamp = "Unknown duration";
            /*} else if (station === "Resonance FM") {
                const searchUrl = "https://www.resonancefm.com/now-next.json";
                const response = await fetch(searchUrl);
                const trimmed = response.substring(1, response.length - 1);
                const info = await trimmed.json(); 
                title = info.now.title;*/
        } else if (station === "Resonance Extra") {
            const searchUrl = "https://x.resonance.fm/current_show_query";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.title;
            startTimestamp = "2000/01/01 " + info.started_at + ":00";
            endTimestamp = "2000/01/01 " + info.ends_at + ":00";
            stationTimezone = "Europe/London";
        } else if (station === "BBC Radio 6") {
            const searchUrl = "https://rms.api.bbc.co.uk/v2/broadcasts/poll/bbc_6music";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.data[0].titles.primary + " - " + info.data[0].titles.secondary;
            startTimestamp = "Unknown duration";
        } else if (station === "WFMU") {
            const searchUrl = "https://wfmu.org/wp-content/themes/wfmu-theme/library/php/includes/liveNow.php";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.show;
            startTimestamp = "Unknown duration";
            /*} else if (station === "Hotel Radio Paris") {
                const searchUrl = "https://hotelradioparis.com/getTrack?c=undefined";
                title = await fetch(searchUrl); */
        } else if (station === "Noods Radio") {
            const searchUrl = "https://noodsradio.airtime.pro/api/live-info";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.currentShow[0].name;
            startTimestamp = info.currentShow[0].start_timestamp;
            endTimestamp = info.currentShow[0].end_timestamp;
            stationTimezone = "Europe/London";
        } else if (station === "Reprezent Radio") {
            const searchUrl = "https://www.reprezent.org.uk/service/live/current";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current.name;
            startTimestamp = "2000/01/01 " + info.current.start_time + ":00";
            endTimestamp = "2000/01/01 " + info.current.end_time + ":00";
            stationTimezone = "Europe/London";
        } else if (station === "ISO Radio") {
            const searchUrl = "https://public.radio.co/stations/s08ee97bf4/status";
            const response = await fetch(searchUrl);
            const info = await response.json();
            title = info.current_track.title;
            startTimestamp = "Unknown duration";
        }

        console.log(title);
        if (title.endsWith(" "))
            title = title.substr(0, title.length - 1);
        if (title.startsWith(" - "))
            title = title.substr(3, title.length);
        while (title.includes("&amp;"))
            title = title.replace("&amp;", "&");
        while (title.includes("&apos;"))
            title = title.replace("&apos;", "'");
        while (title.includes("&#039;"))
            title = title.replace("&#039;", "'");
        if (title === "" || title === " ")
            title = station;

        if (startTimestamp === "Unknown duration")
            return { title: title, time: startTimestamp };
        if (startTimestamp === "now")
            return { title: title, time: startOf(Moment(), 0, "hour").format("h:mma") + "-" + startOf(Moment().add(endTimestamp, "h"), 0, "hour").format("h:mma") }

        if (stationTimezone != null && startTimestamp != null && endTimestamp != null) {
            var startTime, endTime;
            if (/^\d+$/.test(startTimestamp)) {
                startTime = Moment.tz(Moment.unix(startTimestamp), stationTimezone);
                endTime = Moment.tz(Moment.unix(endTimestamp), stationTimezone);
            } else {
                startTime = Moment.tz(startTimestamp, stationTimezone);
                endTime = Moment.tz(endTimestamp, stationTimezone);
            }
            startTimeLocal = startOf(startTime.clone().tz(localTimezone), 30, "minute").format("h:mma");
            endTimeLocal = startOf(endTime.clone().tz(localTimezone).add(20, "m"), 30, "minute").format("h:mma");
        }

        return { title: title, time: startTimeLocal != null && endTimeLocal != null ? startTimeLocal + "-" + endTimeLocal : "" };

    } catch (error) {
        if (num === 30)
            return { title: "Offline", time: startTimeLocal != null && endTimeLocal != null ? startTimeLocal + "-" + endTimeLocal : "" };
        else {
            num++;
            return getCurrentShowInfo(station, num);
        }
    }
}

const startOf = (m, n, unit) => {
    const units = [
        'year',
        'month',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];
    const pos = units.indexOf(unit);
    if (pos === -1) {
        throw new Error('Unsupported unit');
    }
    for (let i = pos + 1; i < units.length; i++) {
        m.set(units[i], 0);
    }
    m.set(unit, Math.floor(m.get(unit) / n) * n);

    return m;
};