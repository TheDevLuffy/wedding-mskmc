(() => {
  let scrollY = 0;

  const screenInfo = {
    header: {
      height: 48
    },
    nav: {
      height: 45
    },
    introduce: {
      name: 'introduce',
      offsetTop: 0,
    },
    gallary: {
      name: 'gallary',
      offsetTop: 0,
    },
    location: {
      name: 'location',
      offsetTop: 0,
    },
    contact: {
      name: 'contact',
      offsetTop: 0,
    },
    guestbook: {
      name: 'guestbook',
      offsetTop: 0,
    },
  }

  const metadata = {
    shareData: {
      title: "민슬기 ❤️ 권민철",
      text: "2024년 6월 8일 오전 11시 30분 결혼식에 초대합니다.",
      url: "https://wedding.mskmc.world",
    },
    clipboardData: {
      content: `
      2024년 6월 8일 토요일 오전 11시 30분
      민철과 슬기의 결혼에 초대합니다.
      https://wedding.mskmc.world
      `
    }
  }

  function initScreenLayout() {
    document.querySelector('#introduce').style.marginTop = `${screenInfo.header.height + screenInfo.nav.height}px`
  }

  function initScreenInfo() {
    screenInfo.introduce.offsetTop = document.querySelector(`#${screenInfo.introduce.name}`).offsetTop
    screenInfo.gallary.offsetTop = document.querySelector(`#${screenInfo.gallary.name}`).offsetTop
    screenInfo.location.offsetTop = document.querySelector(`#${screenInfo.location.name}`).offsetTop
    screenInfo.contact.offsetTop = document.querySelector(`#${screenInfo.contact.name}`).offsetTop
    screenInfo.guestbook.offsetTop = document.querySelector(`#${screenInfo.guestbook.name}`).offsetTop
  }

  function initButtons() {
    initShareButton()
    initShareButtonKakao()
  }

  function initShareButton() {
    const shareButton = document.querySelector("#share-button");

    shareButton.addEventListener("click", async () => {
      if (navigator.canShare) {
        try {
          await navigator.share(metadata.shareData)
        } catch (err) {
          console.error(err)
        }
      } else {
        try {
          await navigator.clipboard.writeText(metadata.clipboardData.content)
          showSnackbar('클립보드에 복사되었어요.', 3000)
        } catch (err) {
          console.error(err)
          showSnackbar('복사에 실패했습니다.', 3000)
        }
      }
    })
  }

  function initShareButtonKakao() {
    const shareButton = document.querySelector("#share-button-kakao");

    shareButton.addEventListener("click", async () => {
      showSnackbar('카카오톡 공유하기', 3000)
    })
  }

  function showSnackbar(text, duration) {
    const snackbar = document.querySelector("#snackbar")
    const snackbarText = document.querySelector("#snackbar-text")

    snackbar.style.display = 'block'
    snackbarText.innerText = text

    setTimeout(() => {
      snackbar.style.display = 'none'
    }, duration)
  }

  function activateMenuAnimation() {
    document.querySelectorAll('a[href^="#"]')
      .forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault()

          const targetId = anchor.getAttribute('href')
          const targetElement = document.querySelector(targetId)

          window.scrollTo({
            'behavior': 'smooth',
            'top': targetElement.offsetTop - screenInfo.nav.height
          })
        })
      })
  }

  function selectedMenu() {
    document.querySelectorAll('a[href^="#"]')
      .forEach(element => {
        const targetId = element.getAttribute('href')
        const targetName = targetId.replace('#', '')
        const wrapper = element.parentElement


        switch (targetName) {
          case screenInfo.introduce.name:
            if (scrollY < screenInfo.gallary.offsetTop - (screenInfo.nav.height)) {
              wrapper.classList.add('selected-item')
              element.style.opacity = 1
            } else {
              wrapper.classList.remove('selected-item')
              element.style.opacity = '50%'
            }
            break

          case screenInfo.gallary.name:
            if (scrollY < screenInfo.location.offsetTop - (screenInfo.nav.height) && scrollY >= screenInfo.gallary.offsetTop - (screenInfo.nav.height)) {
              wrapper.classList.add('selected-item')
              element.style.opacity = 1
            } else {
              wrapper.classList.remove('selected-item')
              element.style.opacity = '50%'
            }
            break

          case screenInfo.location.name:
            if (scrollY < screenInfo.contact.offsetTop - (screenInfo.nav.height) && scrollY >= screenInfo.location.offsetTop - (screenInfo.nav.height)) {
              wrapper.classList.add('selected-item')
              element.style.opacity = 1
            } else {
              wrapper.classList.remove('selected-item')
              element.style.opacity = '50%'
            }
            break

          case screenInfo.contact.name:
            if (scrollY < screenInfo.guestbook.offsetTop - (screenInfo.nav.height) && scrollY >= screenInfo.contact.offsetTop - (screenInfo.nav.height)) {
              wrapper.classList.add('selected-item')
              element.style.opacity = 1
            } else {
              wrapper.classList.remove('selected-item')
              element.style.opacity = '50%'
            }
            break

          case screenInfo.guestbook.name:
            if (scrollY > screenInfo.guestbook.offsetTop - (screenInfo.nav.height)) {
              wrapper.classList.add('selected-item')
              element.style.opacity = 1
            } else {
              wrapper.classList.remove('selected-item')
              element.style.opacity = '50%'
            }
            break
        }
      })
  }

  function changeMenuVisibility() {
    if (scrollY > 44) {
      document.body.classList.add('global-nav-sticky')
    } else {
      document.body.classList.remove('global-nav-sticky')
    }
  }

  window.addEventListener('load', () => {
    scrollY = window.scrollY
    initScreenLayout()
    changeMenuVisibility()
    selectedMenu()

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY
      initScreenLayout()
      changeMenuVisibility()
      selectedMenu()
    })
  })

  initScreenLayout()
  initScreenInfo()
  initButtons()
  activateMenuAnimation()
})()