import urllib.request
import urllib.error
import json
import base64
from mitmproxy import http
import mitmproxy
import os


NAME = "Haiko"

NODEJS_SERVER = "http://localhost:3000/capture"


def forward_to_nodejs(data: bytes, metadata: dict, is_request: bool = True):
    """Send raw protobuf bytes to Node.js server."""
    payload = json.dumps({
        "proto": base64.b64encode(data).decode("utf-8"),
        "meta": metadata
    }).encode("utf-8")

    req = urllib.request.Request(
        NODEJS_SERVER,
        data=payload,
        headers={"Content-Type": "application/json"},
        method= "POST"
    )
    # if is_request:
    #     return
    req.header_items
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            mitmproxy.ctx.log.info(f"Received response from Node.js server for {metadata['url']}")
            # get the proto field from the response body and decode it from base64
            resp_data = json.loads(resp.read())
            mitmproxy.ctx.log.info(f"Response data from Node.js: {resp_data}")
            if "proto" in resp_data:
                decoded_proto = base64.b64decode(resp_data['proto'])
                mitmproxy.ctx.log.info(f"Decoded proto from Node.js response: {decoded_proto[:50]}... (truncated)")
                return decoded_proto
    except urllib.error.URLError as e:
        print(f"[mitmproxy→node] Failed to forward: {e}")


def request(flow):
    if flow.request.pretty_host.endswith("gms-api.clovergames.io"):
            flow.request.host = "127.0.0.1"
            flow.request.port = 3000
            flow.request.scheme = 'http'
            flow.request.headers["Host"] = "127.0.0.1"
            print(flow.request.headers)
    if flow.request.pretty_host.endswith("cannae-gs.clovergames.io"):
        if flow.request.headers["Content-Type"] == "application/octet-stream":
            
            proto_bytes = flow.request.content  # raw protobuf payload
            metadata = {
                "url":    flow.request.pretty_url,
                "method": "REQUEST",
                "name": NAME
            }

            forward_to_nodejs(proto_bytes, metadata)
            

def response(flow):
    if flow.request.pretty_host.endswith("cannae-gs.clovergames.io"):
        
        if flow.request.headers["Content-Type"] == "application/octet-stream":
            
            proto_bytes = flow.response.content  # raw protobuf payload
            metadata = {
                "url":    flow.request.pretty_url,
                "method": "RESPONSE",
                "name": NAME
            }
            mitmproxy.ctx.log.info(f"Forwarding response for {metadata['url']} to Node.js server...")
            modified = forward_to_nodejs(proto_bytes, metadata, False)
            if modified:
                flow.response.content = modified
                
                


        
