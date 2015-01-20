
(function () {

  var secondsTime, hour, min, sec;


  /**
   * Convert HH:MM:SS format to seconds time.
   * @param {string} formattedTime HH:MM:SS format on a 24-hour clock.
   * @return {number} seconds time up to to 86,400.
   */
  var toSecondsTime = function (formattedTime) {
    var hour = Number(formattedTime.substring(0, 2)),
        min  = Number(formattedTime.substring(3, 5)),
        sec  = Number(formattedTime.substring(6, 8));
    return (60 * 60 * hour) + (60 * min) + (sec);
  };


  /**
   * Pull current time from the local system and convert to seconds time.
   * @return {number} time of day in total seconds.
   */
  var getCurrentTime = function () {
    var dateNow = new Date(),
        timeNow24 = dateNow.toLocaleTimeString('en-GB');
    return toSecondsTime(timeNow24);
  };


  /**
   * Convert a number to a zero-padded string.
   * @param {number} num A one or two digit integer.
   * @return {string} A two character string.
   */
  var zeroPad = function (num) {
    return num < 10 ? '0' + num : String(num);
  };


  /**
   * Convert seconds time to hour, min, sec.
   * @param {number} secondsTime up to to 43,200.
   */
  var toHMS = function (secondsTime) {

    // Convert from secondsTime to HH:MM:SS.
    hour = parseInt(secondsTime / (60 * 60));
    min  = parseInt(secondsTime / 60) - (hour * 60);
    sec  = secondsTime % 60;

    // Add a leading zero if a single digit.
    hour = zeroPad(hour);
    min  = zeroPad(min);
    sec  = zeroPad(sec);

    // If hour is 0, show it as a 12.
    hour = hour === '00' ? 12 : hour;
  };


  /**
   * Convert seconds time to HH:MM:SS format.
   * @param {number} secondsTime up to to 43,200.
   * @return {string} HH:MM:SS format.
   */
  var formatTime = function (secondsTime) {
    var HMS = toHMS(secondsTime);
    return String(hour) + ':' + String(min) + ':' + String(sec);
  };


  /**
   * Convert seconds time to #RRGGBB format.
   * @param {number} secondsTime up to to 43,200.
   * @return {string} #RRGGBB format.
   */
  var formatRGB = function (secondsTime) {
    var HMS = toHMS(secondsTime);
    return '#' + hour + min + sec;
  }


  /**
   * Increment secondsTime by 1 second.
   */
  var timeStep = function () {

    var elem = document.getElementById('clock'),
        halfDay = 12 * 60 * 60;  // seconds in 12 hours

    // Convert secondsTime to a 12-hour clock.
    secondsTime = secondsTime >= halfDay ? secondsTime - halfDay : secondsTime;

    // Increment by 1 second.
    secondsTime++

    // Display updated time in browser.
    // elem.textContent = formatTime(secondsTime);

    // Display updated time in browser using hex format.
    elem.textContent = formatRGB(secondsTime);

    // Adust the background color to reflect the time converted to #RRGGBB.
    elem.style.backgroundColor = formatRGB(secondsTime);
  };


  /**
   * Run the timeStep function once every second.
   */
  var tick = function () {
    window.setInterval(timeStep, 1000);
  };


  /**
   * Capture the current time when program starts, then internally
   * increment the clock thereafter and update the display in the browser.
   */
  var main = function () {
    secondsTime = getCurrentTime();
    tick();
  };


  // Kick off the program.
  main();

}());

