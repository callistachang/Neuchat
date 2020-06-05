import secrets
import string


def csv_to_list(csv_string):
    return csv_string.split(",")


def generate_id(length):
    return ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(length))
