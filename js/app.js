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
  const location = {
    lat: 37.5059683,
    lng: 127.0667385,
    name: '그랜드힐컨벤션',
    placeId: 1948333104,
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

  const linkData = {
    naver: {
      buttonId: '#location-button-naver',
      enableWeb: true,
      web: "https://naver.me/5HSEqXDy",
      mobile: `nmap://place?lat=${location.lat}&lng=${location.lng}&name=${location.name}`,
    },
    kakao: {
      buttonId: '#location-button-kakao',
      enableWeb: true,
      web: "https://kko.to/MmEHZ53yy-",
      mobile: `kakaomap://place?id=${location.placeId}`,
    },
    kakaonavi: {
      buttonId: '#location-button-kakaonavi',
      enableWeb: false,
      mobile: `kakaonavi://route?y=${location.lat}&x=${location.lng}`,
    },
    tmap: {
      buttonId: '#location-button-tmap',
      enableWeb: false,
      mobile: `tmap://route?rGoY=${location.lat}&rGoX=${location.lng}&rGoName=${location.name}`,
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

  function initShareButtons() {
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

  function initLocationButtons() {
    initLocationButtonNaver()
    initLocationButtonKakaomap()
    initLocationButtonKakaoNavi()
    initLocationButtonTmap()
  }

  function initLocationButtonNaver() {
    const naviButton = document.querySelector(linkData.naver.buttonId)

    naviButton.addEventListener("click", async () => {
      if (isMobile()) {
        window.open(linkData.naver.mobile)
      } else {
        window.open(linkData.naver.web)
      }
    })
  }

  function initLocationButtonKakaomap() {
    const naviButton = document.querySelector(linkData.kakao.buttonId)
    
    naviButton.addEventListener("click", async () => {
      if (isMobile()) {
        window.open(linkData.kakao.mobile)
      } else {
        window.open(linkData.kakao.web)
      }
    })
  }
  
  function initLocationButtonKakaoNavi() {
    const naviButton = document.querySelector(linkData.kakaonavi.buttonId)

    if (!isMobile()) {
      naviButton.style.display = 'none'
      return
    }

    function startNavigation() {
      Kakao.Navi.start({
        name: location.name,
        x: location.lng,
        y: location.lat,
        coordType: 'wgs84',
      });
    }

    naviButton.addEventListener("click", async () => {
      if (isMobile()) {
        startNavigation()
      } else {
        showSnackbar('모바일에서 지원하는 버튼입니다.', 3000)
      }
    })
  }

  function initLocationButtonTmap() {
    const naviButton = document.querySelector(linkData.tmap.buttonId)

    if (!isMobile()) {
      naviButton.style.display = 'none'
      return
    }

    naviButton.addEventListener("click", async () => {
      if (isMobile()) {
        window.open(linkData.tmap.mobile)
      } else {
        showSnackbar('모바일에서 지원하는 버튼입니다.', 3000)
      }
    })
  }

  function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return regex.test(navigator.userAgent)
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
  initShareButtons()
  initLocationButtons()
  activateMenuAnimation()
})()