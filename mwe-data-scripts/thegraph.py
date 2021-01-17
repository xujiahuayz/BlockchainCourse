import requests
import json
from pprint import pprint

reserves_query = """
query {
  reserves (first: 6) {
    id
    symbol
    name
    decimals
    usageAsCollateralEnabled
    borrowingEnabled
    price {
      # id
      priceInEth
    }
    lastUpdateTimestamp
    baseLTVasCollateral
    aToken {
    id
    # underlyingAssetAddress
    underlyingAssetDecimals
  }
  }
}
"""


url = 'https://api.thegraph.com/subgraphs/name/aave/protocol-raw'
r = requests.post(url, json={'query': reserves_query})
reserves_json = json.loads(r.text)['data']['reserves']

pprint(reserves_json)
