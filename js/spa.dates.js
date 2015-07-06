/*
 * spa.dates.js
 * Dates feature module for OSCON Demo
 * Brian Capouch 
*/

spa.dates = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
      + '<section class ="dateCalc"></section>',

      input_html : String()
      + '<h4>Date Calculation Region</h4>'
      + '<p><label for="deathDate">Finish Date</label>'
      + ' <input type="date" id="deathDate" />'
      + ' <p><label for="years">Years </label>'
      + ' <input type="number" maxlength="3" id="years" /><br>'
      + ' <label for="months">Months</label>'
      + ' <input type="number" maxlength="2" id="months" /><br>'
      + ' <label for="days">Days  </label>'
      + ' <input type="number" maxlength="2" id="days" />'
      + ' <br><input type="button" value="Calc" id="calcButton" />'
      + ' <input type="button" value="Clear" id="clearButton" />'
      + ' <div id="output">Birth:</div>'
    },
    stateMap = {
      $container  : undefined,
    },
    jqueryMap = {},

    // Local variables, both data and functions
    initModule, copyAnchorMap, setJqueryMap, setClicks,
    calcBirthYear;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //------------------- BEGIN UTILITY METHODS ------------------
  //-------------------- END UTILITY METHODS -------------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Set initial jQuery map values
    jqueryMap = {
      $container : $container,
      $section : $container.find('.dateCalc'),
    };
  };
  // End DOM method /setJqueryMap/

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  //-------------------- END EVENT HANDLERS --------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : spa.dates.initModule( $('#app_div_id') );
  // Purpose   :
  //   Sets up data calculations
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Action    :
  //   Populates $container with the shell of the UI
  //   and then configures and initializes feature modules.
  //   The Shell is also responsible for browser-wide issues
  //   such as URI anchor and cookie management
  // Returns   : none 
  // Throws    : none
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    // Add input widgets to section
    jqueryMap.$section.html( configMap.input_html );
    // Add those new elements to module-wide jquery map
    jqueryMap['$calcButton'] = jqueryMap.$section.find('#calcButton');
    jqueryMap['$days'] = jqueryMap.$section.find('#days');
    jqueryMap['$clear'] = jqueryMap.$section.find('#clearButton');

    // Click handler for Calc button
    jqueryMap.$calcButton.click(function() {
      var inputDate = $('#deathDate').val(),
        lifeYears = $('#years').val(),
        lifeMonths = $('#months').val(),
        lifeDays = $('#days').val(),
        death = moment(inputDate),
        birth = moment(death);

        birth.subtract(lifeYears, 'years').subtract(lifeMonths, 'months').subtract(lifeDays, 'days'); 
      $('#output').html('Birth: ' + birth.format("dddd, MMMM Do YYYY") );
      });

    // Handler when user hits enter in "Days" widget
    // This logic should be in a macro or function
    jqueryMap.$days.keypress(function(e) {
      // 13 = Return (Enter) key
      if(e.which == 13) {
        // This logic is identical to click handler above!
        var inputDate = $('#deathDate').val(),
        lifeYears = $('#years').val(),
        lifeMonths = $('#months').val(),
        lifeDays = $('#days').val(),
        death = moment(inputDate),
        birth = moment(death);

        birth.subtract(lifeYears, 'years').subtract(lifeMonths, 'months').subtract(lifeDays, 'days');
      $('#output').html('Birth: ' + birth.format("dddd, MMMM Do YYYY"));
      }
      }); 

    // Clear input fields on clear button click
    jqueryMap.$clear.click(function() {
      $('#deathDate').val('');
      $('#years').val('');
      $('#months').val('');
      $('#days').val('');
      });

    // Test moment library functions by showing my age
    var now = moment(),
      birthday = moment('1951-02-20');
    jqueryMap.$section.append('<br>Date now: ' 
      + now.format("dddd, MMMM Do YYYY") 
      + '<br>Capouch\'s precise age: ' + moment.duration(now.diff(birthday)).format());

 } 

  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
