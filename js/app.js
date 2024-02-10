(function () {
  function calculateDay(targetDate) {
    const targetTime = new Date(targetDate)
    const todayTime = new Date()

    const diff = targetTime - todayTime

    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24))
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const diffMin = Math.floor((diff / (1000 * 60)) % 60)
    const diffSec = Math.floor(diff / 1000 % 60)

    return {
      day: diffDay,
      hour: diffHour,
      min: diffMin,
      second: diffSec
    }
  }

  function activateTimerUI() {
    setInterval(() => {
      const dDay = calculateDay("2024-06-08 11:30:00")
      document.querySelector('#timer').innerText = `D-${dDay.day} ${dDay.hour}:${dDay.min}:${dDay.second}`
    }, 1000)
  }

  function checkMenu() {
    if (window.scrollY > 44) {
      document.body.classList.add('global-nav-sticky')
    } else {
      document.body.classList.remove('global-nav-sticky')
    }
  }


  window.addEventListener('load', () => {
    window.addEventListener('scroll', () => {
      checkMenu()
    })
  })

  activateTimerUI()
})()