const dateYYMMDD=/^\d\d\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/
module.exports={
    dateRegex:dateYYMMDD,
    emailRegex,
    panRegex
}