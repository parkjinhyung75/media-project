var http = require('http');
var fs = require('fs');
var url = require('url');
var request = require("request");
var urlencode = require('urlencode');
var express = require("express");
var app = express();
var key = "RGAPI-c9680d87-ca09-45c1-bb86-13461a06c71b";
var qs = require("querystring");

var url_name = function (nickname, key) {
  return `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${urlencode(nickname)}?api_key=${key}`;
};
var url_matchlist = function (userid, key) {
  return `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${urlencode(userid)}?api_key=${key}`;
};
var url_matchlist_begin = function (userid, index, key) {
  return `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${urlencode(userid)}?beginIndex=${index}&?api_key=${key}`;
}

var champarr = [];
for (var i = 0; i < 900; i++) {
  champarr.push([]);
}

{
  /*
    i = 챔피언 번호
    champarr[i][0] = 챔피언 이름
    champarr[i][1] = 챔피언 이미지 주소
    champarr[i][2] = 잼민 특성값
    champarr[i][3] = 국밥 특성값
    champarr[i][4] = 트렌드 특성값
    champarr[i][5] = 후반 캐리 특성값
    champarr[i][6] =
  */
  champarr[86][0] = "가렌";
  champarr[86][1] = "https://opgg-static.akamaized.net/images/lol/champion/Garen.png?image=q_auto,w_140&v=1588915771";
  champarr[86][2] = 7;
  champarr[86][3] = 7;
  champarr[86][4] = 7;
  champarr[86][5] = 0;
  champarr[86][6] = 0;

  champarr[3][0] = "갈리오";
  champarr[3][1] = "https://opgg-static.akamaized.net/images/lol/champion/Galio.png?image=q_auto,w_140&v=1588915771";
  champarr[3][2] = 2;
  champarr[3][3] = 9;
  champarr[3][4] = 7.5;
  champarr[3][5] = 0;
  champarr[3][6] = 0;

  champarr[41][0] = "갱플랭크";
  champarr[41][1] = "https://opgg-static.akamaized.net/images/lol/champion/Gangplank.png?image=q_auto,w_140&v=1588915771";
  champarr[41][2] = 7;
  champarr[41][3] = 3;
  champarr[41][4] = 6;
  champarr[41][5] = 0;
  champarr[41][6] = 0;

  champarr[79][0] = "그라가스";
  champarr[79][1] = "https://opgg-static.akamaized.net/images/lol/champion/Gragas.png?image=q_auto,w_140&v=1588915771";
  champarr[79][2] = 3;
  champarr[79][3] = 7;
  champarr[79][4] = 2;
  champarr[79][5] = 0;
  champarr[79][6] = 0;

  champarr[104][0] = "그레이브즈";
  champarr[104][1] = "https://opgg-static.akamaized.net/images/lol/champion/Graves.png?image=q_auto,w_140&v=1588915771";
  champarr[104][2] = 10;
  champarr[104][3] = 5;
  champarr[104][4] = 10;
  champarr[104][5] = 0;
  champarr[104][6] = 0;

  champarr[150][0] = "나르";
  champarr[150][1] = "https://opgg-static.akamaized.net/images/lol/champion/Gnar.png?image=q_auto,w_140&v=1588915771";
  champarr[150][2] = 3;
  champarr[150][3] = 7;
  champarr[150][4] = 2;
  champarr[150][5] = 0;
  champarr[150][6] = 0;

  champarr[267][0] = "나미";
  champarr[267][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nami.png?image=q_auto,w_140&v=1588915771";
  champarr[267][2] = 2;
  champarr[267][3] = 8;
  champarr[267][4] = 4;
  champarr[267][5] = 0;
  champarr[267][6] = 0;

  champarr[75][0] = "나서스";
  champarr[75][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nasus.png?image=q_auto,w_140&v=1588915771";
  champarr[75][2] = 9;
  champarr[75][3] = 5;
  champarr[75][4] = 4;
  champarr[75][5] = 0;
  champarr[75][6] = 0;

  champarr[111][0] = "노틸러스";
  champarr[111][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nautilus.png?image=q_auto,w_140&v=1588915771";
  champarr[111][2] = 2;
  champarr[111][3] = 9;
  champarr[111][4] = 8;
  champarr[111][5] = 0;
  champarr[111][6] = 0;

  champarr[56][0] = "녹턴";
  champarr[56][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nocturne.png?image=q_auto,w_140&v=1588915771";
  champarr[56][2] = 5;
  champarr[56][3] = 5;
  champarr[56][4] = 4.9;
  champarr[56][5] = 0;
  champarr[56][6] = 0;

  champarr[20][0] = "누누와 윌럼프";
  champarr[20][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nunu.png?image=q_auto,w_140&v=1588915771";
  champarr[20][2] = 7;
  champarr[20][3] = 2;
  champarr[20][4] = 6;
  champarr[20][5] = 0;
  champarr[20][6] = 0;

  champarr[76][0] = "니달리";
  champarr[76][1] = "https://opgg-static.akamaized.net/images/lol/champion/Nidalee.png?image=q_auto,w_140&v=1588915771";
  champarr[76][2] = 8;
  champarr[76][3] = 3;
  champarr[76][4] = 8;
  champarr[76][5] = 0;
  champarr[76][6] = 0;

  champarr[518][0] = "니코";
  champarr[518][1] = "https://opgg-static.akamaized.net/images/lol/champion/Neeko.png?image=q_auto,w_140&v=1588915771";
  champarr[518][2] = 5;
  champarr[518][3] = 6;
  champarr[518][4] = 4;
  champarr[518][5] = 0;
  champarr[518][6] = 0;

  champarr[122][0] = "다리우스";
  champarr[122][1] = "https://opgg-static.akamaized.net/images/lol/champion/Darius.png?image=q_auto,w_140&v=1588915771";
  champarr[122][2] = 10;
  champarr[122][3] = 5;
  champarr[122][4] = 10;
  champarr[122][5] = 0;
  champarr[122][6] = 0;

  champarr[131][0] = "다이애나";
  champarr[131][1] = "https://opgg-static.akamaized.net/images/lol/champion/Diana.png?image=q_auto,w_140&v=1588915771";
  champarr[131][2] = 5;
  champarr[131][3] = 8;
  champarr[131][4] = 8;
  champarr[131][5] = 0;
  champarr[131][6] = 0;

  champarr[119][0] = "드레이븐";
  champarr[119][1] = "https://opgg-static.akamaized.net/images/lol/champion/Draven.png?image=q_auto,w_140&v=1588915771";
  champarr[119][2] = 9;
  champarr[119][3] = 3;
  champarr[119][4] = 4;
  champarr[119][5] = 0;
  champarr[119][6] = 0;

  champarr[13][0] = "라이즈";
  champarr[13][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ryze.png?image=q_auto,w_140&v=1588915771";
  champarr[13][2] = 3;
  champarr[13][3] = 7;
  champarr[13][4] = 2;
  champarr[13][5] = 0;
  champarr[13][6] = 0;

  champarr[497][0] = "라칸";
  champarr[497][1] = "https://opgg-static.akamaized.net/images/lol/champion/Rakan.png?image=q_auto,w_140&v=1588915771";
  champarr[497][2] = 2;
  champarr[497][3] = 8;
  champarr[497][4] = 4;
  champarr[497][5] = 0;
  champarr[497][6] = 0;

  champarr[33][0] = "람머스";
  champarr[33][1] = "https://opgg-static.akamaized.net/images/lol/champion/Rammus.png?image=q_auto,w_140&v=1588915771";
  champarr[33][2] = 1;
  champarr[33][3] = 9;
  champarr[33][4] = 6;
  champarr[33][5] = 0;
  champarr[33][6] = 0;

  champarr[99][0] = "럭스";
  champarr[99][1] = "https://opgg-static.akamaized.net/images/lol/champion/Lux.png?image=q_auto,w_140&v=1588915771";
  champarr[99][2] = 8;
  champarr[99][3] = 3;
  champarr[99][4] = 2;
  champarr[99][5] = 0;
  champarr[99][6] = 0;

  champarr[68][0] = "럼블";
  champarr[68][1] = "https://opgg-static.akamaized.net/images/lol/champion/Rumble.png?image=q_auto,w_140&v=1588915771";
  champarr[68][2] = 3;
  champarr[68][3] = 5;
  champarr[68][4] = 3;
  champarr[68][5] = 0;
  champarr[68][6] = 0;

  champarr[58][0] = "레넥톤";
  champarr[58][1] = "https://opgg-static.akamaized.net/images/lol/champion/Renekton.png?image=q_auto,w_140&v=1588915771";
  champarr[58][2] = 5;
  champarr[58][3] = 8;
  champarr[58][4] = 9;
  champarr[58][5] = 0;
  champarr[58][6] = 0;

  champarr[89][0] = "레오나";
  champarr[89][1] = "https://opgg-static.akamaized.net/images/lol/champion/Leona.png?image=q_auto,w_140&v=1588915771";
  champarr[89][2] = 3;
  champarr[89][3] = 10;
  champarr[89][4] = 10;
  champarr[89][5] = 0;
  champarr[89][6] = 0;

  champarr[421][0] = "렉사이";
  champarr[421][1] = "https://opgg-static.akamaized.net/images/lol/champion/RekSai.png?image=q_auto,w_140&v=1588915771";
  champarr[421][2] = 3;
  champarr[421][3] = 7;
  champarr[421][4] = 8;
  champarr[421][5] = 0;
  champarr[421][6] = 0;

  champarr[107][0] = "렝가";
  champarr[107][1] = "https://opgg-static.akamaized.net/images/lol/champion/Rengar.png?image=q_auto,w_140&v=1588915771";
  champarr[107][2] = 10;
  champarr[107][3] = 7;
  champarr[107][4] = 4.9;
  champarr[107][5] = 0;
  champarr[107][6] = 0;

  champarr[236][0] = "루시안";
  champarr[236][1] = "https://opgg-static.akamaized.net/images/lol/champion/Lucian.png?image=q_auto,w_140&v=1588915771";
  champarr[236][2] = 8;
  champarr[236][3] = 5;
  champarr[236][4] = 6.4;
  champarr[236][5] = 0;
  champarr[236][6] = 0;

  champarr[117][0] = "룰루";
  champarr[117][1] = "https://opgg-static.akamaized.net/images/lol/champion/Lulu.png?image=q_auto,w_140&v=1588915771";
  champarr[117][2] = 2;
  champarr[117][3] = 9;
  champarr[117][4] = 7.5;
  champarr[117][5] = 0;
  champarr[117][6] = 0;

  champarr[7][0] = "르블랑";
  champarr[7][1] = "https://opgg-static.akamaized.net/images/lol/champion/Leblanc.png?image=q_auto,w_140&v=1588915771";
  champarr[7][2] = 8;
  champarr[7][3] = 4;
  champarr[7][4] = 8;
  champarr[7][5] = 0;
  champarr[7][6] = 0;

  champarr[64][0] = "리신";
  champarr[64][1] = "https://opgg-static.akamaized.net/images/lol/champion/LeeSin.png?image=q_auto,w_140&v=1588915771";
  champarr[64][2] = 10;
  champarr[64][3] = 6;
  champarr[64][4] = 10;
  champarr[64][5] = 0;
  champarr[64][6] = 0;

  champarr[92][0] = "리븐";
  champarr[92][1] = "https://opgg-static.akamaized.net/images/lol/champion/Riven.png?image=q_auto,w_140&v=1588915771";
  champarr[92][2] = 9;
  champarr[92][3] = 7;
  champarr[92][4] = 2;
  champarr[92][5] = 0;
  champarr[92][6] = 0;

  champarr[127][0] = "리산드라";
  champarr[127][1] = "https://opgg-static.akamaized.net/images/lol/champion/Lissandra.png?image=q_auto,w_140&v=1588915771";
  champarr[127][2] = 3;
  champarr[127][3] = 8;
  champarr[127][4] = 4;
  champarr[127][5] = 0;
  champarr[127][6] = 0;

  champarr[11][0] = "마스터 이";
  champarr[11][1] = "https://opgg-static.akamaized.net/images/lol/champion/MasterYi.png?image=q_auto,w_140&v=1588915771";
  champarr[11][2] = 10;
  champarr[11][3] = 1;
  champarr[11][4] = 6;
  champarr[11][5] = 0;
  champarr[11][6] = 0;

  champarr[57][0] = "마오카이";
  champarr[57][1] = "https://opgg-static.akamaized.net/images/lol/champion/Maokai.png?image=q_auto,w_140&v=1588915771";
  champarr[57][2] = 2;
  champarr[57][3] = 10;
  champarr[57][4] = 9;
  champarr[57][5] = 0;
  champarr[57][6] = 0;

  champarr[90][0] = "말자하";
  champarr[90][1] = "https://opgg-static.akamaized.net/images/lol/champion/Malzahar.png?image=q_auto,w_140&v=1588915771";
  champarr[90][2] = 3;
  champarr[90][3] = 9;
  champarr[90][4] = 6;
  champarr[90][5] = 0;
  champarr[90][6] = 0;

  champarr[54][0] = "말파이트";
  champarr[54][1] = "https://opgg-static.akamaized.net/images/lol/champion/Malphite.png?image=q_auto,w_140&v=1588915771";
  champarr[54][2] = 6;
  champarr[54][3] = 8;
  champarr[54][4] = 6.3;
  champarr[54][5] = 0;
  champarr[54][6] = 0;

  champarr[82][0] = "모데카이저";
  champarr[82][1] = "https://opgg-static.akamaized.net/images/lol/champion/Mordekaiser.png?image=q_auto,w_140&v=1588915771";
  champarr[82][2] = 7;
  champarr[82][3] = 8;
  champarr[82][4] = 7.5;
  champarr[82][5] = 0;
  champarr[82][6] = 0;

  champarr[25][0] = "모르가나";
  champarr[25][1] = "https://opgg-static.akamaized.net/images/lol/champion/Morgana.png?image=q_auto,w_140&v=1588915771";
  champarr[25][2] = 2;
  champarr[25][3] = 9;
  champarr[25][4] = 8;
  champarr[25][5] = 0;
  champarr[25][6] = 0;

  champarr[36][0] = "문도 박사";
  champarr[36][1] = "https://opgg-static.akamaized.net/images/lol/champion/DrMundo.png?image=q_auto,w_140&v=1588915771";
  champarr[36][2] = 2;
  champarr[36][3] = 9;
  champarr[36][4] = 2.8;
  champarr[36][5] = 0;
  champarr[36][6] = 0;

  champarr[21][0] = "미스 포츈";
  champarr[21][1] = "https://opgg-static.akamaized.net/images/lol/champion/MissFortune.png?image=q_auto,w_140&v=1588915771";
  champarr[21][2] = 4;
  champarr[21][3] = 7;
  champarr[21][4] = 8;
  champarr[21][5] = 0;
  champarr[21][6] = 0;

  champarr[432][0] = "바드";
  champarr[432][1] = "https://opgg-static.akamaized.net/images/lol/champion/Bard.png?image=q_auto,w_140&v=1588915771";
  champarr[432][2] = 8;
  champarr[432][3] = 8;
  champarr[432][4] = 8;
  champarr[432][5] = 0;
  champarr[432][6] = 0;

  champarr[110][0] = "바루스";
  champarr[110][1] = "https://opgg-static.akamaized.net/images/lol/champion/Varus.png?image=q_auto,w_140&v=1588915771";
  champarr[110][2] = 7;
  champarr[110][3] = 8;
  champarr[110][4] = 10;
  champarr[110][5] = 0;
  champarr[110][6] = 0;

  champarr[254][0] = "바이";
  champarr[254][1] = "https://opgg-static.akamaized.net/images/lol/champion/Vi.png?image=q_auto,w_140&v=1588915771";
  champarr[254][2] = 3;
  champarr[254][3] = 8;
  champarr[254][4] = 2;
  champarr[254][5] = 0;
  champarr[254][6] = 0;

  champarr[45][0] = "베이가";
  champarr[45][1] = "https://opgg-static.akamaized.net/images/lol/champion/Veigar.png?image=q_auto,w_140&v=1588915771";
  champarr[45][2] = 4;
  champarr[45][3] = 7;
  champarr[45][4] = 2;
  champarr[45][5] = 0;
  champarr[45][6] = 0;

  champarr[67][0] = "베인";
  champarr[67][1] = "https://opgg-static.akamaized.net/images/lol/champion/Vayne.png?image=q_auto,w_140&v=1588915771";
  champarr[67][2] = 10;
  champarr[67][3] = 3;
  champarr[67][4] = 7.6;
  champarr[67][5] = 0;
  champarr[67][6] = 0;

  champarr[161][0] = "벨코즈";
  champarr[161][1] = "https://opgg-static.akamaized.net/images/lol/champion/Velkoz.png?image=q_auto,w_140&v=1588915771";
  champarr[161][2] = 8;
  champarr[161][3] = 2;
  champarr[161][4] = 2;
  champarr[161][5] = 0;
  champarr[161][6] = 0;

  champarr[106][0] = "볼리베어";
  champarr[106][1] = "https://opgg-static.akamaized.net/images/lol/champion/Volibear.png?image=q_auto,w_140&v=1588915771";
  champarr[106][2] = 4;
  champarr[106][3] = 7;
  champarr[106][4] = 2;
  champarr[106][5] = 0;
  champarr[106][6] = 0;

  champarr[201][0] = "브라움";
  champarr[201][1] = "https://opgg-static.akamaized.net/images/lol/champion/Braum.png?image=q_auto,w_140&v=1588915771";
  champarr[201][2] = 1;
  champarr[201][3] = 9;
  champarr[201][4] = 4;
  champarr[201][5] = 0;
  champarr[201][6] = 0;

  champarr[63][0] = "브랜드";
  champarr[63][1] = "https://opgg-static.akamaized.net/images/lol/champion/Brand.png?image=q_auto,w_140&v=1588915771";
  champarr[63][2] = 8;
  champarr[63][3] = 2;
  champarr[63][4] = 2;
  champarr[63][5] = 0;
  champarr[63][6] = 0;

  champarr[8][0] = "블라디미르";
  champarr[8][1] = "https://opgg-static.akamaized.net/images/lol/champion/Vladimir.png?image=q_auto,w_140&v=1588915771";
  champarr[8][2] = 6;
  champarr[8][3] = 7;
  champarr[8][4] = 8;
  champarr[8][5] = 0;
  champarr[8][6] = 0;

  champarr[53][0] = "블리츠크랭크";
  champarr[53][1] = "https://opgg-static.akamaized.net/images/lol/champion/Blitzcrank.png?image=q_auto,w_140&v=1588915771";
  champarr[53][2] = 9;
  champarr[53][3] = 6;
  champarr[53][4] = 10;
  champarr[53][5] = 0;
  champarr[53][6] = 0;

  champarr[112][0] = "빅토르";
  champarr[112][1] = "https://opgg-static.akamaized.net/images/lol/champion/Viktor.png?image=q_auto,w_140&v=1588915771";
  champarr[112][2] = 2;
  champarr[112][3] = 8;
  champarr[112][4] = 2;
  champarr[112][5] = 0;
  champarr[112][6] = 0;

  champarr[78][0] = "뽀삐";
  champarr[78][1] = "https://opgg-static.akamaized.net/images/lol/champion/Poppy.png?image=q_auto,w_140&v=1588915771";
  champarr[78][2] = 3;
  champarr[78][3] = 7;
  champarr[78][4] = 6.4;
  champarr[78][5] = 0;
  champarr[78][6] = 0;

  champarr[14][0] = "사이온";
  champarr[14][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sion.png?image=q_auto,w_140&v=1588915771";
  champarr[14][2] = 1;
  champarr[14][3] = 9;
  champarr[14][4] = 2;
  champarr[14][5] = 0;
  champarr[14][6] = 0;

  champarr[517][0] = "사일러스";
  champarr[517][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sylas.png?image=q_auto,w_140&v=1588915771";
  champarr[517][2] = 8;
  champarr[517][3] = 4;
  champarr[517][4] = 6.8;
  champarr[517][5] = 0;
  champarr[517][6] = 0;

  champarr[35][0] = "샤코";
  champarr[35][1] = "https://opgg-static.akamaized.net/images/lol/champion/Shaco.png?image=q_auto,w_140&v=1588915771";
  champarr[35][2] = 10;
  champarr[35][3] = 3;
  champarr[35][4] = 6;
  champarr[35][5] = 0;
  champarr[35][6] = 0;

  champarr[235][0] = "세나";
  champarr[235][1] = "https://opgg-static.akamaized.net/images/lol/champion/Senna.png?image=q_auto,w_140&v=1588915771";
  champarr[235][2] = 8;
  champarr[235][3] = 3;
  champarr[235][4] = 8;
  champarr[235][5] = 0;
  champarr[235][6] = 0;

  champarr[113][0] = "세주아니";
  champarr[113][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sejuani.png?image=q_auto,w_140&v=1588915771";
  champarr[113][2] = 2;
  champarr[113][3] = 10;
  champarr[113][4] = 2;
  champarr[113][5] = 0;
  champarr[113][6] = 0;

  champarr[875][0] = "세트";
  champarr[875][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sett.png?image=q_auto,w_140&v=1588915771";
  champarr[875][2] = 10;
  champarr[875][3] = 8;
  champarr[875][4] = 6.4;
  champarr[875][5] = 0;
  champarr[875][6] = 0;

  champarr[37][0] = "소나";
  champarr[37][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sona.png?image=q_auto,w_140&v=1588915771";
  champarr[37][2] = 3;
  champarr[37][3] = 9;
  champarr[37][4] = 2;
  champarr[37][5] = 0;
  champarr[37][6] = 0;

  champarr[16][0] = "소라카";
  champarr[16][1] = "https://opgg-static.akamaized.net/images/lol/champion/Soraka.png?image=q_auto,w_140&v=1588915771";
  champarr[16][2] = 2;
  champarr[16][3] = 8;
  champarr[16][4] = 6;
  champarr[16][5] = 0;
  champarr[16][6] = 0;

  champarr[98][0] = "쉔";
  champarr[98][1] = "https://opgg-static.akamaized.net/images/lol/champion/Shen.png?image=q_auto,w_140&v=1588915771";
  champarr[98][2] = 2;
  champarr[98][3] = 7;
  champarr[98][4] = 5.2;
  champarr[98][5] = 0;
  champarr[98][6] = 0;

  champarr[102][0] = "쉬바나";
  champarr[102][1] = "https://opgg-static.akamaized.net/images/lol/champion/Shyvana.png?image=q_auto,w_140&v=1588915771";
  champarr[102][2] = 6;
  champarr[102][3] = 8;
  champarr[102][4] = 7.4;
  champarr[102][5] = 0;
  champarr[102][6] = 0;

  champarr[50][0] = "스웨인";
  champarr[50][1] = "https://opgg-static.akamaized.net/images/lol/champion/Swain.png?image=q_auto,w_140&v=1588915771";
  champarr[50][2] = 3;
  champarr[50][3] = 9;
  champarr[50][4] = 2;
  champarr[50][5] = 0;
  champarr[50][6] = 0;

  champarr[72][0] = "스카너";
  champarr[72][1] = "https://opgg-static.akamaized.net/images/lol/champion/Skarner.png?image=q_auto,e_grayscale/w_82&v=1";
  champarr[72][2] = 1;
  champarr[72][3] = 4;
  champarr[72][4] = 1;
  champarr[72][5] = 0;
  champarr[72][6] = 0;

  champarr[15][0] = "시비르";
  champarr[15][1] = "https://opgg-static.akamaized.net/images/lol/champion/Sivir.png?image=q_auto,w_140&v=1588915771";
  champarr[15][2] = 3;
  champarr[15][3] = 6;
  champarr[15][4] = 4;
  champarr[15][5] = 0;
  champarr[15][6] = 0;

  champarr[5][0] = "신 짜오";
  champarr[5][1] = "https://opgg-static.akamaized.net/images/lol/champion/XinZhao.png?image=q_auto,w_140&v=1588915771";
  champarr[5][2] = 10;
  champarr[5][3] = 5;
  champarr[5][4] = 6;
  champarr[5][5] = 0;
  champarr[5][6] = 0;

  champarr[134][0] = "신드라";
  champarr[134][1] = "https://opgg-static.akamaized.net/images/lol/champion/Syndra.png?image=q_auto,w_140&v=1588915771";
  champarr[134][2] = 7;
  champarr[134][3] = 7;
  champarr[134][4] = 5.6;
  champarr[134][5] = 0;
  champarr[134][6] = 0;

  champarr[27][0] = "신지드";
  champarr[27][1] = "https://opgg-static.akamaized.net/images/lol/champion/Singed.png?image=q_auto,w_140&v=1588915771";
  champarr[27][2] = 2;
  champarr[27][3] = 2;
  champarr[27][4] = 4;
  champarr[27][5] = 0;
  champarr[27][6] = 0;

  champarr[412][0] = "쓰레쉬";
  champarr[412][1] = "https://opgg-static.akamaized.net/images/lol/champion/Thresh.png?image=q_auto,w_140&v=1588915771";
  champarr[412][2] = 7;
  champarr[412][3] = 6;
  champarr[412][4] = 8;
  champarr[412][5] = 0;
  champarr[412][6] = 0;

  champarr[103][0] = "아리";
  champarr[103][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ahri.png?image=q_auto,w_140&v=1588915771";
  champarr[103][2] = 5;
  champarr[103][3] = 5;
  champarr[103][4] = 6;
  champarr[103][5] = 0;
  champarr[103][6] = 0;

  champarr[32][0] = "아무무";
  champarr[32][1] = "https://opgg-static.akamaized.net/images/lol/champion/Amumu.png?image=q_auto,w_140&v=1588915771";
  champarr[32][2] = 1;
  champarr[32][3] = 7;
  champarr[32][4] = 2;
  champarr[32][5] = 0;
  champarr[32][6] = 0;

  champarr[136][0] = "아우렐리온 솔";
  champarr[136][1] = "https://opgg-static.akamaized.net/images/lol/champion/AurelionSol.png?image=q_auto,w_140&v=1588915771";
  champarr[136][2] = 5;
  champarr[136][3] = 8;
  champarr[136][4] = 6;
  champarr[136][5] = 0;
  champarr[136][6] = 0;

  champarr[427][0] = "아이번";
  champarr[427][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ivern.png?image=q_auto,w_140&v=1588915771";
  champarr[427][2] = 1;
  champarr[427][3] = 2;
  champarr[427][4] = 4;
  champarr[427][5] = 0;
  champarr[427][6] = 0;

  champarr[268][0] = "아지르";
  champarr[268][1] = "https://opgg-static.akamaized.net/images/lol/champion/Azir.png?image=q_auto,w_140&v=1588915771";
  champarr[268][2] = 1;
  champarr[268][3] = 6;
  champarr[268][4] = 2;
  champarr[268][5] = 0;
  champarr[268][6] = 0;

  champarr[120][0] = "헤카림";
  champarr[120][1] = "https://opgg-static.akamaized.net/images/lol/champion/Hecarim.png?image=q_auto,w_140&v=1588915771";
  champarr[120][2] = 7;
  champarr[120][3] = 8;
  champarr[120][4] = 4;
  champarr[120][5] = 0;
  champarr[120][5] = 0;

  champarr[74][0] = "하이머딩거";
  champarr[74][1] = "https://opgg-static.akamaized.net/images/lol/champion/Heimerdinger.png?image=q_auto,w_140&v=1588915771";
  champarr[74][2] = 6;
  champarr[74][3] = 3;
  champarr[74][4] = 6;
  champarr[74][5] = 0;
  champarr[74][5] = 0;

  champarr[105][0] = "피즈";
  champarr[105][1] = "https://opgg-static.akamaized.net/images/lol/champion/Fizz.png?image=q_auto,w_140&v=1588915771";
  champarr[105][2] = 8;
  champarr[105][3] = 7;
  champarr[105][4] = 8;
  champarr[105][5] = 0;
  champarr[105][6] = 0;

  champarr[114][0] = "피오라";
  champarr[114][1] = "https://opgg-static.akamaized.net/images/lol/champion/Fiora.png?image=q_auto,w_140&v=1588915771";
  champarr[114][2] = 9;
  champarr[114][3] = 3;
  champarr[114][4] = 10;
  champarr[114][5] = 0;
  champarr[114][6] = 0;

  champarr[9][0] = "피들스틱";
  champarr[9][1] = "https://opgg-static.akamaized.net/images/lol/champion/Fiddlesticks.png?image=q_auto,w_140&v=1588915771";
  champarr[9][2] = 5;
  champarr[9][3] = 6;
  champarr[9][4] = 7.3;
  champarr[9][5] = 0;
  champarr[9][6] = 0;

  champarr[80][0] = "판테온";
  champarr[80][1] = "https://opgg-static.akamaized.net/images/lol/champion/Pantheon.png?image=q_auto,w_140&v=1588915771";
  champarr[80][2] = 9;
  champarr[80][3] = 7;
  champarr[80][4] = 6.3;
  champarr[80][5] = 0;
  champarr[80][6] = 0;

  champarr[555][0] = "파이크";
  champarr[555][1] = "https://opgg-static.akamaized.net/images/lol/champion/Pyke.png?image=q_auto,w_140&v=1588915771";
  champarr[555][2] = 9;
  champarr[555][3] = 2;
  champarr[555][4] = 7.8;
  champarr[555][5] = 0;
  champarr[555][6] = 0;

  champarr[17][0] = "티모";
  champarr[17][1] = "https://opgg-static.akamaized.net/images/lol/champion/Teemo.png?image=q_auto,w_140&v=1588915771";
  champarr[17][2] = 10;
  champarr[17][3] = 1;
  champarr[17][4] = 8;
  champarr[17][5] = 0;
  champarr[17][6] = 0;

  champarr[29][0] = "트위치";
  champarr[29][1] = "https://opgg-static.akamaized.net/images/lol/champion/Twitch.png?image=q_auto,w_140&v=1588915771";
  champarr[29][2] = 7;
  champarr[29][3] = 8;
  champarr[29][4] = 2;
  champarr[29][5] = 0;
  champarr[29][6] = 0;

  champarr[4][0] = "트위스티드페이트";
  champarr[4][1] = "https://opgg-static.akamaized.net/images/lol/champion/TwistedFate.png?image=q_auto,w_140&v=1588915771";
  champarr[4][2] = 5;
  champarr[4][3] = 8;
  champarr[4][4] = 10;
  champarr[4][5] = 0;
  champarr[4][6] = 0;

  champarr[23][0] = "트린다미어";
  champarr[23][1] = "https://opgg-static.akamaized.net/images/lol/champion/Tryndamere.png?image=q_auto,w_140&v=1588915771";
  champarr[23][2] = 9.5;
  champarr[23][3] = 2;
  champarr[23][4] = 4;
  champarr[23][5] = 0;
  champarr[23][6] = 0;

  champarr[18][0] = "트리스타나";
  champarr[18][1] = "https://opgg-static.akamaized.net/images/lol/champion/Tristana.png?image=q_auto,w_140&v=1588915771";
  champarr[18][2] = 4;
  champarr[18][3] = 5;
  champarr[18][4] = 2;
  champarr[18][5] = 0;
  champarr[18][6] = 0;

  champarr[48][0] = "트런들";
  champarr[48][1] = "https://opgg-static.akamaized.net/images/lol/champion/Trundle.png?image=q_auto,w_140&v=1588915771";
  champarr[48][2] = 3;
  champarr[48][3] = 10;
  champarr[48][4] = 8;
  champarr[48][5] = 0;
  champarr[48][6] = 0;

  champarr[223][0] = "탐 켄치";
  champarr[223][1] = "https://opgg-static.akamaized.net/images/lol/champion/TahmKench.png?image=q_auto,w_140&v=1588915771";
  champarr[223][2] = 2;
  champarr[223][3] = 8;
  champarr[223][4] = 2;
  champarr[223][5] = 0;
  champarr[223][6] = 0;

  champarr[163][0] = "탈리야";
  champarr[163][1] = "https://opgg-static.akamaized.net/images/lol/champion/Taliyah.png?image=q_auto,w_140&v=1588915771";
  champarr[163][2] = 2;
  champarr[163][3] = 8;
  champarr[163][4] = 2;
  champarr[163][5] = 0;
  champarr[163][6] = 0;

  champarr[91][0] = "탈론";
  champarr[91][1] = "https://opgg-static.akamaized.net/images/lol/champion/Talon.png?image=q_auto,w_140&v=1588915771";
  champarr[91][2] = 9;
  champarr[91][3] = 6;
  champarr[91][4] = 10;
  champarr[91][5] = 0;
  champarr[91][6] = 0;

  champarr[44][0] = "타릭";
  champarr[44][1] = "https://opgg-static.akamaized.net/images/lol/champion/Taric.png?image=q_auto,w_140&v=1588915771";
  champarr[44][2] = 2;
  champarr[44][3] = 10;
  champarr[44][4] = 8;
  champarr[44][5] = 0;
  champarr[44][6] = 0;

  champarr[203][0] = "킨드레드";
  champarr[203][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kindred.png?image=q_auto,w_140&v=1588915771";
  champarr[203][2] = 9;
  champarr[203][3] = 2;
  champarr[203][4] = 6;
  champarr[203][5] = 0;
  champarr[203][6] = 0;

  champarr[246][0] = "키아나";
  champarr[246][1] = "https://opgg-static.akamaized.net/images/lol/champion/Qiyana.png?image=q_auto,w_140&v=1588915771";
  champarr[246][2] = 8;
  champarr[246][3] = 5;
  champarr[246][4] = 6;
  champarr[246][5] = 0;
  champarr[246][6] = 0;

  champarr[240][0] = "클레드";
  champarr[240][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kled.png?image=q_auto,w_140&v=1588915771";
  champarr[240][2] = 8;
  champarr[240][3] = 8;
  champarr[240][4] = 5;
  champarr[240][5] = 0;
  champarr[240][6] = 0;

  champarr[133][0] = "퀸";
  champarr[133][1] = "https://opgg-static.akamaized.net/images/lol/champion/Quinn.png?image=q_auto,w_140&v=1588915771";
  champarr[133][2] = 8;
  champarr[133][3] = 7;
  champarr[133][4] = 8;
  champarr[133][5] = 0;
  champarr[133][6] = 0;

  champarr[42][0] = "코르키";
  champarr[42][1] = "https://opgg-static.akamaized.net/images/lol/champion/Corki.png?image=q_auto,w_140&v=1588915771";
  champarr[42][2] = 3;
  champarr[42][3] = 5;
  champarr[42][4] = 4;
  champarr[42][5] = 0;
  champarr[42][6] = 0;

  champarr[96][0] = "코그모";
  champarr[96][1] = "https://opgg-static.akamaized.net/images/lol/champion/KogMaw.png?image=q_auto,w_140&v=1588915771";
  champarr[96][2] = 3;
  champarr[96][3] = 2;
  champarr[96][4] = 4;
  champarr[96][5] = 0;
  champarr[96][6] = 0;

  champarr[10][0] = "케일";
  champarr[10][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kayle.png?image=q_auto,w_140&v=1588915771";
  champarr[10][2] = 7;
  champarr[10][3] = 2;
  champarr[10][4] = 2;
  champarr[10][5] = 0;
  champarr[10][6] = 0;

  champarr[141][0] = "케인";
  champarr[141][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kayn.png?image=q_auto,w_140&v=1588915771";
  champarr[141][2] = 10;
  champarr[141][3] = 3;
  champarr[141][4] = 7.2;
  champarr[141][5] = 0;
  champarr[141][6] = 0;

  champarr[51][0] = "케이틀린";
  champarr[51][1] = "https://opgg-static.akamaized.net/images/lol/champion/Caitlyn.png?image=q_auto,w_140&v=1588915771";
  champarr[51][2] = 6;
  champarr[51][3] = 6;
  champarr[51][4] = 8;
  champarr[51][5] = 0;
  champarr[51][6] = 0;

  champarr[85][0] = "케넨";
  champarr[85][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kennen.png?image=q_auto,w_140&v=1588915771";
  champarr[85][2] = 2;
  champarr[85][3] = 9;
  champarr[85][4] = 4;
  champarr[85][5] = 0;
  champarr[85][6] = 0;

  champarr[429][0] = "칼리스타";
  champarr[429][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kalista.png?image=q_auto,w_140&v=1588915771";
  champarr[429][2] = 7;
  champarr[429][3] = 4;
  champarr[429][4] = 7.4;
  champarr[429][5] = 0;
  champarr[429][6] = 0;

  champarr[55][0] = "카타리나";
  champarr[55][1] = "https://opgg-static.akamaized.net/images/lol/champion/Katarina.png?image=q_auto,w_140&v=1588915771";
  champarr[55][2] = 9;
  champarr[55][3] = 7;
  champarr[55][4] = 8;
  champarr[55][5] = 0;
  champarr[55][6] = 0;

  champarr[121][0] = "카직스";
  champarr[121][1] = "https://opgg-static.akamaized.net/images/lol/champion/Khazix.png?image=q_auto,w_140&v=1588915771";
  champarr[121][2] = 9;
  champarr[121][3] = 3;
  champarr[121][4] = 4;
  champarr[121][5] = 0;
  champarr[121][6] = 0;

  champarr[145][0] = "카이사";
  champarr[145][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kaisa.png?image=q_auto,w_140&v=1588915771";
  champarr[145][2] = 8;
  champarr[145][3] = 2;
  champarr[145][4] = 6;
  champarr[145][5] = 0;
  champarr[145][6] = 0;

  champarr[69][0] = "카시오페아";
  champarr[69][1] = "https://opgg-static.akamaized.net/images/lol/champion/Cassiopeia.png?image=q_auto,w_140&v=1588915771";
  champarr[69][2] = 5;
  champarr[69][3] = 9;
  champarr[69][4] = 8.25;
  champarr[69][5] = 0;
  champarr[69][6] = 0;

  champarr[30][0] = "카서스";
  champarr[30][1] = "https://opgg-static.akamaized.net/images/lol/champion/Karthus.png?image=q_auto,w_140&v=1588915771";
  champarr[30][2] = 6;
  champarr[30][3] = 5;
  champarr[30][4] = 8;
  champarr[30][5] = 0;
  champarr[30][6] = 0;

  champarr[38][0] = "카사딘";
  champarr[38][1] = "https://opgg-static.akamaized.net/images/lol/champion/Kassadin.png?image=q_auto,w_140&v=1588915771";
  champarr[38][2] = 9;
  champarr[38][3] = 7;
  champarr[38][4] = 10;
  champarr[38][5] = 0;
  champarr[38][6] = 0;

  champarr[164][0] = "카밀";
  champarr[164][1] = "https://opgg-static.akamaized.net/images/lol/champion/Camille.png?image=q_auto,w_140&v=1588915771";
  champarr[164][2] = 8;
  champarr[164][3] = 6;
  champarr[164][4] = 5;
  champarr[164][5] = 0;
  champarr[164][6] = 0;

  champarr[43][0] = "카르마";
  champarr[43][1] = "https://opgg-static.akamaized.net/images/lol/champion/Karma.png?image=q_auto,w_140&v=1588915771";
  champarr[43][2] = 3;
  champarr[43][3] = 8;
  champarr[43][4] = 6;
  champarr[43][5] = 0;
  champarr[43][6] = 0;

  champarr[31][0] = "초가스";
  champarr[31][1] = "https://opgg-static.akamaized.net/images/lol/champion/Chogath.png?image=q_auto,w_140&v=1588915771";
  champarr[31][2] = 1;
  champarr[31][3] = 8;
  champarr[31][4] = 2;
  champarr[31][5] = 0;
  champarr[31][6] = 0;

  champarr[222][0] = "징크스";
  champarr[222][1] = "https://opgg-static.akamaized.net/images/lol/champion/Jinx.png?image=q_auto,w_140&v=1588915771";
  champarr[222][2] = 5;
  champarr[222][3] = 2;
  champarr[222][4] = 4;
  champarr[222][5] = 0;
  champarr[222][6] = 0;

  champarr[26][0] = "질리언";
  champarr[26][1] = "https://opgg-static.akamaized.net/images/lol/champion/Zilean.png?image=q_auto,w_140&v=1588915771";
  champarr[26][2] = 3;
  champarr[26][3] = 10;
  champarr[26][4] = 7.7;
  champarr[26][5] = 0;
  champarr[26][6] = 0;

  champarr[202][0] = "진";
  champarr[202][1] = "https://opgg-static.akamaized.net/images/lol/champion/Jhin.png?image=q_auto,w_140&v=1588915771";
  champarr[202][2] = 7;
  champarr[202][3] = 2;
  champarr[202][4] = 4;
  champarr[202][5] = 0;
  champarr[202][6] = 0;

  champarr[115][0] = "직스";
  champarr[115][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ziggs.png?image=q_auto,w_140&v=1588915771";
  champarr[115][2] = 6;
  champarr[115][3] = 8;
  champarr[115][4] = 2;
  champarr[115][5] = 0;
  champarr[115][6] = 0;

  champarr[142][0] = "조이";
  champarr[142][1] = "https://opgg-static.akamaized.net/images/lol/champion/Zoe.png?image=q_auto,w_140&v=1588915771";
  champarr[142][2] = 8;
  champarr[142][3] = 5;
  champarr[142][4] = 8;
  champarr[142][5] = 0;
  champarr[142][6] = 0;

  champarr[126][0] = "제이스";
  champarr[126][1] = "https://opgg-static.akamaized.net/images/lol/champion/Jayce.png?image=q_auto,w_140&v=1588915771";
  champarr[126][2] = 9;
  champarr[126][3] = 3;
  champarr[126][4] = 5;
  champarr[126][5] = 0;
  champarr[126][6] = 0;

  champarr[101][0] = "제라스";
  champarr[101][1] = "https://opgg-static.akamaized.net/images/lol/champion/Xerath.png?image=q_auto,w_140&v=1588915771";
  champarr[101][2] = 7;
  champarr[101][3] = 3;
  champarr[101][4] = 3.4;
  champarr[101][5] = 0;
  champarr[101][6] = 0;

  champarr[238][0] = "제드";
  champarr[238][1] = "https://opgg-static.akamaized.net/images/lol/champion/Zed.png?image=q_auto,w_140&v=1588915771";
  champarr[238][2] = 10;
  champarr[238][3] = 3;
  champarr[238][4] = 8;
  champarr[238][5] = 0;
  champarr[238][6] = 0;

  champarr[24][0] = "잭스";
  champarr[24][1] = "https://opgg-static.akamaized.net/images/lol/champion/Jax.png?image=q_auto,w_140&v=1588915771";
  champarr[24][2] = 9;
  champarr[24][3] = 7;
  champarr[24][4] = 6.4;
  champarr[24][5] = 0;
  champarr[24][6] = 0;

  champarr[40][0] = "잔나";
  champarr[40][1] = "https://opgg-static.akamaized.net/images/lol/champion/Janna.png?image=q_auto,w_140&v=1588915771";
  champarr[40][2] = 2;
  champarr[40][3] = 8;
  champarr[40][4] = 6;
  champarr[40][5] = 0;
  champarr[40][6] = 0;

  champarr[154][0] = "자크";
  champarr[154][1] = "https://opgg-static.akamaized.net/images/lol/champion/Zac.png?image=q_auto,w_140&v=1588915771";
  champarr[154][2] = 2;
  champarr[154][3] = 10;
  champarr[154][4] = 8.4;
  champarr[154][5] = 0;
  champarr[154][6] = 0;

  champarr[143][0] = "자이라";
  champarr[143][1] = "https://opgg-static.akamaized.net/images/lol/champion/Zyra.png?image=q_auto,w_140&v=1588915771";
  champarr[143][2] = 3;
  champarr[143][3] = 4;
  champarr[143][4] = 4;
  champarr[143][5] = 0;
  champarr[143][6] = 0;

  champarr[498][0] = "자야";
  champarr[498][1] = "https://opgg-static.akamaized.net/images/lol/champion/Xayah.png?image=q_auto,w_140&v=1588915771";
  champarr[498][2] = 3;
  champarr[498][3] = 6;
  champarr[498][4] = 2;
  champarr[498][5] = 0;
  champarr[498][6] = 0;

  champarr[59][0] = "자르반 4세";
  champarr[59][1] = "https://opgg-static.akamaized.net/images/lol/champion/JarvanIV.png?image=q_auto,w_140&v=1588915771";
  champarr[59][2] = 3;
  champarr[59][3] = 8;
  champarr[59][4] = 6;
  champarr[59][5] = 0;
  champarr[59][6] = 0;

  champarr[420][0] = "일라오이";
  champarr[420][1] = "https://opgg-static.akamaized.net/images/lol/champion/Illaoi.png?image=q_auto,w_140&v=1588915771";
  champarr[420][2] = 8;
  champarr[420][3] = 7;
  champarr[420][4] = 6;
  champarr[420][5] = 0;
  champarr[420][6] = 0;

  champarr[81][0] = "이즈리얼";
  champarr[81][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ezreal.png?image=q_auto,w_140&v=1588915771";
  champarr[81][2] = 9;
  champarr[81][3] = 6;
  champarr[81][4] = 10;
  champarr[81][5] = 0;
  champarr[81][6] = 0;

  champarr[28][0] = "이블린";
  champarr[28][1] = "https://opgg-static.akamaized.net/images/lol/champion/Evelynn.png?image=q_auto,w_140&v=1588915771";
  champarr[28][2] = 9;
  champarr[28][3] = 4;
  champarr[28][4] = 8;
  champarr[28][5] = 0;
  champarr[28][6] = 0;

  champarr[39][0] = "이렐리아";
  champarr[39][1] = "https://opgg-static.akamaized.net/images/lol/champion/Irelia.png?image=q_auto,w_140&v=1588915771";
  champarr[39][2] = 10;
  champarr[39][3] = 1;
  champarr[39][4] = 6;
  champarr[39][5] = 0;
  champarr[39][6] = 0;

  champarr[350][0] = "유미";
  champarr[350][1] = "https://opgg-static.akamaized.net/images/lol/champion/Yuumi.png?image=q_auto,w_140&v=1588915771";
  champarr[350][2] = 3;
  champarr[350][3] = 8;
  champarr[350][4] = 10;
  champarr[350][5] = 0;
  champarr[350][6] = 0;

  champarr[19][0] = "워윅";
  champarr[19][1] = "https://opgg-static.akamaized.net/images/lol/champion/Warwick.png?image=q_auto,w_140&v=1588915771";
  champarr[19][2] = 4;
  champarr[19][3] = 6;
  champarr[19][4] = 4;
  champarr[19][5] = 0;
  champarr[19][6] = 0;

  champarr[6][0] = "우르곳";
  champarr[6][1] = "https://opgg-static.akamaized.net/images/lol/champion/Urgot.png?image=q_auto,w_140&v=1588915771";
  champarr[6][2] = 2;
  champarr[6][3] = 6;
  champarr[6][4] = 4;
  champarr[6][5] = 0;
  champarr[6][6] = 0;

  champarr[77][0] = "우디르";
  champarr[77][1] = "https://opgg-static.akamaized.net/images/lol/champion/Udyr.png?image=q_auto,w_140&v=1588915771";
  champarr[77][2] = 3;
  champarr[77][3] = 3;
  champarr[77][4] = 2;
  champarr[77][5] = 0;
  champarr[77][6] = 0;

  champarr[83][0] = "요릭";
  champarr[83][1] = "https://opgg-static.akamaized.net/images/lol/champion/Yorick.png?image=q_auto,w_140&v=1588915771";
  champarr[83][2] = 3;
  champarr[83][3] = 8;
  champarr[83][4] = 4;
  champarr[83][5] = 0;
  champarr[83][6] = 0;

  champarr[2][0] = "올라프";
  champarr[2][1] = "https://opgg-static.akamaized.net/images/lol/champion/Olaf.png?image=q_auto,w_140&v=1588915771";
  champarr[2][2] = 8;
  champarr[2][3] = 5;
  champarr[2][4] = 7.6;
  champarr[2][5] = 0;
  champarr[2][6] = 0;

  champarr[61][0] = "오리아나";
  champarr[61][1] = "https://opgg-static.akamaized.net/images/lol/champion/Orianna.png?image=q_auto,w_140&v=1588915771";
  champarr[61][2] = 2;
  champarr[61][3] = 3;
  champarr[61][4] = 8;
  champarr[61][5] = 0;
  champarr[61][6] = 0;

  champarr[516][0] = "오른";
  champarr[516][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ornn.png?image=q_auto,w_140&v=1588915771";
  champarr[516][2] = 3;
  champarr[516][3] = 10;
  champarr[516][4] = 6;
  champarr[516][5] = 0;
  champarr[516][6] = 0;

  champarr[62][0] = "오공";
  champarr[62][1] = "https://opgg-static.akamaized.net/images/lol/champion/MonkeyKing.png?image=q_auto,w_140&v=1588915771";
  champarr[62][2] = 6;
  champarr[62][3] = 9;
  champarr[62][4] = 6.3;
  champarr[62][5] = 0;
  champarr[62][6] = 0;

  champarr[60][0] = "엘리스";
  champarr[60][1] = "https://opgg-static.akamaized.net/images/lol/champion/Elise.png?image=q_auto,w_140&v=1588915771";
  champarr[60][2] = 3;
  champarr[60][3] = 9;
  champarr[60][4] = 10;
  champarr[60][5] = 0;
  champarr[60][6] = 0;

  champarr[245][0] = "에코";
  champarr[245][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ekko.png?image=q_auto,w_140&v=1588915771";
  champarr[245][2] = 8;
  champarr[245][3] = 8;
  champarr[245][4] = 8;
  champarr[245][5] = 0;
  champarr[245][6] = 0;

  champarr[157][0] = "야스오";
  champarr[157][1] = "https://opgg-static.akamaized.net/images/lol/champion/Yasuo.png?image=q_auto,w_140&v=1588915771";
  champarr[157][2] = 10;
  champarr[157][3] = 1;
  champarr[157][4] = 8.6;
  champarr[157][5] = 0;
  champarr[157][6] = 0;

  champarr[22][0] = "애쉬";
  champarr[22][1] = "https://opgg-static.akamaized.net/images/lol/champion/Ashe.png?image=q_auto,w_140&v=1588915771";
  champarr[22][2] = 4;
  champarr[22][3] = 6;
  champarr[22][4] = 6;
  champarr[22][5] = 0;
  champarr[22][6] = 0;

  champarr[34][0] = "애니비아";
  champarr[34][1] = "https://opgg-static.akamaized.net/images/lol/champion/Anivia.png?image=q_auto,w_140&v=1588915771";
  champarr[34][2] = 2;
  champarr[34][3] = 7;
  champarr[34][4] = 6;
  champarr[34][5] = 0;
  champarr[34][6] = 0;

  champarr[1][0] = "애니";
  champarr[1][1] = "https://opgg-static.akamaized.net/images/lol/champion/Annie.png?image=q_auto,w_140&v=1588915771";
  champarr[1][2] = 2;
  champarr[1][3] = 8;
  champarr[1][4] = 4;
  champarr[1][5] = 0;
  champarr[1][6] = 0;

  champarr[12][0] = "알리스타";
  champarr[12][1] = "https://opgg-static.akamaized.net/images/lol/champion/Alistar.png?image=q_auto,w_140&v=1588915771";
  champarr[12][2] = 2;
  champarr[12][3] = 9;
  champarr[12][4] = 6;
  champarr[12][5] = 0;
  champarr[12][6] = 0;

  champarr[523][0] = "아펠리오스";
  champarr[523][1] = "https://opgg-static.akamaized.net/images/lol/champion/Aphelios.png?image=q_auto,w_140&v=1588915771";
  champarr[523][2] = 6;
  champarr[523][3] = 7;
  champarr[523][4] = 8;
  champarr[523][5] = 0;
  champarr[523][6] = 0;

  champarr[266][0] = "아트록스";
  champarr[266][1] = "https://opgg-static.akamaized.net/images/lol/champion/Aatrox.png?image=q_auto,w_140&v=1588915771";
  champarr[266][2] = 9;
  champarr[266][3] = 8;
  champarr[266][4] = 8.5;
  champarr[266][5] = 0;
  champarr[266][6] = 0;

  champarr[84][0] = "아칼리";
  champarr[84][1] = "https://opgg-static.akamaized.net/images/lol/champion/Akali.png?image=q_auto,w_140&v=1588915771";
  champarr[84][2] = 10;
  champarr[84][3] = 2;
  champarr[84][4] = 3;
  champarr[84][5] = 0;
  champarr[84][6] = 0;
}

let show_champion_list = "";
function mlist(arr) {
  for (var i = 0; i < arr.length; i++) {
    show_champion_list = show_champion_list + "<h2>Champion : " + champarr[arr[i][0]][0] + "/ 횟수 : " + arr[i][1] + "</h2>";
    show_champion_list = show_champion_list + "<img src=" + champarr[arr[i][0]][1] + " width=50px height=50px>";
  }
}
var nickname_success;
var nickname;
var userinfo_body;
var ext;
var sen;
var thi;
var jud;
var type1, type2, type3, type4, mbti_type;
var mbti;
app.get('/', function (req, res) {
  fs.readFile('index.html', 'utf8', function (err, data) {
    if(nickname_success ==0){
      data = data + "<script type='text/javascript'>alert('존재하지 않는 닉네임입니다.')</script>";
      nickname_success = 1;
    }
    res.end(data);
  })
});
app.get('/background', function (req, res) {
  fs.readFile('main.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpeg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/css/main.css', function (req, res) {
  fs.readFile('assets/css/main.css', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.end(data) // Send the file data to the browser.
});
});

app.get('/assets/css/font-awesome.min.css', function (req, res) {
  fs.readFile('assets/css/font-awesome.min.css', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/pic01.jpg', function (req, res) {
  fs.readFile('images/pic01.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/jquery.min.js', function (req, res) {
  fs.readFile('assets/js/jquery.min.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/browser.min.js', function (req, res) {
  fs.readFile('assets/js/browser.min.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/breakpoints.min.js', function (req, res) {
  fs.readFile('assets/js/breakpoints.min.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/util.js', function (req, res) {
  fs.readFile('assets/js/util.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/main.js', function (req, res) {
  fs.readFile('assets/js/main.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/js/main.min.js', function (req, res) {
  fs.readFile('assets/js/main.min.js', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'text/script'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/pic02.jpg', function (req, res) {
  fs.readFile('images/pic02.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/pic03.jpg', function (req, res) {
  fs.readFile('images/pic03.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/bg.jpg', function (req, res) {
  fs.readFile('images/bg.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/banner.png', function (req, res) {
  fs.readFile('images/banner.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/png'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/alter.png', function (req, res) {
  fs.readFile('images/alter.png', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/png'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/cta01.jpg', function (req, res) {
  fs.readFile('images/cta01.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/banner.mp4', function (req, res) {
  fs.readFile('images/banner.mp4', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'video/mp4'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/gugbab.jpg', function (req, res) {
  fs.readFile('images/gugbab.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/timo.jpg', function (req, res) {
  fs.readFile('images/timo.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/trend.jpg', function (req, res) {
  fs.readFile('images/trend.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/master.jpg', function (req, res) {
  fs.readFile('images/master.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/images/compete.jpg', function (req, res) {
  fs.readFile('images/compete.jpg', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/jpg'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/assets/fonts/fontawesome-webfont.woff2', function (req, res) {
  fs.readFile('assets/fonts/fontawesome-webfont.woff2', function(err, data) {
    if (err) throw err // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'application/x-font-woff2'})
      res.end(data) // Send the file data to the browser.
});
});
app.get('/question', function (req, res) {
  fs.readFile('generic.html', 'utf8', function (err, data) {
    res.end(data);
  })
});
app.get('/userinfo', function (req, res) {
    let mbti_text;
    let mbti_recommend_text;
    fs.readFile(`MBTI_sheet/${mbti_type}`, 'utf-8', function (err, data) {
      mbti_text = (data);
    });
    fs.readFile(`MBTI_sheet/${mbti_type}R`, 'utf-8', function(err, data){
      mbti_recommend_text = (data);
    });
    const userinfo = JSON.parse(userinfo_body);
    request(url_matchlist(userinfo.accountId, key), function (err, res_match, body_match) {
      let matchlist = JSON.parse(body_match);
      let total = matchlist.totalGames;
      let win_desire = 0;
      let gamemode_count = [0, 0, 0, 0, 0];//solo, free, normal, cold, event


      var total_champ_arr = [];
      var used_champ_arr = [];
      for (var i = 0; i < 900; i++) total_champ_arr[i] = 0;
      for (var i = 0; i < matchlist.matches.length; i++) {
        total_champ_arr[matchlist.matches[i].champion] += 1;
        if (matchlist.matches[i].queue == 420) {
          gamemode_count[0] += 1;
          continue;
        }
        if (matchlist.matches[i].queue == 440) {
          gamemode_count[1] += 1;
          continue;
        }
        if (matchlist.matches[i].queue == 430) {
          gamemode_count[2] += 1;
          continue;
        }
        if (matchlist.matches[i].queue == 450) {
          gamemode_count[3] += 1;
          continue;
        }
        else {
          gamemode_count[4] += 1;
        }
      }
      win_desire = (gamemode_count[0] + gamemode_count[1] * 0.7 + gamemode_count[2] * 0.3 + gamemode_count[3] * 0.1 + gamemode_count[4] * 0.1) / matchlist.matches.length * 10;
      for (var i = 0; i < 900; i++) if (total_champ_arr[i] != 0) used_champ_arr.push([i, total_champ_arr[i]]);





      used_champ_arr.sort(function (a, b) {
        return b[1] - a[1];
      });
      var most_champ = [0, 0, 0];
      for (var i = 0; i < 3; i++) {
        if (used_champ_arr[i] != null) {
          most_champ[i] = used_champ_arr[i][1];
        }
        else {
          most_champ[i] = 0;
        }
      }
      let master_spirit;
      let master_param = (most_champ[0] * 1.3 + most_champ[1] * 1.2 + most_champ[2] * 1.1) / 10;
      if (master_param > 10) {
        master_param = 10;
      }
      if (master_param >= 3) {
        if (master_param >= 4.1) {
          master_spirit = 6.56 + Math.pow(1.23, master_param - 4.1);
        }
        else {

          master_spirit = 5 + Math.pow(master_param - 2.5, 2);
        }
      }
      else {
        master_spirit = 5 - Math.pow(master_param - 3.5, 2);
      }
      if (master_spirit < 0) {
        master_spirit = 0;
      }

      mlist(used_champ_arr);

      /*for (var i = 100; i < total; i += 100) {
        request(url_matchlist_begin(userinfo.accountId, i, key), function(err, res_match_begin, body_match_begin){

        })
      }*/

      var resultlength;
      var characteristic = [0, 0, 0, 0, 0];


      if (used_champ_arr.length > 15) {
        resultlength = 15;
      }
      else {
        resultlength = used_champ_arr.length;
      }

      for (var j = 2; j < 7; j++) {
        for (var i = 0; i < resultlength; i++) {
          characteristic[j - 2] = characteristic[j - 2] + (champarr[used_champ_arr[i][0]][j] * used_champ_arr[i][1] / 100);
        }
      }
      characteristic[3] = master_spirit;
      characteristic[4] = win_desire;

      var urlarray = []
      for (var i = 0; i < resultlength; i++) {
        urlarray.push(JSON.stringify(champarr[used_champ_arr[i][0]][1]));
      }
      
      var for_user_data = `<!DOCTYPE HTML>
      <!--
         Industrious by TEMPLATED
         templated.co @templatedco
         Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
      -->
      <html>
      
      <head>
        <title>LOL MBTI 분석 결과</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <link rel="stylesheet" href="assets/css/main.css" />
      </head>
      
      <body class="is-preload">
      
        <!-- Header -->
        <header id="header">
          <a class="logo" href="./">LOL MBTI</a>
        </header>
      
      
        <!-- Heading -->
				<div id="heading" style="height : 30rem !important; min-height : 30rem; 
        background-image: linear-gradient(rgba(17, 17, 17, 0.25), rgba(17, 17, 17, 0.25)), url(../../images/alter.png);">
          <h1>LOL MBTI / 플레이어 성향 분석 결과</h1>
				</div>
      
      
        <!-- Main -->
        <section id="main" class="wrapper">
          <div class="inner">
            <header class="special">
              <h2>MBTI 설문 결과와 사용 챔피언, 게임모드를 분석한 사용자의 성향</h2>
            </header>
            <div class="content">
      
                        <h2> 1. MBTI 결과 </h2>
                        <div class = "box1">
                        </div>
                        <div id = "mbti_text" style = "font-size : 15px">
                        ${mbti_text}
                        </div>
                        <hr>
                        
                        <h2> 2. 최근 100 게임 사용 챔피언 그래프 </h2>
                        <div class = "box2">
                        </div>
                        <hr>
                    
                        <h2> 3. 최근 100 게임의 유형 </h2>
                        <div class = "box3">
                        </div>
                        <hr>
                    
                        <h2> 4. MBTI 결과와 최근 100게임 분석을 통한 사용자 성향 </h2>
                        <div class = "box4">
                        </div>
                        <hr>
                    
                        <h2> 5. 추천 챔피언 및 포지션 </h2>
                        <div class = "box5">
                        </div>
                        <div id = "mbti_recommend_text" style="font-size : 30px;margin-top:50px;margin-left:3%">
                        ${mbti_recommend_text}
                        </div>
      
            </div>
          </div>
        </section>

        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        <script src="assets/js/main.js"></script>
<script src="https://d3js.org/d3.v5.min.js"></script>
<script type="text/javascript">
$("#mbti_text p#mbti_title").attr("style", "font-size : 30px; text-align : center; font-weight : bold");
$("#mbti_text p#mbti_content").attr("style", "font-size : 20px; text-align : left");

var svg = d3.select(".box1").append("svg")
    .attr('width', 1600)
    .attr('height', 400)
var mbti_which = [];
svg.selectAll().data([${mbti}])
.enter()
.append("text")
.attr("x", function(d, i){
  return 100 + i *50;
})
.attr("y", 200)
.text(function(d, i){
  if(i == 0){
    if(d>=5){
      mbti_which.push(0);
      return "I";
    }
    else{
      mbti_which.push(1);
      return "E";
    }
  }
  if(i == 1){
    if(d>=5){
      mbti_which.push(0);
      return "N";
    }
    else{
      mbti_which.push(1);
      return "S";
    }
  }
  if(i == 2){
    if(d>=5){
      mbti_which.push(0);
    return "F";
    }
    else{
      mbti_which.push(1);
      return "T";
    }
  }
  if(i == 3){
    if(d>=5){
      mbti_which.push(0);
    return "P";
    }
    else{
      mbti_which.push(1);
      return "J";
    }
  }

})
.style("font-size", "40px");

svg.selectAll().data([${mbti}]).enter()
.append("circle")
.attr("cx", 430)
.attr("cy", function(d, i){
  return 100 +15+ i*50})
.attr("r", 15)
.attr("fill", "#CE1B28")
.attr("id", function(d,i){
  return "left_circle"+i;
})

svg.selectAll().data([${mbti}]).enter()
.append("circle")
.attr("cx", 830)
.attr("cy", function(d, i){
  return 100 +15+ i*50})
.attr("r", 15)
.attr("fill", "#008220")
.attr("id", function(d,i){
  return "right_circle"+i;
})
svg.selectAll().data([${mbti}]).enter()
.append("rect")
.attr("x", 430)
.attr("y", function(d, i){
  return 100 + i*50})
.attr("width", function(d){
  return d*40;
})
.attr("height", 30)
.attr("fill", "#CE1B28")
.on("mouseover", function(d, i){
    $(this).attr("width", d*40 + 10)
    $(this).attr("height", 30 + 10)
    $(this).attr("x", 425)
    $(this).attr("y", 100 + i*50 - 5)
    $("#left_circle"+i).attr("r", 20).attr("cx", 425);
    d3.select(this).raise()
    d3.select(".box1 svg").append("text").text((d)*10+"%").attr("id", "tmp").attr("x", d3.mouse(this)[0]).attr("y",d3.mouse(this)[1]-30)
    .style("font-size", "40px")
})
.on("mouseout", function(d, i){
  $(this).attr("width", d*40)
  $(this).attr("height", 30)
  $(this).attr("x", 430)
  $(this).attr("y", 100 + i*50)
  $("#left_circle"+i).attr("r", 15).attr("cx", 430);
  d3.select(this).lower()
  $("#tmp").remove();
});
svg.selectAll().data([${mbti}]).enter()
    .append("rect")
    .attr("x", function(d){
      return 430 + d*40;
    })
    .attr("y", function(d, i){
      return 100 + i*50})
    .attr("width", function(d){
      return (10-d)*40;
    })
    .attr("height", 30)
    .attr("fill", "#008220")
.on("mouseover", function(d, i){
    $(this).attr("width", (10-d)*40 + 10)
    $(this).attr("height", 30 + 10)
    $(this).attr("x", 430 + d*40 - 5)
    $(this).attr("y", 100 + i*50 -5)
    d3.select(".box1 svg").append("text").text((10-d)*10+"%").attr("id", "tmp").attr("x", d3.mouse(this)[0]).attr("y",d3.mouse(this)[1]-30)
    .style("font-size", "40px")
    $("#right_circle"+i).attr("r", 20).attr("cx",835);
})
.on("mouseout", function(d, i){
  $(this).attr("width", (10-d)*40)
  $(this).attr("height", 30)
  $(this).attr("x", 430 + d*40)
  $(this).attr("y", 100 + i*50)
  $("#right_circle"+i).attr("r", 15).attr("cx",830);
  $("#tmp").remove();
});

svg.selectAll().data(["I(외향)","N(직관)","F(감정)","P(인식)"])
    .enter()
    .append("text")
    .attr("x", function(d, i){
      return 330;
    })
    .attr("y", function(d, i){
      return 120 + i*50})
    .text(function(d, i){
        return d;
    })
    .style("font-size", "20px")
    .style("font-weight", function(d, i){
      if(mbti_which[i] == 0){
        return "bold"
      }
      else{
        return "normal"
      }
    });
svg.selectAll().data(["E(외향)","S(현실)","T(사고)","J(판단)"])
    .enter()
    .append("text")
    .attr("x", function(d, i){
      return 880;
    })
    .attr("y", function(d, i){
      return 120 + i*50})
    .text(function(d, i){
        return d;
    })
    .style("font-size", "20px")
    .style("font-weight", function(d, i){
      if(mbti_which[i] == 1){
        return "bold"
      }
      
      else{
        return "normal"
      }
    });



var svg = d3.select(".box2").append("svg")
        .attr('width', 1600)
        .attr('height', 450)
var tmp =[${used_champ_arr}];



var dataset = [];
if(tmp.length<30){
  var length = tmp.length;
}
else{
  var length = 30;
}
for(var i = 0; i<length; i++){
  if((i%2)==1){
    continue;
  }
  dataset.push([tmp[i], tmp[i+1]])

}
var ratio = 300/dataset[0][1];

svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', function(d, i){
        return i*70+20
      })
      .attr('y', function(d){
        return 340 -d[1]*ratio; 
      })
      .attr('width', 30)
      .attr('height', function(d){
        return d[1]*ratio;
      })
      .attr('fill',"#CE1B28");
svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', function(d, i){
        return i*70+20+15
      })
      .attr('cy', function(d){
        return 340 -d[1]*ratio; 
      })
      .attr('r', 15)
      .attr('fill',"#CE1B28");
svg.selectAll()
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', function(d, i){
        return i*70+20+15
      })
      .attr('cy', function(d){
        return 340; 
      })
      .attr('r', 15)
      .attr('fill',"#CE1B28");
var imgdataset = [${urlarray}];

svg.selectAll('image')
.data(imgdataset)
.enter()
.append('image')
.attr("xlink:href", function(d){return d;})
.attr('x', function(d, i){
  return i*70+10
})
.attr('y', 375)
.attr('width', 50)
.attr('height', 50)


svg.selectAll('text')
.data(dataset)
.enter()
.append('text')
.attr('x', function(d, i){
  return i*70+29
})
.attr('y',  function(d){
  return 320 -d[1]*ratio; 
})
.text(function(d){
  return d[1];
});


var svg = d3.select(".box3").append("svg")
    .attr('width', 1600)
    .attr('height', 400)
var max_count = 0;
gamemode_count = [${gamemode_count}];
for(var i = 0; i<5; i++){
  if(max_count<gamemode_count[i]){
    max_count = gamemode_count[i];
  }
}
var ratio = 800/max_count;
svg.selectAll('rect')
    .data(gamemode_count)
    .enter()
    .append('rect')
    .attr('x', function(d, i){
      return 100;
    })
    .attr('y', function(d, i){
      return i*60+60; 
    })
    .attr('width', function(d){
      return d*ratio; })
    .attr('height', function(d){
      return 30;
    })
    .attr('fill', "#CE1B28");
svg.selectAll()
    .data(gamemode_count)
    .enter()
    .append('circle')
    .attr("cx", function(d, i){
      return 100;
    })
    .attr("cy", function(d, i){
      return i*60+75; 
    })
    .attr("r", "15")
    .attr("fill", "#CE1B28")

svg.selectAll()
    .data(gamemode_count)
    .enter()
    .append('circle')
    .attr("cx", function(d){
      return 100 + d*ratio; })
    .attr("cy", function(d, i){
      return i*60+75; 
    })
    .attr("r", "15")
    .attr("fill", "#CE1B28")
svg.selectAll('text')
    .data(["솔랭","자랭","일반","칼바람","이벤트"])
    .enter()
    .append('text')
    .attr('x', function(d, i){
      return 15
    })
    .attr('y',  function(d, i){
      return i*60+85; 
    })
    .text(function(d){
      return d;
    })
    .style("font-size", "20px")
    .style("font-weight", "normal");

svg.selectAll()
    .data(gamemode_count)
    .enter()
    .append('text')
    .attr('x', function(d, i){
      return 130+d*ratio
    })
    .attr('y',  function(d, i){
      return i*60+82; 
    })
    .text(function(d){
      return d;
    })
    .style("font-size", "20px")
    .style("font-weight", "normal");
    

var ch_arr= [${characteristic}];

function pentagon(ratio1, ratio2, ratio3, ratio4, ratio5){
  return [[400, 425-200-200*ratio1/10], [400+190.2*ratio2/10, 425-200-61.8*ratio2/10], [400+117.4*ratio3/10, 425-200+161.8*ratio3/10], [400-117.4*ratio4/10, 425-200+161.8*ratio4/10],[400-190.2*ratio5/10, 425-200-61.8*ratio5/10],[400, 425-200-200*ratio1/10] ];
}

var line = d3.line()
.x(function (d) { return d[0]; })
.y(function (d) { return d[1]; });

var svg2 = d3.select(".box4").append("svg")
    .attr('width', 1600)
    .attr('height', 450)
svg2.append("path")
.attr("d", line(pentagon(10,10,10,10,10)))
.attr("fill", "none")
.attr("stroke", "red")
.attr("stroke-width", 1)

svg2.append("path")
.attr("d", line(pentagon(...ch_arr)))
.attr("fill", d3.rgb(140, 186, 255))
.attr("fill-opacity", "0.5")

var tmpline = [[400,225], pentagon(10,10,10,10,10)[0]]
svg2.append("path")
.attr("d", line(tmpline))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)

tmpline = [[400,225], pentagon(10,10,10,10,10)[1]]
svg2.append("path")
.attr("d", line(tmpline))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)

tmpline = [[400,225], pentagon(10,10,10,10,10)[2]]
svg2.append("path")
.attr("d", line(tmpline))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)


tmpline = [[400,225],pentagon(10,10,10,10,10)[3]]
svg2.append("path")
.attr("d", line(tmpline))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)

tmpline = [[400,225], pentagon(10,10,10,10,10)[4]]
svg2.append("path")
.attr("d", line(tmpline))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)

svg2.append("path")
.attr("d", line(pentagon(8,8,8,8,8)))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)
svg2.append("path")
.attr("d", line(pentagon(6,6,6,6,6)))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)
svg2.append("path")
.attr("d", line(pentagon(4,4,4,4,4)))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)
svg2.append("path")
.attr("d", line(pentagon(2,2,2,2,2)))
.attr("fill", "none")
.attr("stroke", d3.rgb(140, 186, 255))
.attr("stroke-width", 1)
var svg = d3.select(".box4").select("svg")
svg.selectAll()
.data(pentagon(10,10,10,10,10))
.enter()
.append('text')
.attr('x', function(d, i){
  if(i == 0){
  return d[0]-20
  }
  if(i == 1){
    return d[0]
    }
    
  if(i == 2){
    return d[0]-40
    }
    
  if(i == 3){
    return d[0]-40
    }
    
  if(i == 4){
    return d[0]- 65
    }
})
.attr('y',  function(d, i){
  if(i == 0){
  return d[1]-5
  }
  if(i == 1){
    return d[1]
    }
  if(i == 2){
    return d[1]+20
    }
    
  if(i == 3){
    return d[1]+20
    }
    
  if(i == 4){
    return d[1]
    }
})
.text(function(d, i){
  if(i == 5){
    return "";
  }
  
  if(i == 0){
    return "잼민"
    }
    if(i == 1){
      return "국밥"
      }
    if(i == 2){
      return "트렌드"
      }
      
    if(i == 3){
      return "장인정신"
      }
      
    if(i == 4){
      return "승부욕"
      }
})
.style("font-size", "20px")
.style("font-weight", "normal");

$("rect").attr("opacity", "1");

</script>

  </body>
  
  </html>
    `;
      res.end(for_user_data);
    }); // requset matchlist

});
app.post('/nickname_process', function (req, res) {
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    var post = qs.parse(body);
    nickname = post.nickname;
    
  request(url_name(nickname, key), function (err, res_name, body_name) {
    if(res_name.statusCode == 200){
      nickname_success = 1;
      userinfo_body = body_name;
      res.redirect('/question');
    }
    else{
      nickname_success = 0;
      res.redirect('/');
    }
  })
  });
});

app.post('/question_process', function (req, res) {
  var body = '';
  ext = 0;
  sen = 0;
  thi = 0;
  jud = 0;
  mbti = [];
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    var post = qs.parse(body);
    ext += Number(post.ext1);
    ext += Number(post.ext2);
    ext += Number(post.ext3);
    sen += Number(post.sen1);
    sen += Number(post.sen2);
    sen += Number(post.sen3);
    thi += Number(post.thi1);
    thi += Number(post.thi2);
    thi += Number(post.thi3);
    jud += Number(post.jud1);
    jud += Number(post.jud2);
    jud += Number(post.jud3);
    mbti = [ext / 3, sen / 3, thi / 3, jud / 3];

    {// mbti type 결정
      if(mbti[0] >= 5){ // 5점 이상이면 내향형(I)
        type1 = "I";
      }
      else{
        type1 = "E";
      }
      if(mbti[1] >= 5){ // 5점 이상이면 직관형(N)
        type2 = "N";
      }
      else{
        type2 = "S";
      }
      if(mbti[2] >= 5){ // 5점 이상이면 감정형(F)
        type3 = "F";
      }
      else{
        type3 = "T";
      }
      if(mbti[3] >= 5){ // 5점 이상이면 인식(즉흥)형(P)
        type4 = "P";
      }
      else{
        type4 = "J";
      }
    }
    mbti_type = type1 + type2 + type3 + type4;
    res.redirect('/userinfo');
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});