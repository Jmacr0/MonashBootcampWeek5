//function displays current time and runs every second
function updateTime() {
    $('#currentDay').html(moment().format("dddd, MMMM Do h:mm:ss a"));    
};
updateTime();
setInterval(updateTime, 1000)

var currentHour = parseInt(moment().format('hh'));
var currentMeridiem = moment().format('A')
var hourTimeBlock = $('.hour');
var hourTime = parseInt(hourTimeBlock[0].textContent.slice(0, 1));
var meridiem = hourTimeBlock[0].textContent.slice(1);

var saveBtnIcon = $('.saveBtn i')

var planner = {
    nine: '',
    ten: '',
    eleven: '',
    twelve: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
}

function clearText() {
    if (JSON.parse(localStorage.getItem('planner')) === null) {
        localStorage.setItem('planner', JSON.stringify(planner))
    }
    else if ((moment().format('hA')) === "12AM") {
        planner = {
            nine: '',
            ten: '',
            eleven: '',
            twelve: '',
            one: '',
            two: '',
            three: '',
            four: '',
            five: '',
        }
        localStorage.setItem('planner', JSON.stringify(planner));
    }
}
clearText();

function getText(obj) {
    planner = JSON.parse(localStorage.getItem('planner'));
    obj = planner;
    for (var key in obj) {
        for (var i = 0; i < 9; i++) {
            $('div[id="' + key + '"]').siblings('textarea').text(obj[key]);
        }
    }
}
getText(planner);


saveBtnIcon.on('click', saveText);

function saveText() {
    var id = $(event.target).parent().attr('id');
    var input = $(event.target).parent().siblings('textarea').val();
    planner[id] = input

    $(this).hide();
    //create a save badge when save icon is clicked
    var badge = $('<span>');
    badge.attr('class', 'badge badge-danger');
    badge.html('Saved!');
    $(this).parent().append(test);
    //swap visibility of icon and badge for 1500ms
    setTimeout(() => {
        $(this).show();
        $(this).parent().children("span").remove();
    }, 1500);

    localStorage.setItem('planner', JSON.stringify(planner));
}


function timeCheck() {
    for (let i = 0; i < hourTimeBlock.length; i++) {
        //if timeblock is double digit times eg 10, 11, 12
        if (hourTimeBlock[i].textContent.length === 4) {
            //if current AM / PM is same as timeblock AM / PM
            if (currentMeridiem === hourTimeBlock[i].textContent.slice(2)) {
                if (currentHour === parseInt(hourTimeBlock[i].textContent.slice(0, 2))) {
                    hourTimeBlock[i].nextElementSibling.classList.add('present');
                }

                else if (currentHour > parseInt(hourTimeBlock[i].textContent.slice(0, 2))) {
                    if (currentHour === 12) {
                        hourTimeBlock[i].nextElementSibling.classList.add('future');
                    } else {
                        hourTimeBlock[i].nextElementSibling.classList.add('past');
                    }

                } else if (currentHour < parseInt(hourTimeBlock[i].textContent.slice(0, 2))) {
                    if (parseInt(hourTimeBlock[i].textContent.slice(0, 2)) === 12) {
                        hourTimeBlock[i].nextElementSibling.classList.add('past');
                    } else {
                        hourTimeBlock[i].nextElementSibling.classList.add('future');
                    }
                }
                //AM / PM is different
            } else if (currentMeridiem !== hourTimeBlock[i].textContent.slice(2)) {
                if (currentMeridiem === "AM" && hourTimeBlock[i].textContent.slice(2) === "PM") {
                    hourTimeBlock[i].nextElementSibling.classList.add('future');
                } else if (currentMeridiem === "PM" && hourTimeBlock[i].textContent.slice(2) === "AM") {
                    hourTimeBlock[i].nextElementSibling.classList.add('past');
                }
            }
            //if timeblock is single digit times eg 1, 2, 3
        } else {
            //if current AM / PM is same as timeblock AM / PM
            if (currentMeridiem === hourTimeBlock[i].textContent.slice(1)) {
                if (currentHour === parseInt(hourTimeBlock[i].textContent.slice(0, 2))) {
                    hourTimeBlock[i].nextElementSibling.classList.add('present');
                }
                else if (currentHour > parseInt(hourTimeBlock[i].textContent.slice(0, 1))) {
                    if (currentHour === 12) {
                        hourTimeBlock[i].nextElementSibling.classList.add('future');
                    } else {
                        hourTimeBlock[i].nextElementSibling.classList.add('past');
                    }
                } else if (currentHour < parseInt(hourTimeBlock[i].textContent.slice(0, 1))) {
                    if (parseInt(hourTimeBlock[i].textContent.slice(0, 1)) === 12) {
                        hourTimeBlock[i].nextElementSibling.classList.add('past');
                    } else {
                        hourTimeBlock[i].nextElementSibling.classList.add('future');
                    }
                }
                //AM / PM is different
            } else if (currentMeridiem !== hourTimeBlock[i].textContent.slice(1)) {
                if (currentMeridiem === "AM" && hourTimeBlock[i].textContent.slice(1) === "PM") {
                    hourTimeBlock[i].nextElementSibling.classList.add('future');
                } else if (currentMeridiem === "PM" && hourTimeBlock[i].textContent.slice(1) === "AM") {
                    hourTimeBlock[i].nextElementSibling.classList.add('past');
                }
            }
        }
    }
}
timeCheck();

//I want something to update on the hour every hour, so this is a placeholder
//Placeholder updates half hourly from time of page load
setInterval(timeCheck, 1000 * 60 * 30);