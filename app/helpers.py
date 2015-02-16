from random import choice


# Pull a random hashtag from an image's hastag
# list, and return it as a dictionary
def pick_random_tag(tags):
    tag = choice(tags)
    return tag.__dict__


# Pull out the information we need from
# Instagram API's image
def extract_feed_item(image):
    return {
        'id': image.id,
        'image': image.images['standard_resolution'].url,
        'caption': image.caption.text if image.caption is not None else '',
        'tags': [t.name for t in image.tags],
        'from': image.user.__dict__,
        'url': image.link
    }


# Make sure images we receive are
#  - images
#  - have hashtags (and at least one at that!)
def is_valid_item(image):
    return hasattr(image, 'tags') \
        and image.type == 'image' \
        and len(image.tags) > 0
