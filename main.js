
(function () {

  var clockTag = document.getElementById('clock'),
      secondsTime;


  /**
   * Convert HH:MM:SS format to seconds time.
   * @param {string} formattedTime HH:MM:SS format on a 24-hour clock.
   * @return {number} seconds time up to to 86,400.
   */
  var toSecondsTime = function (formattedTime) {
    var hour = Number(formattedTime.substring(0, 2));
    var min = Number(formattedTime.substring(3, 5));
    var sec = Number(formattedTime.substring(6, 8));
    return (60 * 60 * hour) + (60 * min) + (sec);
  };


  /**
   * Pull current time from Date() and convert to seconds time.
   * @return {number} time of day in total seconds.
   */
  var getCurrentTime = function () {
    var dateNow = new Date();
    var timeNow24 = dateNow.toLocaleTimeString('en-GB');
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
   * Convert total seconds to HH:MM:SS format.
   * @param {number} secondsTime up to to 43,200.
   * @return {string} HH:MM:SS format.
   */
   var formatTime = function (secondsTime) {
    var hour, min, sec;

    // Convert from secondsTime to HH:MM:SS.
    hour = parseInt(secondsTime / (60 * 60))
    min  = parseInt(secondsTime / 60) - (hour * 60);
    sec  = secondsTime % 60;

    // Add a leading zero if a single digit.
    hour = zeroPad(hour);
    min = zeroPad(min);
    sec = zeroPad(sec);

    // If hour is 0, show it as a 12.
    hour = hour === '00' ? 12 : hour;

    return String(hour) + ':' + String(min) + ':' + String(sec);
  };


  /**
   * Increment secondsTime by 1 second.
   */
  var timeStep = function () {
    // At 43,200 seconds, reset to 0.
    secondsTime = secondsTime === 12 * 60 * 60 ? 0 : secondsTime;
    // Increment by 1.
    secondsTime++
    // Display in browser.
    clockTag.textContent = formatTime(secondsTime);

    // console.log(Date.now()/1000);
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

