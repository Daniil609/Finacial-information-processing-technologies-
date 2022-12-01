export default function age_count(date) {
    // now
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now = now.toISOString().substr(0, 19).replace('T',' ');
    // calculate
    var age = now.substr(0, 4) - date.substr(0, 4);
    if(now.substr(5) < date.substr(5)) --age;
    // output
    return age;
}