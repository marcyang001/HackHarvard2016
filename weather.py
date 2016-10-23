# coding:utf-8

import requests
from lxml import etree
from datetime import date
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import os


urls = [
    'http://www.accuweather.com/en/us/boston-ma/02108/november-weather/348735?monyr=',
    'http://www.accuweather.com/en/ca/montreal/h3a/october-weather/56186?monyr=',
    'http://www.accuweather.com/en/us/orlando-fl/32801/october-weather/328169?monyr='
]

selectedurl = urls[int(sys.argv[1])]

session = requests.Session()

currentYr = date.today().year
currentMon = date.today().month
currentDay = date.today().day
weathers = []
monthlyWeathers = []
for i in range(0, 4):
    yr = currentYr
    mon = (currentMon + i) % 13
    if (mon == 0):
        mon = 1;
    if (currentMon + i > 12):
        yr += 1
    monyr = mon.__str__() + '/' + '1' + '/' + yr.__str__()
    url = selectedurl + monyr + '&view=table'
    response = session.get(url)
    et = etree.HTML(response.content)
    monthlyData = et.xpath('//*[@id="panel-main"]/div[2]/div/div/table/tbody/tr[contains(@class, "lo")]')
    totalPrecip = 0
    totalSnow = 0
    dayCount = 0
    for w in monthlyData:
        week = w.xpath('./th/a/text()')[0]
        date = w.xpath('./th/a/time/text()')[0]
        highlow = w.xpath('./td/text()')[0]
        high = int(highlow.split('/')[0][:-1])  # [:-1] removes the degree symbol
        low = int(highlow.split('/')[1][:-1])
        precip = w.xpath('./td/text()')[1].strip()  # unit IN
        snow = w.xpath('./td/text()')[2].strip()  # unit IN
        forecast = w.xpath('./td[4]/p/text()')[0]  # description of weather
        avghighlow = w.xpath('./td[5]/text()')[0]  # average high and low
        avghigh = int(avghighlow.split('/')[0][:-1])
        avglow = int(avghighlow.split('/')[1][:-1])
        weathers.append(
                {
                    'date': date,
                    'week': week,
                    'high': high,
                    'low': low,
                    'precip': precip,
                    'snow': snow,
                    'forecast': forecast,
                    'avghigh': avghigh,  # use for prediction and suggestion
                    'avglow': avglow  # use for prediction and suggestion
                })
        dayCount += 1
        totalPrecip += float(precip)
        totalSnow += float(snow)

    totalPrecip /= dayCount
    totalPrecip *= 30
    totalSnow /= dayCount
    totalSnow *= 30
    monthlyWeathers.append(
            {
                "month": mon,
                "total-precip": totalPrecip,
                "total-snow": totalSnow
            })

print '  - OK - successfully get and parsed ' + len(weathers).__str__() + ' days of weather\n'

weatherInfo = {
    "daily": weathers,
    "monthly": monthlyWeathers
}

jsonWeathers = json.dumps(weatherInfo)
# print jsonWeathers

path = './html/main/data/'
if not os.path.exists(path):
    os.makedirs(path)

with open(path + 'temp' + sys.argv[1] + '.json', 'w') as f:
    json.dump(weatherInfo, f)

