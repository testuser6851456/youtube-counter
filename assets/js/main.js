'use strict';

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

var client = new HttpClient();
var idChannel = 'UCVswRUcKC-M35RzgPRv8qUg';
var part = 'statistics,brandingSettings';
var titleChannel = document.querySelector('#title-channel');
var descChannel = document.querySelector('#description-channel');
var imgChannel = document.querySelector('#img-channel');
var countChannel = document.querySelector('#count');

var form = document.querySelector('#form');

var showStat = function showStat(id) {
  client.get('https://www.googleapis.com/youtube/v3/channels?part=' + part + '&id=' + id + '&key=AIzaSyCUrZ8fPXGj3hwPtuZdrrElaUY6g62UhFs', function (response) {
    var info = JSON.parse(response).items[0];
    console.log(info);
    titleChannel.innerText = info.brandingSettings.channel.title;
    descChannel.innerText = info.brandingSettings.channel.description;
    countChannel.innerText = info.statistics.subscriberCount;
    imgChannel.src = info.brandingSettings.image.bannerImageUrl;
  });
};

var searchChannel = function searchChannel(nameChannel) {
  client.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=' + nameChannel + '&key=AIzaSyCUrZ8fPXGj3hwPtuZdrrElaUY6g62UhFs', function (response) {
    var info = JSON.parse(response).items[0].snippet.channelId;
    showStat(info);
  });
};

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var nameChannel = document.querySelector('#name-channel').value;
  searchChannel(nameChannel);
});

showStat(idChannel);