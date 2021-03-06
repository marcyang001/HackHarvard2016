# coding:utf-8

import requests
from lxml import etree
from datetime import date
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import os



def mapMonth(charMon):
    charMon = charMon.lower();
    if charMon in ('jan', 'january'):
        return '1'
    if charMon in ('feb', 'february'):
        return '2'
    if charMon in ('mar', 'march'):
        return '3'
    if charMon in ('apr', 'april'):
        return '4'
    if charMon is 'may':
        return '5'
    if charMon in ('jun', 'june'):
        return '6'
    if charMon in ('jul', 'july'):
        return '7'
    if charMon in ('aug', 'august'):
        return '8'
    if charMon in ('sep', 'september'):
        return '9'
    if charMon in ('oct', 'october'):
        return '10'
    if charMon in ('nov', 'nove', 'november'):
        return '11'
    if charMon in ('dec', 'december'):
        return '12'


urls = [
    "https://www.windfinder.com/forecast/boston_harbor/",
    "https://www.windfinder.com/forecast/montreal_pont_viau/",
    "https://www.windfinder.com/forecast/orlando_airport/"
]

selectedurl = urls[int(sys.argv[1])]

session = requests.Session()

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": "PHPSESSID=r4vmfk2a93r8h82eni785l3527; __uvt=; __utma=42180789.1289148316.1477103265.1477103265.1477103265.1; __utmb=42180789.5.10.1477103265; __utmc=42180789; __utmz=42180789.1477103265.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __atuvc=2%7C42; __atuvs=580acea1b83b3616001; uvts=5Bs81s6LAV4vHpRN",
    "If-None-Match": 'W/"580ace7e-1964f"',
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Safari/602.1.50"
}
currentYr = date.today().year
currentMon = date.today().month
currentDay = date.today().day
pressuresAndWindspeeds = []

response = session.get(selectedurl, headers=headers)
et = etree.HTML(response.content)
data = et.xpath(
        '//*[@id="frame"]/div/div[1]/section[1]/div[@class="weathertable-container"]/div[contains(@class, "forecast")]')

for d in data:
    weekAndDate = d.xpath('./div[1]/text()')[0].strip()
    month = weekAndDate.split(', ')[1].split(' ')[0]
    month = mapMonth(month)
    day = weekAndDate.split(', ')[1].split(' ')[1]
    date = month + '/' + day
    week = weekAndDate.split(', ')[0][:3]
    rowsInOneDay = d.xpath('./div[2]/div')
    avgWindspeed = 0
    avgPressure = 0
    for row in rowsInOneDay:
        windspeed = row.xpath('./div[4]/div[1]/div[1]/span/span[1]/text()')[0]  # unit in kts
        avgWindspeed += float(windspeed)
        pressure = row.xpath('./div[6]/div[2]/span[1]/text()')[0]
        avgPressure += float(pressure)
    avgWindspeed /= len(rowsInOneDay)
    avgPressure /= len(rowsInOneDay)
    pressuresAndWindspeeds.append(
            {
                'date': date,
                'week': week,
                'windspeed': avgWindspeed,
                'pressure': avgPressure
            })

jsonPreAndWindData = json.dumps(pressuresAndWindspeeds)

path = './html/main/data/'
if not os.path.exists(path):
    os.makedirs(path)

with open(path + 'windpress' + sys.argv[1] + '.json', 'w') as f:
    json.dump(pressuresAndWindspeeds, f)
