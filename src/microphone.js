import { VoiceRecorder  } from 'capacitor-voice-recorder';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


let RecordingData;

VoiceRecorder.requestAudioRecordingPermission().then((GenericResponse) => console.log(GenericResponse));


export async function startRecording() {
    try {
        const currentStatus = await VoiceRecorder.getCurrentStatus();
        
        if (currentStatus.status === "PAUSED") {
            console.log("Recording is already in progress. Resuming...");
            VoiceRecorder.resumeRecording(); // Resume recording if it's already in progress
        } else {
            // Start recording if not already recording
            VoiceRecorder.startRecording();
        }
    } catch (error) {
        console.error("Error occurred while starting or resuming recording:", error);
        // Handle any errors that occur during the recording start/resume process
        // For example, show an error message to the user or perform appropriate error handling.
    }
}


  
 export function pauseRecording() {
    VoiceRecorder.pauseRecording()
  }


const date = new Date().getTime()
 

export async function stopRecording() {
    try {
        const RecordingData = await VoiceRecorder.stopRecording();
        console.log(RecordingData);
        
        const base64Sound = RecordingData.value.recordDataBase64;
        const mimeType = RecordingData.value.mimeType;
        const base64 = `data:${mimeType};base64,${base64Sound}`
     
        // Save audio file to the app's data directory
        const fileName = `${date}_audio.mp3`; // Change the file name as needed
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Documents
        });

        console.log('Saved audio file:', savedFile.uri);
        
        // Play the saved audio file
        const audioRef = new Audio(savedFile.uri);
        audioRef.oncanplaythrough = () => audioRef.play();
        audioRef.load();
    } catch (error) {
        console.error('Error saving or playing audio:', error);
    }
}


