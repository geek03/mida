/* Path */
var pathFFMPEG = "..";
var pathPlayeManager = "C:\Users\Administrator\Documents\New PlayerManager";
var pathServerPlayerManager = "\\XTV1MILANO";
var pathOutputAudio = "C:\temp\Output_audio\AVI";

/* Command */
var cmdBmdCapture = "bmdcapture.exe -C %1 -m 8 -c 8 -A 2 -V 4 -F nut -f pipe:1 | "+pathFFMPEG+"\ffmpeg.exe -f nut -i - -acodec pcm_s16le -ac 2 -map 0 -map_channel 0.1.2:0.1.0 -map_channel 0.1.3:0.1.1 -f segment -segment_time 128 -top 1 -flags +ildct -pix_fmt yuv420p -vcodec libx264 -x264opts tff=1:cabac=0:bframes=0:keyint=100:no-scenecut:intra_refresh=0:bitrate=50000:vbv-maxrate=50000:vbv-bufsize=10000 -preset superfast -loglevel debug -y %3 1>%4 2>&1";
var cmdKillBatch = "taskkill.exe /PID %1 /F /T";
var cmkKillPlayerBatch = "pskill "+pathServerPlayerManager+" PlayerManager.exe";
var cmdPlayerBatch = "psexec "+pathServerPlayerManager+" '"+pathPlayeManager+"\PlayerManager.exe'";
var cmdMovToAvi = pathFFMPEG+"\ffmpeg -i %1 -max_delay 0 -acodec copy -vcodec copy  %2 2>'"+pathOutputAudio+"\Dati.txt'"

/* Mov To Avi Completo
  
..\ffmpeg -i %1 -max_delay 0 -acodec copy -vcodec copy  %2 2>"C:\temp\Output_audio\AVI\Dati.txt" 
xmlCreator %2
DEL %1

*/