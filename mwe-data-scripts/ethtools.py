import requests
import json
from subprocess import run, PIPE


INFURAURL = 'https://mainnet.infura.io/v3/60fa4da89e6440aea04733cf913dc59a'
rootcommand = 'eth-tools call-contract'

# using https://github.com/danhper/ethereum-tools, run `pip install ethereum-tools` first


def getContractOutput(
        addr: str, func: str, abipath: str, endpoint: str = INFURAURL
):
    command = rootcommand + ' --abi ' + abipath + \
        ' --web3-uri ' + endpoint + ' -f ' + func + ' ' + addr
    print(command)

    output = run(command, shell=True, stdout=PIPE).stdout
    return json.loads(output)


if __name__ == "__main__":
    ABIDIR = 'data/ctoken.json'
    ctoken_abi_url = 'http://api.etherscan.io/api?module=contract&action=getabi&address=0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e&format=raw'
    ctoken_JSON = requests.get(ctoken_abi_url).json()
    with open(ABIDIR, 'w') as outfile:
        json.dump(ctoken_JSON, outfile)

    cbatadd = '0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e'

    ttlbrw = getContractOutput(
        addr=cbatadd, func='totalBorrowsCurrent', abipath=ABIDIR)
    print(ttlbrw)
