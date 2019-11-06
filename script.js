//function displays current time and runs every second
function updateTime() {
    $('#currentDay').text(moment().format("dddd, MMMM Do h:mm:ss a"));
};
updateTime();
setInterval(updateTime, 1000);

var hourIterate = 9;
for (let i = 0; i < 9; i++) {
    var newTimeBlock = $('<div>').attr('class', 'row time-block');
    var newHourCol = $('<div>').attr('class', 'col-1 hour');
    var newTextArea = $('<textarea>').attr('class', 'col-10 description');
    if (hourIterate < 13) {
        newHourCol.text(hourIterate + 'AM');
        newTextArea.attr('data-hour', hourIterate);
    } else {
        newHourCol.text((hourIterate - 12) + 'PM');
        newTextArea.attr('data-hour', hourIterate);
    }
    hourIterate++
    var newSaveBtn = $('<div>').attr('class', 'col-1 saveBtn');
    var iconSave = $('<i>').attr('class', 'fas fa-save mx-auto');
    newSaveBtn.append(iconSave);
    newTimeBlock.append(newHourCol, newTextArea, newSaveBtn);
    $('.container').append(newTimeBlock);
}
var currentHour = moment().hour();
var textArea = $('textarea');
var hourTimeBlock = $('.hour');
var saveBtnIcon = $('.saveBtn i');

var planner = {
    9: '',
    10: '',
    11: '',
    12: '',
    13: '',
    14: '',
    15: '',
    16: '',
    17: '',
}

if (JSON.parse(localStorage.getItem('planner')) === null) {
    localStorage.setItem('planner', JSON.stringify(planner));
}
(function getText(obj) {
    planner = JSON.parse(localStorage.getItem('planner'));
    obj = planner;
    console.log(planner);
    for (let key in obj) {
        for (let i = 0; i < 9; i++) {
            $('textarea[data-hour="' + key + '"]').text(planner[key]);
        }
    }
})(planner);

saveBtnIcon.on('click', saveText);
function saveText() {
    var saveTextArea = $(event.target).parent().siblings('textarea');
    var id = saveTextArea.attr('data-hour');
    var input = saveTextArea.val();
    console.log(planner);
    console.log(id)
    console.log(planner[id])
    planner[id] = input;

    $(this).hide();
    //create a save badge when save icon is clicked
    var badge = $('<span>');
    badge.attr('class', 'badge badge-danger mx-auto');
    badge.html('Saved!');
    $(this).parent().append(badge);
    //swap visibility of icon and badge for 1500ms
    setTimeout(() => {
        $(this).show();
        badge.remove();
    }, 1500);
    localStorage.setItem('planner', JSON.stringify(planner));
}

function timeCheck() {
    if (textArea.attr('data-hour') === currentHour) {
        textArea.addClass('present');
    } else if (textArea.attr('data-hour') < currentHour) {
        textArea.addClass('past');
    } else if (textArea.attr('data-hour') > currentHour) {
        textArea.addClass('future');
    }
}
timeCheck();
//Updates half hourly from time of page load
setInterval(timeCheck, 1000 * 60 * 30);