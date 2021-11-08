# Headless video publisher

This sample uses custom video capturer and custom audio driver to publish a video and audio stream
in to the video session. 

You will need a valid [Vonage Video API](https://tokbox.com/developer/)
account to build this app. (Note that OpenTok is now the Vonage Video API.)

If you are looking for a Puppeteer/NodeJS based headless publisher - https://github.com/nexmo-se/headless-video-tester

## Setting up your environment

### OpenTok SDK

Building this sample application requires having a local installation of the
OpenTok Linux SDK.

#### On Debian-based Linuxes

The OpenTok Linux SDK for x86_64 is available as a Debian
package. For Debian we support Debian 9 (Strech) and 10 (Buster). We maintain
our own Debian repository on packagecloud. For Debian 10, follow these steps
to install the packages from our repository.

* Add packagecloud repository:

```bash
curl -s https://packagecloud.io/install/repositories/tokbox/debian/script.deb.sh | sudo bash
```

* Install the OpenTok Linux SDK packages.

```bash
sudo apt install libopentok-dev
```

#### On non-Debian-based Linuxes

Download the OpenTok SDK from [https://tokbox.com/developer/sdks/linux/](https://tokbox.com/developer/sdks/linux/)
and extract it and set the `LIBOPENTOK_PATH` environment variable to point to the path where you extracted the SDK.
For example:

```bash
wget https://tokbox.com/downloads/libopentok_linux_llvm_x86_64-2.19.1
tar xvf libopentok_linux_llvm_x86_64-2.19.1
export LIBOPENTOK_PATH=<path_to_SDK>
```

## Other dependencies

Before building the sample application you will need to install the following dependencies

### On Debian-based Linuxes

```bash
sudo apt install build-essential cmake clang libc++-dev libc++abi-dev \
    pkg-config libasound2 libpulse-dev libsdl2-dev
```

### On Fedora

```bash
sudo dnf groupinstall "Development Tools" "Development Libraries"
sudo dnf install SDL2-devel clang pkg-config libcxx-devel libcxxabi-devel cmake
```

Next, create the building bits using `cmake`:

```bash
$ mkdir src/build
$ cd src/build
$ CC=clang CXX=clang++ cmake ..
```

Note we are using `clang/clang++` compilers.

Use `make` to build the code:

```bash
$ make
```

When the `headless-video-publisher` binary is built, run it:
You can either publish only video, only audio or both.

```bash
$ ./headless-video-publisher -v video.yuv -a audio.pcm -k apikey -s sessionId -t token
```

### Preparing the audio and video input files.

This sample accepts video as raw YUV420P frames with frame size of 1280x720@30fps and audio as raw 16-bit 16KHz PCM audio. 
This section explains how you can convert any mp4 file to be used by this sample.

Please note that raw video occupies a lot of space (10 seconds clip can be around 400MB). So first you should cut your mp4 to a 10-15 seconds clip.

Here we use ffmpeg to cut the file to 10 seconds starting from the beginning
```bash
ffmpeg -ss 00:00:00 -i input.mp4 -to 00:00:10 -c copy output.mp4
```
Most videos found on the internet are at 60fps. convert to 30fps 

```bash
ffmpeg -i output.mp4 -filter:v fps=30 output30fps.mp4
```

Next, convert this clip to raw YUV frames
```bash
ffmpeg -i output30fps.mp4 video.yuv
```
Now, create a raw PCM audio clip from the same mp4 file

```bash
ffmpeg -y  -i output30fps.mp4 -acodec pcm_s16le -f s16le -ac 1 -ar 16000 audio.pcm
```


You can use the [OpenTok Playground](https://tokbox.com/developer/tools/playground/)
to connect to the OpenTok session in a web browser to test this application.


