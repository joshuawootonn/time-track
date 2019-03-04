# Build Guide
Ok this is how you build Time-Track. I did this like a month ago and now i don't know wtf is what :)

## Customize the icon
Follow the instructions in `./assets/generate_icons.md`


## Linux
* These instructions are for building on linux 
* These instructions are for building for linux and windows

#### Install globals needed
```
sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

#### Install globals needed for windows `.exe`
For Ubuntu 18.04:
```
sudo dpkg --add-architecture i386 

wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key

sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ bionic main'

sudo apt install --install-recommends winehq-stable
```
Check [here](https://wiki.winehq.org/Ubuntu) for other versions


#### Set GH_TOKEN
 1. Go [here](https://github.com/settings/tokens)
 2. Create key with good description so you know wtf you are doing next time
 3. Set key in env `export GH_TOKEN="<YOUR_TOKEN_HERE>"` or set the variable perminantly in `/etc/environment` as you can see [here](https://askubuntu.com/a/58828)
 4. Cut that check 💰

#### Run the command
`yarn run dist`

This command will build both windows and linux version. Customize it for just one version if needed.