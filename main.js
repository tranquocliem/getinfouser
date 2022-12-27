let checkAdBlock = false;

function adBlockDetector() {
  document.body.innerHTML += `<div class="adsbygoogle" id="test-ad"></div>`;
  const testAd = document.getElementById("test-ad");
  const testAdStyle = getComputedStyle(testAd);

  if (testAdStyle.display === "none") {
    alert("Vui lòng tắt chặn quảng cáo và tải lại trang");
    checkAdBlock = true;
  } else {
    console.log("No Ads");
    checkAdBlock = false;
  }
}

adBlockDetector();

async function getAPI() {
  let response = await fetch("http://ip-api.com/json/?fields=61439");
  let data = await response.json();
  return data;
}

getAPI().then((data) => {
  console.log(data);
  document.getElementById("ip").textContent = data.query;
  document.getElementById("isp").textContent = data.isp;
  document.getElementById(
    "country"
  ).textContent = `${data.country} (${data.countryCode})`;
  document.getElementById("city").textContent = `${data.city} (${data.region})`;
  // document
  //   .getElementById("googlemap")
  //   .setAttribute(
  //     "src",
  //     `https://www.google.com/maps?q=${data.lat},${data.lon}&output=embed`
  //   );
});
const findLocationGGMap = () => {
  const successPosition = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    document
      .getElementById("googlemap")
      .setAttribute(
        "src",
        `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`
      );
  };

  const errorPosition = () => {
    alert("Vui lòng mở quyền truy cập vị trí");
    console.log("Không cho phép !!!!");
  };

  navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
};

const findLocations = () => {
  const successPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    async function getAPILocations() {
      let response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
      );
      let data = await response.json();
      return data;
    }

    getAPILocations().then((data) => {
      console.log(data);
    });
  };

  const errorPosition = () => {
    alert("Vui lòng mở quyền truy cập vị trí");
    console.log("Không cho phép !!!!");
  };

  navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
};

findLocations();

document
  .getElementById("btnLocation")
  .addEventListener("click", findLocationGGMap);

setTimeout(() => {
  document.getElementById("platform").textContent = platform.name;
  document.getElementById("version").textContent = platform.version;
  document.getElementById("os").textContent = platform.os;
}, 1000);

async function getAPIIP() {
  let response = await fetch("https://ipapi.co/json/city");
  console.log(response);
}

// getAPIIP().then((data) => {
//   console.log(data);
// });
getAPIIP();

let type = navigator.connection.effectiveType;

console.log(navigator.connection);

function updateConnectionStatus() {
  console.log(
    `Connection type changed from ${type} to ${navigator.connection.effectiveType}`
  );
  type = navigator.connection.effectiveType;
}

updateConnectionStatus();
