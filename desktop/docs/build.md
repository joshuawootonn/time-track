# Build Guide
Ok this is how you build Time-Track. I did this like a month ago and now i don't know wtf is what :)

## Customize the icon
Follow the instructions in `./assets/generate_icons.md`


## Linux
* These instructions are for building on linux
* These instructions are for building for linux

#### Install globals needed
```
sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

#### Set GH_TOKEN
 1. Go [here](https://github.com/settings/tokens)
 2. Create key with good description so you know wtf you are doing next time
 3. Set key in env `export GH_TOKEN="<YOUR_TOKEN_HERE>"` or set the variable perminantly in `/etc/environment` as you can see [here](https://askubuntu.com/a/58828)
 4. Cut that check 💰



## Windows
* These instructions are for building on windows
* These instructions are for building for windows

#### Install globals needed
todo...

#### Set GH_TOKEN
 1. Go [here](https://github.com/settings/tokens)
 2. Create key with good description so you know wtf you are doing next time
 3. Set key in env `[Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")`
 4. Cut that check 💰

