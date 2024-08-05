import { Dispatch, SetStateAction } from "react";
import { Id } from "@/convex/_generated/dataModel";


export interface GeneratePodcastProps {
    setAudioStorageID: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    setAudio: Dispatch<SetStateAction<string>>;
    voiceType: string;
    audio: string;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
}
