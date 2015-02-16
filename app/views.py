from flask import render_template, make_response
from instagramapi import api
from helpers import pick_random_tag, extract_feed_item, is_valid_item
from app import app

import json


# Base route -----------------------------
#   Backbone app loaded on this template
# ----------------------------------------
@app.route('/')
def index():
    return render_template('index.html')


# Main API route -------------------------
#   Backbone app sends GET to this feed to
#   populate game feed and tags
# ----------------------------------------
@app.route('/api/v1/game/feed/')
def game_feed():
    result, tags = [], []
    images = api.media_popular(count=30)

    # Build feed from result of API call
    for img in filter(is_valid_item, images):
        item = extract_feed_item(img)
        tags.append(pick_random_tag(img.tags))
        result.append(item)

    response = {
        'images': result,
        'tags': tags
    }

    return make_response(
        json.dumps(response),
        200,
        {'Content-Type': 'application/json'}
    )
