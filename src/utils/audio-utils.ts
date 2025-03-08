import { NativeAudio } from "@capacitor-community/native-audio";

// const AUDIO_IDS = ["tic-tac", "bell", "end"];

export enum audioIds {
  ticTac = "tic-tac",
  bell = "bell",
  end = "end",
}

enum audioFiles {
  ticTac = "../../public/assets/tic-tac.mp3",
  bell = "../../public/assets/winner-bell-game-show.mp3",
  end = "../../public/assets/goodresult.mp3",
}

export const preloadAllAudio = async () => {
  for await (const enumId of Object.keys(audioIds)) {
    await NativeAudio.preload({
      assetId: audioIds[enumId as keyof typeof audioIds],
      assetPath: audioFiles[enumId as keyof typeof audioFiles],
      isUrl: false,
    });
  }
};

export const playAudio = async (id: audioIds) => {
  await NativeAudio.play({ assetId: id as string });
};

export const stopAllAudio = async () => {
  for await (const assetId of Object.values(audioIds)) {
    await NativeAudio.stop({ assetId });
  }
};
