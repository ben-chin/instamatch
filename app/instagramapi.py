from instagram.client import InstagramAPI
from app import app


api = InstagramAPI(client_id=app.config['IG_CLIENT_ID'],
                   client_secret=app.config['IG_CLIENT_SECRET'])
