import requests
from bs4 import BeautifulSoup

class BetikaScraper:
    def __init__(self, url):
        self.url = url

    def get_odds(self):
        response = requests.get(self.url)
        
        if response.status_code != 200:
            raise Exception(f"Failed to load page {self.url}")
        print(response)
        # return response

        soup = BeautifulSoup(response.text, 'html.parser')
        print(soup)
        odds = []
        for odd in soup.find_all('div', class_='event'):
            odds.append({
                'name': odd.find('div', class_='event__title').text,
                'home': odd.find('div', class_='event__team event__team--home').text,
                'draw': odd.find('div', class_='event__odds').text,
                'away': odd.find('div', class_='event__team event__team--away').text,
            })
        print(odds)
        return odds
        

if __name__ == "__main__":
    url = 'https://www.betika.com'  # Replace with the actual URL of the page you want to scrape
    scraper = BetikaScraper(url)
    odds = scraper.get_odds()
    for odd in odds:
        print(odd)