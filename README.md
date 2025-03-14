# Timer App

Ionic + React application to easily set a looped timer, with active + break independently.

1. Set how many iterations, **rounds** you want to go
2. Set the duration (in seconds) of the **active** part of the round
3. Set the duration (in seconds) of the **break** part of the round
4. Hit START

On the bottom there are controls.<br>
Rounds can be skipped, reset or go back to a previous round (double tap on back button)

### Sound
For the sounds you can hear when the countdown is about to reach 0 [`native-audio`](https://github.com/Cap-go/capacitor-native-audio) capacitor is used.

## Configuration
For trying out the repo, the web app can be run locally with
```bash
$ ionic serve
```

After setting some capacitor ([documentation here](https://capacitorjs.com/docs/)) you can try the mobile app, for example for android:
```bash
$ npx cap run android
```

---
### Screenshots
<table>
  <tr>
    <td>Config menu</td>
    <td>Active part</td>
    <td>Break part</td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot01.png" width="400"></td>
    <td><img src="screenshots/screenshot02.png" width="400"></td>
    <td><img src="screenshots/screenshot03.png" width="400"></td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="screenshots/screenshot04.png" width="720" height="500"></td>
  </tr>
  <tr>
    <td><img src="screenshots/screenshot05.png" width="720" height="500"></td>
  </tr>
</table>
