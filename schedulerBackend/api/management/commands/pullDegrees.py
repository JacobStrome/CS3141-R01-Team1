from datetime import date, time
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from ...models import Section, Course, Semester
import requests

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        print("Starting to pull degrees")

        headers = {
            "Host": "www.banweb.mtu.edu",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Referer": "https://www.banweb.mtu.edu/owassb/mtu_degree_audit.p_request_audit",
            "Cookie": 'TESTID=set; SESSID=RFEwSk1LMjI0NzE5Mg==; CASCADE=SET; sghe_magellan_M67181346_locale=en_US; sghe_magellan_null_locale=en_US; auditCookie="M/48rcrRqLL5aB8gjB1IBKOe3iLng+HtdVD6vCURmFZsb+CUth/M+7zYyZlIzim8EttZ2268kIHGO2qF/NFjJ1qKGzbUCtwVcOH337w6IWs="; sghe_magellan_null_username=M67181346; IDMSESSID=42D065649D1CA6DCA7BA284505EB6E6468AAACB82EF37D05BC4C6776A322013C0BB13F192F9903A0177D95A3FFA4E776EA190A77815D18EDF8297D3ADE42B109',
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
        }
        degree_codes= [ "SAHUG","SCCCUG","STAUG","SCAUG","SCCMUG","SENUG","SSHUG","SHUUG","SPAUG","SFSDUG","SEMPUG","BACCUG","BAC1UG","SANTUG","FESUG","EAGUG","SAPUG",
                        "SFATUG","SMBBUG","SMBCUG","SBIUG","SBLUG","EBEUG","EBEEUG","ECMUG","ECMEUG","SCHUG","SCH2UG","SCH4UG","SCH5UG","SCH1UG","ECEUG","ECEEUG",
                        "ECPUG","ECPEUG","TCSAUG","SCS1UG","SCS2UG","SCS6UG","SCS7UG","TCMGUG","CCY1UG","CCY2UG","SEEBUG","BECUG","EEEVUG","EEEUG","EEEEUG","TEETUG",
                        "EEEBUG","EEEWUG","EEEPUG","EBSUG","BEMUG","EENUG","EENEUG","FESSUG","SESCUG","BFINUG","FFRUG","EGEUG","EGLUG","ECGEUG","SHBUG","SHFUG",
                        "SHF2UG","SHF3UG","SHF1UG","BMGTUG","BMISUG","BMG2UG","BMG1UG","BMKTUG","EMSEUG","MSEEUG","SMCSUG","SMA6UG","SMA8UG","SMA0UG","SMA5UG","SMA9UG",
                        "SMA2UG","EMEUG","TMETUG","EMEEUG","IMXUG","SML8UG","SML9UG","EMGUG","FNRMUG","SCHPUG","SPHUG","SPSYUG","SPS1UG","SPS2UG","SPS3UG","EREUG",
                        "STCUG","SSSUG","SSS5UG","SSENUG","SSFMUG","SSTUG","SSSUUG","FSB1UG","FSB3UG","FSB2UG","SFETUG","FWECUG","BGNUG","EGNUG","STECUG"
                        ]
        for code in degree_codes:
            r = requests.get(f'https://www.banweb.mtu.edu/owassb/mtu_degree_audit.p_request_audit_complete?fdgrog={code}&audit_switch=', headers=headers)
            linkIdxStart = r.text.index("https://www.banweb.mtu.edu/darwinia/bar?jobQSeqNo=")
            linkIdxEnd = r.text.index('"', linkIdxStart)

            auditHeaders = {
                "Host": "www.banweb.mtu.edu",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Cookie":  'auditCookie="M/48rcrRqLL5aB8gjB1IBKOe3iLng+HtdVD6vCURmFZsb+CUth/M+7zYyZlIzim8EttZ2268kIHGO2qF/NFjJ3qtCLOc0bjJ8fw+XY7mftE=";',
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
            }
            print(r.text[linkIdxStart:linkIdxEnd])
            r = requests.get(r.text[linkIdxStart:linkIdxEnd], headers=auditHeaders)
            with open(f'data/{code}.html', 'w') as f:
                f.write(r.text)            