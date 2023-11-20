# naan svr

### setup
`sudo mkdir -p /usr/local/etc/`  
`cd /usr/local/etc`  
`sudo git clone https://github.com/critiqalfish/naan.git`  

`sudo nano naan/svr/naan.py`  
```
PATH = "$YOUR_PATH_HERE"
PW = "$YOUR_PW_HERE"
```
`sudo pacman -S python-fastapi python-requests uvicorn`  

`sudo nano /etc/systemd/system/naan.service`  
```
[Unit]
Description=naan service
After=network.target

[Service]
WorkingDirectory=/usr/local/etc/naan/svr
ExecStart=uvicorn naan:app --host 0.0.0.0 --port 7779

[Install]
WantedBy=multi-user.target
```
`sudo systemctl enable naan`  
`sudo systemctl start naan`  