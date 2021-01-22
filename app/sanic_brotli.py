#!/usr/bin/python
# -*- coding: UTF-8 -*-

"""
    @author     :   xstatus
    @time       :   2020/11/15 17:11
    @email      :   crawler@88.com
    @project    :   sanic_brotli -> __init__.py.py
    @IDE        :   PyCharm
    @describe   :   ooops
"""

name = 'sanic_brotli'

import brotli

DEFAULT_MIME_TYPES = frozenset([
    'text/html', 'text/css', 'text/xml',
    'application/json',
    'application/javascript'])


class Compress(object):
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        defaults = [
            ('COMPRESS_MIMETYPES', DEFAULT_MIME_TYPES),
            ('COMPRESS_LEVEL', 6),
            ('COMPRESS_MIN_SIZE', 500),
        ]

        for k, v in defaults:
            app.config.setdefault(k, v)

        @app.middleware('response')
        async def compress_response(request, response):
            return (await self._compress_response(request, response))

    async def _compress_response(self, request, response):
        accept_encoding = request.headers.get('Accept-Encoding', '')
        content_length = len(response.body)
        content_type = response.headers.get('Content-Type', '').split(';')[0]

        if (content_type not in self.app.config['COMPRESS_MIMETYPES'] or
            'br' not in accept_encoding.lower() or
            not 200 <= response.status < 300 or
            (content_length is not None and
             content_length < self.app.config['COMPRESS_MIN_SIZE']) or
                'Content-Encoding' in response.headers):
            return response

        gzip_content = self.compress(response)
        response.body = gzip_content

        response.headers['Content-Encoding'] = 'br'
        response.headers['Content-Length'] = len(response.body)

        vary = response.headers.get('Vary')
        if vary:
            if 'accept-encoding' not in vary.lower():
                response.headers['Vary'] = '{}, Accept-Encoding'.format(vary)
        else:
            response.headers['Vary'] = 'Accept-Encoding'

        return response

    def compress(self, response):
        out = brotli.compress(response.body,quality=self.app.config['COMPRESS_LEVEL'])

        return out
