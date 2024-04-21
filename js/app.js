(() => {
  const { createClient } = supabase

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
    title: "민슬기 ❤️ 권민철",
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

  const imageViewer = {
    initialX: null,
    currentImage: {
      src: "asset/gallary/JH_04160 copy.jpeg",
    },
    currentIndex: 0,
    slides: 0,
  }

  const gallaryImages = [
    {
      src: "asset/gallary/JH_04160 copy.jpeg",
    },
    {
      src: "asset/gallary/JH_04.jpeg",
    },
    {
      src: "asset/gallary/JH_03349 copy.jpeg",
    },
    {
      src: "asset/gallary/JH_04144 copy.jpeg",
    },
    {
      src: "asset/gallary/JH_03124 copy.jpeg"
    },
    {
      src: "asset/gallary/JH_03442 copy.jpeg"
    },
    {
      src: "asset/gallary/JH_03316 copy.jpeg"
    },
    {
      src: "asset/gallary/JH_03195 copy.jpeg"
    },
    {
      src: "asset/gallary/JH_03268 copy.jpeg"
    },
    {
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
        accountNumber: '1002035162550',
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
        accountNumber: '42102352029295',
        bankName: '농협'
      },
      {
        buttonId: 'account-button-female-mother',
        name: '문예덕',
        accountNumber: '42102351044870',
        bankName: '농협'
      },
    ]
  }

  const accountSection = {
    male: {
      show: false
    },
    female: {
      show: false
    }
  }

  const guestbookSection = {
    modal: {
      open: false,
    },
    query: {
      list: [],
    }
  }

  const _supabase = createClient('https://ylulwameexydbjvtvvrb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdWx3YW1lZXh5ZGJqdnR2dnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4ODM5OTcsImV4cCI6MjAyNzQ1OTk5N30.PxlbdoX7r3UdQQxBrr7MIMnnkCm4VhOX15_G74Whwxs')

  function formatDateTime(date) {
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).slice(-2)
    var day = ('0' + date.getDate()).slice(-2)

    return year + '. ' + month + '. ' + day
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

      if (isMobile()) {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: '민철과 슬기의 결혼에 초대합니다.',
            description: '2024년 6월 8일 토요일 오전 11시 30분 그랜드힐 컨벤션 사브리나홀',
            imageUrl: 'https://wedding.mskmc.world/asset/og_image.jpg',
            imageWidth: 1500,
            imageHeight: 1000,
            link: {
              mobileWebUrl: 'https://wedding.mskmc.world',
              webUrl: 'https://wedding.mskmc.world',
            },
          },
          itemContent: {
            profileText: '권민철 ❤️ 민슬기',
            profileImageUrl: 'https://wedding.mskmc.world/favicon.ico',
          },
          buttons: [
            {
              title: '청첩장 구경하기',
              link: {
                mobileWebUrl: 'https://wedding.mskmc.world',
                webUrl: 'https://wedding.mskmc.world',
              },
            },
          ],
        })
      } else {
        await navigator.clipboard.writeText(metadata.clipboardData.content)
        showSnackbar('클립보드에 복사되었어요. 카카오톡으로 공유해보세요.', 3000)
      }
    })
  }

  function showSlide(index) {
    const slides = document.querySelectorAll('.image-slide')

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none'
    })

    const imageViewerIndex = document.querySelector("#image-viewer-index")
    imageViewerIndex.innerText = `${imageViewer.currentIndex + 1} / ${gallaryImages.length}`
  }

  function startTouch(e) {
    imageViewer.initialX = e.touches[0].clientX
  }

  function moveTouch(e) {
    if (imageViewer.initialX === null) {
      return
    }

    let currentX = e.touches[0].clientX
    let diffX = imageViewer.initialX - currentX

    if (diffX > 0) {
      // left swipe
      imageViewer.currentIndex = (imageViewer.currentIndex + 1) % imageViewer.slides.length
    } else {
      // right swipe
      imageViewer.currentIndex = (imageViewer.currentIndex - 1 + imageViewer.slides.length) % imageViewer.slides.length
    }

    showSlide(imageViewer.currentIndex)
    imageViewer.initialX = null
  }

  function initSlider() {
    document.getElementById('image-slider').addEventListener('touchstart', startTouch, false);
    document.getElementById('image-slider').addEventListener('touchmove', moveTouch, false);
  }

  function initImageViewer() {
    const imageSlider = document.querySelector('#image-slider')

    imageSlider.innerHTML = gallaryImages.map((image, index) => (
      `
        <img id="image-viewer-image" class="image-slide" src="${image.src}">
      `
    )).join("")

    const slides = document.querySelectorAll('.image-slide')
    imageViewer.slides = slides

    initSlider()
  }

  function initGallary() {
    const gallaryContainer = document.querySelector(".gallary-container")

    gallaryContainer.innerHTML = gallaryImages.map((image, index) => (
      `
        <div class="gallary-container-item" id="gallary-item-${index}"><img class="gallery-image" src="${image.src}" /></div>
      `
    )).join("")

    gallaryImages.forEach((image, index) => {
      const gallaryItem = document.querySelector(`#gallary-item-${index}`)

      gallaryItem.addEventListener('click', () => {
        setImageViewer(image, index)
        openImageViewer()
      })
    })

    const prevImage = document.querySelector("#get-prev-image")

    prevImage.addEventListener('click', (event) => {
      event.preventDefault()
      setImageViewerPrevImage()
      showSlide(imageViewer.currentIndex)
    })

    const nextImage = document.querySelector("#get-next-image")

    nextImage.addEventListener('click', (event) => {
      event.preventDefault()
      setImageViewerNextImage()
      showSlide(imageViewer.currentIndex)
    })
  }

  function setImageViewer(image, index) {
    imageViewer.currentImage = image
    imageViewer.currentIndex = index
  }

  function setImageViewerNextImage() {
    if (imageViewer.currentIndex >= gallaryImages.length - 1) {
      imageViewer.currentIndex = 0
    } else {
      imageViewer.currentIndex = imageViewer.currentIndex + 1
    }

    imageViewer.currentImage = gallaryImages[imageViewer.currentIndex]
  }

  function setImageViewerPrevImage() {
    if (imageViewer.currentIndex == 0) {
      imageViewer.currentIndex = gallaryImages.length - 1
    } else {
      imageViewer.currentIndex = imageViewer.currentIndex - 1
    }

    imageViewer.currentImage = gallaryImages[imageViewer.currentIndex]
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

  function openContactModal() {
    enableFadedBackground('40%')
    showContactModal()
  }

  function closeContactModal() {
    disableFadedBackground()
    hideContactModal()
  }

  function setupModalButtons() {
    initCloseModalButton()
    initFadedBackgroundClick()
  }

  function enableFadedBackground(opacity) {
    const background = document.querySelector(".faded-background")

    background.style.setProperty('display', 'flex')
    background.style.setProperty('opacity', opacity)

    document.body.style.overflow = 'hidden'
  }

  function disableFadedBackground() {
    const background = document.querySelector(".faded-background")

    background.style.setProperty('display', 'none')

    document.body.style.removeProperty('overflow')
  }

  function showContactModal() {
    const modal = document.querySelector("#contact-modal")
    modal.style.setProperty('display', 'flex')
  }

  function hideContactModal() {
    const modal = document.querySelector("#contact-modal")

    modal.style.setProperty('display', 'none')
  }

  function initFadedBackgroundClick() {
    const background = document.querySelector(".faded-background")

    background.addEventListener("click", (event) => {
      closeContactModal()
      hideImageViewer()
      closeGuestbookModal()
    })
  }

  function showImageViewer() {
    const imageViewer = document.querySelector("#image-viewer")

    imageViewer.style.setProperty('display', 'flex')
  }

  function hideImageViewer() {
    const imageViewer = document.querySelector("#image-viewer")

    imageViewer.style.setProperty('display', 'none')
  }

  function openImageViewer() {
    showSlide(imageViewer.currentIndex)
    enableFadedBackground('90%')
    showImageViewer()
  }

  // function renderImageView() {
  //   const imageViewImage = document.querySelector("#image-viewer-image")
  //   const imageViewerIndex = document.querySelector("#image-viewer-index")

  //   imageViewImage.src = imageViewer.currentImage.src
  //   imageViewerIndex.innerText = `${imageViewer.currentIndex + 1} / ${gallaryImages.length}`
  // }

  function initCloseModalButton() {
    const button = document.querySelector("#close-modal")

    button.addEventListener("click", () => {
      closeContactModal()
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

    openContactModal()
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
    const targetButton = document.querySelector(`#contact-modal-buttons`)

    targetButton.innerHTML = renderButtons(modal.contacts.buttons)
  }

  function renderContact(contactElement) {
    // <div class="modal-profile-avatar">
    //   ${contactElement.profileImageUrl}
    // </div>
    return `
      <div class="modal-content-profile">
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

    maleAccounts.style.display = 'none'
    femaleAccounts.style.display = 'none'
  }

  function initAccountButtons() {
    const maleAccountButton = document.querySelector("#male-account-button")
    const maleAccountArrow = document.querySelector("#male-account-button-arrow")
    const maleAccountList = document.querySelector("#male-accounts")

    const femaleAccountButton = document.querySelector("#female-account-button")
    const femaleAccountArrow = document.querySelector("#female-account-button-arrow")
    const femaleAccountList = document.querySelector("#female-accounts")

    maleAccountButton.addEventListener('click', (e) => {
      onClickAccount(maleAccountList, accountSection.male, maleAccountArrow)
    })

    femaleAccountButton.addEventListener('click', (e) => {
      onClickAccount(femaleAccountList, accountSection.female, femaleAccountArrow)
    })
  }

  function onClickAccount(list, state, arrow) {
    if (!state.show) {
      list.style.removeProperty('display')
      arrow.style.setProperty('transform', 'scaleY(-1)')
      state.show = true
    } else {
      list.style.setProperty('display', 'none')
      arrow.style.removeProperty('transform')
      state.show = false
    }
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

  function initGuestbook() {
    renderGuestbook()
    listenFormInputs()
  }

  async function fetchGuestbook() {
    // call server
    const { data, error } = await _supabase
    .from('guestbook')
    .select()
    .order('id', { ascending: false })
    .limit(10)

    guestbookSection.query = {
      list: data.map(dataElement => ({
        writerName: dataElement.name,
        content: dataElement.content,
        writtenAt: new Date(dataElement.created_at)
      }))
    }
  }

  async function postGuestbook(command) {
    const { error } = await _supabase
        .from('guestbook')
        .insert({
          name: command.writerName,
          content: command.content,
          created_at: new Date(),
        })

      if (error != null) {
        console.log(error)
        throw new Error('잠시 후 다시 시도해주세요.');
      }
  }

  async function renderGuestbook() {
    await fetchGuestbook()

    const guestbookQuery = guestbookSection.query

    if (guestbookQuery.list.length < 1) {
      return
    }

    const guestbookList = document.querySelector(".guestbook-item")

    guestbookList.innerHTML = guestbookQuery.list
      .map(ele => (
        `
      <div class="guestbook-item">
        <div class="introduce-body">
          <div class="introduce-body-wrapper">
            <div class="inner-border">
              <div class="inner-content">
                <div class="inner-content-avartar">
                  <img src="asset/svg/icn_black_heart.svg"/>
                </div>
                <div class="inner-content-header">
                  ${ele.writerName}
                </div>
                <div class="inner-content-body">
                  ${ele.content}
                </div>
                <div class="inner-content-footer">
                  ${formatDateTime(ele.writtenAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      )).join('')
  }

  function initGuestbookButtons() {
    const guestbookButton = document.querySelector('.guestbook-button')

    guestbookButton.addEventListener('click', () => {
      openGuestbookModal()
    })

    const guestbookCloseButton = document.querySelector('#close-guestbook-modal')

    guestbookCloseButton.addEventListener('click', () => {
      closeGuestbookModal()
    })

    enableGuestBookSubmitButton()
  }

  function enableGuestBookSubmitButton() {
    const guestbookSubmitButton = document.querySelector('#guestbook-submit-button')

    guestbookSubmitButton.addEventListener('click', () => {
      submitGuestbook()
    })
  }

  function disableGuestBookSubmitButton() {
    const guestbookSubmitButton = document.querySelector('#guestbook-submit-button')

    guestbookSubmitButton.addEventListener('click', () => {})
  }

  function openGuestbookModal() {
    guestbookSection.modal.open = true

    renderGuestbookModal()
  }

  function closeGuestbookModal() {
    guestbookSection.modal.open = false

    renderGuestbookModal()
  }

  function renderGuestbookModal() {
    const modal = document.querySelector('#guestbook-modal')

    if (guestbookSection.modal.open) {
      enableFadedBackground('40%')
      modal.style.setProperty('display', 'flex')
    } else {
      disableFadedBackground()
      modal.style.setProperty('display', 'none')
    }
  }

  async function submitGuestbook() {
    const writerName = document.querySelector('#guestbook-writer-name')
    const content = document.querySelector('#guestbook-content')

    try {
      validateForms(writerName.value, content.value)
      await postGuestbook({
        writerName: writerName.value,
        content: content.value,
      })
      initForms()
      closeGuestbookModal()
      renderGuestbook()
      showSnackbar('방명록을 남겼어요.', 2000)
      return
    } catch (e) {
      console.error(e)
      showSnackbar(e.message, 2000)
      return
    }
  }

  function validateForms(writerName, content) {
    if (writerName.length < 1) {
      throw new Error('작성자를 입력하지 않고 등록할 수 없어요.')
    } 
    if (writerName.length > 20 || writerName.length == 0) {
      throw new Error('작성자는 20자까지 입력할 수 있어요.')
    }
    if (content.length < 1) {
      throw new Error('내용을 입력하지 않고 등록할 수 없어요.')
    }
    if (content.length > 500 || content.length == 0) {
      throw new Error('내용은 500자까지 입력할 수 있어요.')
    }
  }

  function listenFormInputs() {
    const writerName = document.querySelector('#guestbook-writer-name')
    const content = document.querySelector('#guestbook-content')

    writerName.addEventListener("input", (event) => {
      // if (content.value.length > 1 && content.value.length < 501 && writerName.value.length > 1 &&  writerName.value.length < 21) {
      //   enableGuestBookSubmitButton()
      // } else {
      //   disableGuestBookSubmitButton()
      // }
    })

    content.addEventListener("input", (event) => {
      // if (content.value.length > 1 && content.value.length < 501 && writerName.value.length > 1 &&  writerName.value.length < 21) {
      //   console.log('input - content')
      //   enableGuestBookSubmitButton()
      // } else {
      //   disableGuestBookSubmitButton()
      // }
    })
  }

  function initForms() {
    const writerName = document.querySelector('#guestbook-writer-name')
    const content = document.querySelector('#guestbook-content')

    writerName.value = ''
    content.value = ''
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
  initImageViewer()
  initShareButtons()
  initLocationButtons()
  initAccountLayout()
  initAccountButtons()
  initGuestbook()
  initGuestbookButtons()

  setupModalButtons()
  setUpContactButtons()
  activateMenuAnimation()

  initScreenLayout()
  initScreenInfo()
})()