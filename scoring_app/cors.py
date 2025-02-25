# pylint: disable=R0903 (too-few-public-methods)
class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, req):
        response = self.get_response(req)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token"
        response["Access-Control-Allow-Methods"] = "*"
        return response
