# coding:utf-8

import requests
from lxml import etree
from datetime import date
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
import sys

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


session = requests.Session()
url = "https://www.windfinder.com/forecast/boston_harbor/"
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

response = session.get(url, headers=headers)
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

# print jsonPreAndWindData

class Handler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        self._set_headers()
        self.wfile.write(jsonPreAndWindData)

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        # ?? Doesn't do anything with posted data
        self._set_headers()
        # self.wfile.write("<html><body><h1>POST!</h1></body></html>")


def run(serverIP, port):
    handler_class=Handler
    server_class=HTTPServer
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)
    sa = httpd.socket.getsockname()
    print "Serving HTTP on", sa[0], "port", sa[1], "..."
    httpd.serve_forever()


def main():
    run(sys.argv[1], int(sys.argv[2]))

if __name__ == '__main__':
    main()