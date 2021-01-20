import requests
import json
from pprint import pprint


datafolder = 'data/'

BASEURL = 'https://min-api.cryptocompare.com/data/v2/histohour?'


def getPriceHistory(fromcoin: str, limit: int = 2000, tocoin: str = 'USD'):
    url = BASEURL + 'limit=' + \
        str(limit) + '&tsym=' + tocoin + '&fsym=' + fromcoin

    print(url)

    historyJSON = requests.get(url).json()

    pprint(historyJSON)

    with open(datafolder + fromcoin + '-price.json', 'w') as f:
        json.dump(historyJSON, f)


if __name__ == '__main__':
    getPriceHistory(fromcoin='BTC', limit='7')
