var HttpClient = function HttpClient() {
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) aCallback(anHttpRequest.responseText);
    };
    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

let client = new HttpClient();
let idChannel = 'UCVswRUcKC-M35RzgPRv8qUg';
let part = 'statistics,brandingSettings';
let titleChannel = document.querySelector('#title-channel');
let descChannel = document.querySelector('#description-channel');
let imgChannel = document.querySelector('#img-channel');
let countChannel = document.querySelector('#count');

let form = document.querySelector('#form');

let showStat = (id) => {
  client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=AIzaSyCUrZ8fPXGj3hwPtuZdrrElaUY6g62UhFs`, (response) => {
    let info = JSON.parse(response).items[0];
    console.log(info);
    titleChannel.innerText = info.brandingSettings.channel.title;
    descChannel.innerText = info.brandingSettings.channel.description;
    countChannel.innerText = info.statistics.subscriberCount;
    imgChannel.src = info.brandingSettings.image.bannerImageUrl;
  })
}

let searchChannel = (nameChannel) => {
  client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${nameChannel}&key=AIzaSyCUrZ8fPXGj3hwPtuZdrrElaUY6g62UhFs`, (response) => {
    let info = JSON.parse(response).items[0].snippet.channelId;
    showStat(info);
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let nameChannel = document.querySelector('#name-channel').value;
  searchChannel(nameChannel);
})

showStat(idChannel);



