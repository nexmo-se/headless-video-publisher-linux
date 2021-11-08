# Custom Audio Device

The Custom Audio Device sample application shows how to use a custom audio
device in your application. A custom audio device lets you implement your own
way of either capturing or rendering audio or both. However this sample only 
deals with saving audio from a video session to local file.It is important 
to note that only a custom audio device can be set at a time in an application.

You will need a valid [Vonage Video API](https://tokbox.com/developer/)
account to build this app. (Note that OpenTok is now the Vonage Video API.)

## Building and running the sample app

This application uses [CMake](https://cmake.org). Before building
the sample application, install it and these other dependencies:

  - build-essential
  - cmake
  - clang
  - libc++-dev
  - libc++abi-dev
  - pkg-config
  - libasound2
  - libpulse-dev
  - libsdl2-dev

The OpenTok Linux SDK for x86_64 (adm64) architecture is available as a Debian
package. For Debian we support Debian 9 (strech) and 10 (buster). We maintain
our own Debian repository on Bintray. For Debian 10, follow these steps
to install the packages from our repository.

* Add packagecloud repo

```bash
curl -s https://packagecloud.io/install/repositories/tokbox/debian/script.deb.sh | sudo bash
```



* Install the OpenTok Linux SDK packages.

```bash
sudo apt-get install libopentok-dev
```

Edit the `config.h` file and add your OpenTok API key,
an OpenTok session ID, and token for that session. For test purposes,
you can obtain a session ID and token from the project page in your
[Vonage Video API](https://tokbox.com/developer/) account. However,
in a production application, you will need to dynamically obtain the session
ID and token from a web service that uses one of
the [Vonage Video API server SDKs](https://tokbox.com/developer/sdks/server/).

Next, create the building bits using `cmake`:

```bash
$ cd src/build
$ CC=clang CXX=clang++ cmake ..
```

Note we are using `clang/clang++` compilers.

Use `make` to build the code:

```bash
$ make
```

When the `vonage_custom_renderer` binary is built, run it:

```bash
$ ./vonage_custom_renderer
```

You can use the [OpenTok Playground](https://tokbox.com/developer/tools/playground/)
to connect to the OpenTok session in a web browser and all the audio from the session will be saved in audio_out.pcm in the src/build folder. Format of the audio is - RAW 16-bit 16KHz little-endian PCM

 
You can end the sample application by typing Control + C in the console.


