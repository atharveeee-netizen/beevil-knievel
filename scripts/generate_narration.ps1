Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = 1  # Professional presentation pace
$synth.Volume = 100

$voiceName = ($synth.GetInstalledVoices() | Select-Object -First 1).VoiceInfo.Name
Write-Host "Using Voice: $voiceName"

$text = "Honeybee pollination underpins billions of dollars in global agriculture. Yet commercial beekeepers lose nearly half their colonies each year. Today, health monitoring relies on manual inspections spaced weeks apart. Beekeepers have to suit up, smoke the colony, and physically open the hive. Opening the hive chills the delicate brood nest by up to twelve degrees Celsius. It tears open the protective propolis seal and stresses sixty thousand bees. Crucial events like queen mortality or pre-swarming happen silently inside the dark comb. What happens when nobody is looking?"

$outFile = "assets\video_sources\problem_statement_voiceover.wav"
$synth.SetOutputToWaveFile($outFile)
$synth.Speak($text)
$synth.Dispose()

$file = Get-Item $outFile
Write-Host "Generated: $outFile ($($file.Length) bytes)"
