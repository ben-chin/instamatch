import os
from flask import Flask

app = Flask(__name__)

if os.path.exists('settings.cfg'):
    app.config.from_pyfile('settings.cfg')
else:
    app.config.update(
        IG_CLIENT_ID=os.environ.get('IG_CLIENT_ID'),
        IG_CLIENT_SECRET=os.environ.get('IG_CLIENT_SECRET')
    )

from app import views
