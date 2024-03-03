Kakao.init('bf71571bf6ea158626353a599a6fc6c2');

var container = document.getElementById('kakao-map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.5059683, 127.0667385), //지도의 중심좌표.
  draggable: false, // 마우스 드래그, 휠, 모바일 터치를 이용한 시점 변경(이동, 확대, 축소) 가능 여부
  scrollwheel: false, // 마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
  disableDoubleClick: false,
  disableDoubleClickZoom: false,
  level: 3 //지도의 레벨(확대, 축소 정도)
};

//지도 생성 및 객체 리턴
var map = new kakao.maps.Map(container, options);

// 마커가 표시될 위치입니다 
var markerPosition = new kakao.maps.LatLng(37.5059683, 127.0667385);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);