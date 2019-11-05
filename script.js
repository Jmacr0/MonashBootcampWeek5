$('#currentDay').html(moment().format("dddd, MMMM Do"));

var currentHour = parseInt(moment().format('hh'));
var currentMeridiem = moment().format('A')
var hourTimeBlock = $('.hour');
var hourTime = parseInt(hourTimeBlock[0].textContent.slice(0, 1));
var meridiem = hourTimeBlock[0].textContent.slice(1);

var saveBtn = $('.saveBtn')

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


saveBtn.on('click', saveText);

function saveText() {
    var input = $(event.target).siblings('textarea').val()
    var id = $(event.target).attr('id')

    console.log(id)
    console.log(planner)
    planner[id] = input

    JSON.stringify(localStorage.setItem('planner', planner))
}


function timeCheck() {
    for (let i = 0; i < hourTimeBlock.length; i++) {
        //double digit times
        if (hourTimeBlock[i].textContent.length === 4) {
            //AM / PM is same
            if (currentMeridiem === hourTimeBlock[i].textContent.slice(2)) {

                if (currentHour > parseInt(hourTimeBlock[i].textContent.slice(0, 2))) {
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
            //single digit times
        } else {
            //AM / PM is same 
            if (currentMeridiem === hourTimeBlock[i].textContent.slice(1)) {

                if (currentHour > parseInt(hourTimeBlock[i].textContent.slice(0, 1))) {
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


