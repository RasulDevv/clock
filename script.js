const wrapper = document.querySelector('.wrapper'),
links = [...document.querySelectorAll('.links_link')],
arrow_clock = document.querySelector('.arrow_clock'),
timer = document.querySelector('.timer'),
arr_hour = document.querySelector('.arr_hour'),
arr_minute = document.querySelector('.arr_minute'),
arr_second = document.querySelector('.arr_second'),
num_clock = [...document.querySelectorAll('.num_clock_el')],
timer_btn = document.getElementById('timer_btn'),
timers = [...document.querySelectorAll('.timers')],
timerSpan = document.querySelector('.links_link_extra span')

function waitingPage() {
    setTimeout(() => {
        timer.style.opacity = arguments[0]
        arrow_clock.style.opacity = arguments[1]
        arguments[3].style.color = 'red'
    }, 1)
}

links.forEach((link, index) => {
    link.addEventListener('click', function() {
        for(const key in links) {
            this.checked = true
            this.classList.add('active')
            if(this.getAttribute('data-link') === 'hour') {
                arrow_clock.classList.add('active')
                if(links[key].getAttribute('data-link') === 'timer') {
                    waitingPage(0, 1, links[key])
                    timer.classList.remove('active')
                    links[key].classList.remove('active')
                    links[key].checked = false
                }
            }
            else {
                timer.classList.add('active')
                if(links[key].getAttribute('data-link') === 'hour') {
                    waitingPage(1, 0, links[key])
                    arrow_clock.classList.remove('active')
                    links[key].classList.remove('active')
                    links[key].checked = false
                }
            }
        }

    })
})


function arrClock() {
    let time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds(),
    milliseconds = time.getMilliseconds()
    arr_hour.style.transform = `rotateZ(${30 * hours + minutes / 2}deg)`
    arr_minute.style.transform = `rotateZ(${6 * minutes + seconds / 10}deg)`
    arr_second.style.transform = `rotateZ(${6 * seconds + milliseconds * 3 / 500}deg)`
    num_clock.forEach(item => {
        if(item.getAttribute('data-numClock') === 'hour') {
            item.innerHTML = hours < 10 ? '0' + hours : hours
        }
        else if(item.getAttribute('data-numClock') === 'minute') {
            item.innerHTML = minutes < 10 ? '0' + minutes : minutes
        }
    })
    setTimeout(arrClock, 1)
}
arrClock()


function numClock() {
    num_clock.forEach(item => {
        if(item.getAttribute('data-numClock') === 'points') {
            if(item.style.color === 'white') item.style.color = '#2c2f38'
            else item.style.color = 'white'
        }
    })
    setTimeout(numClock, 500)
}
numClock()




// TIMER****************************************************************************8



timer_btn.addEventListener('click', function() {
    if(this.innerHTML === 'start') {
        this.innerHTML = 'stop'
        timerSpan.style.background = 'white'
        timerFunc()
    }
    else if(this.innerHTML === 'stop') {
        this.innerHTML = 'clear'
        timerSpan.style.background = 'red'
    }
    else if(this.innerHTML === 'clear') {
        this.innerHTML = 'start'
        timerSpan.style.background = 'transparent'
        timerHour = 0
        timerMinute = 0
        timerSecond = 0
        timers.forEach(item => {
            item.innerHTML = 0
        })
    }
})

let timerHour = 0, timerMinute = 0, timerSecond = 0,
timerDataSets = ['hour', 'minute', 'second']

function timerFunc() {
    if(timer_btn.innerHTML === 'stop') {
        timers.forEach(item => {
            if(item.getAttribute('data-timers') === 'hour') {
                item.innerHTML = timerHour
            }
            else if(item.getAttribute('data-timers') === 'minute') {
                item.innerHTML = timerMinute
                if(timerMinute === 60) {
                    timerMinute = 0
                    timerHour++
                }
            }
            else if(item.getAttribute('data-timers') === 'second') {
                item.innerHTML = timerSecond
                timerSecond++
                if(timerSecond === 60) {
                    timerSecond = 0
                    timerMinute++
                }
            }
        })
        setTimeout(timerFunc, 1000)
    }
}