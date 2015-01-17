
var clockTag = document.getElementById('clock'),
    totalSecs = 0;


// var date = new Date();
// console.log(date.toLocaleTimeString());



/**
 * Convert a number to a zero-padded string.
 * @param {num} A one or two digit integer.
 * @return {string} A two character string.
 */
var zeroPad = function (num) {
  return num < 10 ? '0' + num : String(num);
};


/**
 * Convert total seconds to HH:MM:SS format.
 * @param {number} totalSecs up to to 43,200.
 * @return {string} HH:MM:SS format.
 */
 var formatTime = function (totalSecs) {
  var hour, min, sec;

  // Convert from totalSecs to HH:MM:SS.
  hour = parseInt(totalSecs / (60 * 60))
  min  = parseInt(totalSecs / 60) - (hour * 60);
  sec  = totalSecs % 60;

  // Add a leading zero if a single digit.
  hour = zeroPad(hour);
  min = zeroPad(min);
  sec = zeroPad(sec);

  // If hour is 0, show it as a 12.
  hour = hour === '00' ? 12 : hour;

  return String(hour) + ':' + String(min) + ':' + String(sec);
};


/**
 * Increment totalSecs by 1 second.
 */
var tick = function () {
  // At 43,200 seconds, reset to 0.
  totalSecs = totalSecs === 12 * 60 * 60 ? 0 : totalSecs;
  // Increment by 1.
  totalSecs++
  // Display in browser.
  clockTag.textContent = formatTime(totalSecs);

  // console.log(Date.now()/1000);
};


/**
 * Run the tick function once every second.
 */
var runMetronome = function () {
  window.setInterval(tick, 1000);
};


// Kick off the program.
runMetronome();

