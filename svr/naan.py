from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
import mimetypes
import datetime
import requests
import uuid

PATH = ""
PW = ""

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.post("/naan/", status_code = 200)
async def process_item(request: Request, response: Response):
    data = await request.json()
    if data.get("pw") == PW:
        urli = data.get("urli")
        print(urli)
        if urli:
            try:
                res = requests.get(urli)
                res.raise_for_status()
                fext = mimetypes.guess_extension(res.headers.get("Content-Type"))
                if not fext:
                    response.status_code = 400
                    return "cant get file extension"
                fname = PATH + datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S_") + str(uuid.uuid4()) + fext
                with open(fname, "wb") as f:
                    f.write(res.content)
                print(fname)
            except Exception as e:
                print(e)
                response.status_code = 500
                return "server error"
    else:
        response.status_code = 401
        response.body = {"need pw"}
    return "yes"