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

  const gallaryImages = [
    {
      no: 1,
      src: "asset/gallary/JH_04160 copy.jpeg",
    },
    {
      no: 2,
      src: "asset/gallary/JH_04.jpeg",
    },
    {
      no: 3,
      src: "asset/gallary/JH_03349 copy.jpeg",
    },
    {
      no: 4,
      src: "asset/gallary/JH_04144 copy.jpeg",
    },
    {
      no: 5,
      src: "asset/gallary/JH_03124 copy.jpeg"
    },
    {
      no: 6,
      src: "asset/gallary/JH_03442 copy.jpeg"
    },
    {
      no: 7,
      src: "asset/gallary/JH_03316 copy.jpeg"
    },
    {
      no: 8,
      src: "asset/gallary/JH_03195 copy.jpeg"
    },
    {
      no: 9,
      src: "asset/gallary/JH_03268 copy.jpeg"
    },
    {
      no: 10,
      src: "asset/gallary/JH_03496 copy.jpeg"
    },
  ]

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

  const snackbarMessage = {
    phoneNumberSuccess: "전화번호가 복사되었습니다.",
    addressSucess: "주소가 복사되었습니다.",
    accountCopySuccess: "계좌번호가 복사되었습니다.",
  }

  const modal = {
    contacts: {
      contents: [
        {
          buttonId: "contact-button-male",
          profileImageUrl: "",
          title: "신랑",
          name: "권민철",
          phoneNumber: "010-3883-9801",
          color: "blue",
        },
        {
          buttonId: "contact-button-male-father",
          profileImageUrl: "",
          title: "신랑 아버지",
          name: "권영준",
          phoneNumber: "010-6345-5555",
          color: "blue",
        },
        {
          buttonId: "contact-button-male-mother",
          profileImageUrl: "",
          title: "신랑 어머니",
          name: "이영희",
          phoneNumber: "010-8749-9802",
          color: "blue",
        },
        {
          buttonId: "contact-button-female",
          profileImageUrl: "",
          title: "신부",
          name: "민슬기",
          phoneNumber: "010-6478-4908",
          color: "red",
        },
        {
          buttonId: "contact-button-female-father",
          profileImageUrl: "",
          title: "신부 아버지",
          name: "민병용",
          phoneNumber: "010-9406-4908",
          color: "red",
        },
        {
          buttonId: "contact-button-female-mother",
          profileImageUrl: "",
          title: "신부 어머니",
          name: "문예덕",
          phoneNumber: "010-6215-4908",
          color: "red",
        },
      ],
      buttons: [
        {
          buttonId: 'copy',
          name: '복사하기',
          onClick: onClickCopyPhoneNumber
        },
        {
          buttonId: 'call',
          name: '전화하기',
          onClick: onClickCallPhoneNumber
        },
      ]
    }
  }

  const accountData = {
    male: [
      {
        buttonId: 'account-button-male',
        name: '권민철',
        accountNumber: '3333017905482',
        bankName: '카뱅',
      },
      {
        buttonId: 'account-button-male-father',
        name: '권영준',
        accountNumber: '314210038508',
        bankName: '우리'
      },
      {
        buttonId: 'account-button-male-mother',
        name: '이영희',
        accountNumber: '',
        bankName: '우리'
      },
    ],
    female: [
      {
        buttonId: 'account-button-female',
        name: '민슬기',
        accountNumber: '9003233746641',
        bankName: '새마을',
      },
      {
        buttonId: 'account-button-female-father',
        name: '민병용',
        accountNumber: '',
        bankName: '우리'
      },
      {
        buttonId: 'account-button-female-mother',
        name: '문예덕',
        accountNumber: '',
        bankName: '우리'
      },
    ]
  }

  function onClickCopyPhoneNumber(phoneNumber) {
    copyToClipboard(phoneNumber, snackbarMessage.phoneNumberSuccess)
  }

  function onClockCopyAddress(address) {
    copyToClipboard(address, snackbarMessage.addressSucess)
  }

  function onClickCallPhoneNumber(phoneNumber) {
    callTo(phoneNumber)
  }

  function copyToClipboard(content, message) {
    navigator.clipboard.writeText(content)
      .then(() => {
        showSnackbar(message, 3000)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function callTo(phoneNumber) {
    document.location.href = `tel:${phoneNumber}`
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

  function initGallary() {
    const gallaryContainer = document.querySelector(".gallary-container")

    gallaryContainer.innerHTML = gallaryImages.map(image => (
      `
        <div class="gallary-container-item"><img class="gallery-image" src="${image.src}" /></div>
      `
    )).join("")
  }

  function initLocationButtons() {
    initLocationCopyButton()
    initLocationButtonNaver()
    initLocationButtonKakaomap()
    initLocationButtonKakaoNavi()
    initLocationButtonTmap()
  }

  function initLocationCopyButton() {
    const aTag = document.querySelector(".copy")

    aTag.addEventListener("click", (event) => {
      event.preventDefault()
      onClockCopyAddress("서울시 강남구 역삼로 604")
    })
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

  function openModal() {
    enableFadedBackground()
    showModal()
  }

  function closeModal() {
    disableFadedBackground()
    hiddeModal()
  }

  function setupModalButtons() {
    initCloseModalButton()
    initFadedBackgroundClick()
  }

  function enableFadedBackground() {
    const background = document.querySelector(".faded-background")

    background.style.setProperty('display', 'flex')
  }

  function disableFadedBackground() {
    const background = document.querySelector(".faded-background")

    background.style.setProperty('display', 'none')
  }

  function showModal() {
    const modal = document.querySelector("#modal")
    modal.style.setProperty('display', 'flex')
    
    document.body.style.overflow = 'hidden'
  }

  function hiddeModal() {
    const modal = document.querySelector("#modal")

    modal.style.setProperty('display', 'none')

    document.body.style.removeProperty('overflow')
  }

  function initFadedBackgroundClick() {
    const background = document.querySelector(".faded-background")

    background.addEventListener("click", (event) => {
      closeModal()
    })
  }

  function initCloseModalButton() {
    const button = document.querySelector("#close-modal")

    button.addEventListener("click", () => {
      closeModal()
    })
  }

  function setUpContactButtons() {
    document.querySelectorAll(".contact-item")
      .forEach(element => element.addEventListener("click", onClickContactOpenModalListener))
  }

  function onClickContactOpenModalListener() {
    const clickedElementId = this.id

    const foundContact = modal.contacts.contents.find(element => element.buttonId == clickedElementId)

    renderContactModalContent(foundContact)
    renderContactModalButtons(foundContact)

    initContactButtons(foundContact)
    initContactModalButtons(modal.contacts.buttons, foundContact.phoneNumber)

    openModal()
  }

  function renderContactModalContent(contactElement) {
    const targetContent = document.querySelector('.modal-content')

    targetContent.innerHTML = renderContact(contactElement)
  }

  function initContactButtons(contactElement) {
    document.querySelector('.modal-profile-phone')
      .addEventListener("click", async () => {
        copyToClipboard(contactElement.phoneNumber, snackbarMessage.phoneNumberSuccess)
      })
  }

  function renderContactModalButtons(contactElement) {
    const targetButton = document.querySelector(`.modal-buttons`)

    targetButton.innerHTML = renderButtons(modal.contacts.buttons)
  }

  function renderContact(contactElement) {
    return `
      <div class="modal-content-profile">
        <div class="modal-profile-avatar">
          ${contactElement.profileImageUrl}
        </div>
        <div class="modal-margin-column"></div>
        <div class="modal-profile-name">
          <div class="title-text">
            ${contactElement.title}
          </div>
          <div class="margin-text"></div>
          <div class="name-text">
            ${contactElement.name}
          </div>
        </div>
        <div class="modal-margin-column"></div>
        <div class="modal-profile-phone phone-${contactElement.color}">
          <div class="phonenumber-${contactElement.color}-text">
            ${contactElement.phoneNumber}
          </div>
        </div>
      </div>
    `
  }

  function renderButtons(buttons) {
    return buttons.map((button, index) => {
      return `
        <div class="modal-button" id="modal-button-${index}">
          <div class="modal-button-text">
            ${button.name}
          </div>
        </div>
      `
    }).join(`<div style="height: 100%; width: 1px; background-color: #EFEFF0;"></div>`)
  }

  function initContactModalButtons(buttons, phoneNumber) {
    buttons.map((button, index) => {
      const buttonElement = document.querySelector(`#modal-button-${index}`)

      buttonElement.addEventListener('click', () => {
        button.onClick(phoneNumber)
      })
    })
  }

  function initAccountLayout() {
    const maleAccounts = document.querySelector("#male-accounts")
    const femaleAccounts = document.querySelector("#female-accounts")

    maleAccounts.innerHTML = renderAccounts(accountData.male)
    femaleAccounts.innerHTML = renderAccounts(accountData.female)

    accountData.male
      .forEach((account) => {
        const button = document.querySelector(`#${account.buttonId}`)

        button.addEventListener('click', (e) => {
          e.preventDefault()
          copyToClipboard(account.accountNumber, snackbarMessage.accountCopySuccess)
        })
      })

    accountData.female
      .forEach((account) => {
        const button = document.querySelector(`#${account.buttonId}`)

        button.addEventListener('click', (e) => {
          e.preventDefault()
          copyToClipboard(account.accountNumber, snackbarMessage.accountCopySuccess)
        })
      })
  }

  function renderAccounts(accounts) {
    return accounts.map(account => (
      `
        <div class="drop-down-element">
        <div style="flex: 1.5; font-weight: 700; text-align: center;">
          ${account.name}
        </div>
        <div style="flex: 5">
          ${account.accountNumber} (${account.bankName})
        </div>
        <a style="flex: 1" id=${account.buttonId} href="">
          복사
        </a>
      </div>
      `
    )).join(`<div style="height: 1px; width: 100%; background-color: #EFEFF0;"></div>`)
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

  document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector(".before-load")

    window.addEventListener('load', () => {
      loading.style.opacity = 0

      setTimeout(function () {
        loading.style.display = 'none'
      }, 3000)
    })

    loading.style.opacity = 1;
  })

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

  initGallary()
  initShareButtons()
  initLocationButtons()
  initAccountLayout()
  setupModalButtons()
  setUpContactButtons()
  activateMenuAnimation()
  initScreenLayout()
  initScreenInfo()
})()