"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClima } from "@/hooks/useClima";
import {
    MapPin, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
    ListMusic, Guitar, Coffee, Disc3
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Home() {
    const { info, setInfo } = useLanguage();
    const { clima, erro, loading, dataHora } = useClima();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [showVolume, setShowVolume] = useState(false)
    const [text, setText] = useState(false)
    const [showzinho, setShowzinho] = useState(false)
    const refInfos = useRef<HTMLDivElement>(null);

    const playlists = {
        todos: [
            { title: "Good Night", artist: "BoDleasons", src: "/musics/lofi/Good_Night.mp3" },
            { title: "Japan Lofi", artist: "FASSounds", src: "/musics/lofi/Japan_Lofi.mp3" },
            { title: "Rainy City", artist: "lofidreams", src: "/musics/lofi/Rainy_City.mp3" },
            { title: "Smooth Chill", artist: "FASSounds", src: "/musics/lofi/Smooth_Chill.mp3" },
        ],
        lofi: [
            { title: "Good Night", artist: "BoDleasons", src: "/musics/lofi/Good_Night.mp3" },
            { title: "Japan Lofi", artist: "FASSounds", src: "/musics/lofi/Japan_Lofi.mp3" },
            { title: "Rainy City", artist: "lofidreams", src: "/musics/lofi/Rainy_City.mp3" },
            { title: "Smooth Chill", artist: "FASSounds", src: "/musics/lofi/Smooth_Chill.mp3" },
        ],
        rock: [
            { title: "Commercial Upbeat", artist: "Top-Flow", src: "/musics/rock1.mp3" },
            { title: "Happy Rock", artist: "Top-Flow", src: "/musics/rock2.mp3" },
            { title: "Stomping Rock", artist: "AlexGrohl", src: "/musics/rock2.mp3" },
            { title: "Whistle Joyride", artist: "Top-Flow", src: "/musics/rock2.mp3" },
        ]
    };

    const playlistIcons = {
        todos: <Disc3 className="text-amber-400" size={18} />,
        rock: <Guitar className="text-amber-400" size={18} />,
        lofi: <Coffee className="text-amber-400" size={18} />,
    } as const;

    const [playlistAtual, setPlaylistAtual] = useState<keyof typeof playlists>("todos");
    const [tracks, setTracks] = useState(playlists["todos"]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function handlePlaylistChange(nova: keyof typeof playlists) {
        setPlaylistAtual(nova);
        setTracks(playlists[nova]);
        setCurrentIndex(0);

        // troca a música atual imediatamente
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = playlists[nova][0].src;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const playTrack = (index: number) => {
        setCurrentIndex(index);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = tracks[index].src;
            audioRef.current.play();
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (!audioRef.current.src) {
            audioRef.current.src = tracks[currentIndex].src;
        }
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        const next = (currentIndex + 1) % tracks.length;
        playTrack(next);
        if (isPlaying && !info) {
            setShowzinho(true)
            setTimeout(() => {
                setShowzinho(false)
            }, 5000);
        }
    };

    const prevTrack = () => {
        const prev = (currentIndex - 1 + tracks.length) % tracks.length;
        playTrack(prev);
    };

    const getWeatherIcon = () => {
        if (!clima?.descricao) return <img src="/gifs/sol.png" alt="Ensolarado" className="w-18 h-18" />;

        const desc = clima.descricao.toLowerCase();
        if (desc.includes("garoa") || desc == 'Chuva leve' || desc == 'Chuva moderada') return <img src="/gifs/chuva.png" alt="Garoa e Chuva leve" className="w-18 h-18" />;
        if (desc.includes("pancadas") || desc.includes("chuva")) return <img src="/gifs/chuva-forte.png" alt="Chuva Forte" className="w-18 h-18" />;
        if (desc == "Trovoadas com granizo grande") return <img src="/gifs/granizo.png" alt="Granizo" className="w-18 h-18" />;
        if (desc.includes("trovoadas")) return <img src="/gifs/tempestade.png" alt="Trovoada" className="w-18 h-18" />;
        if (desc.includes("neve")) return <img src="/gifs/neve.png" alt="Neve" className="w-18 h-18" />;
        if (desc.includes("nublado")) return <img src="/gifs/nublado.png" alt="Nublado" className="w-18 h-18" />;
        if (desc == "Neblina" || desc == "Névoa") return <img src="/gifs/nevoa.png" alt="Neblina" className="w-18 h-18" />;
        return <img src="/gifs/sol.png" alt="Ensolarado" className="w-18 h-18" />;
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement

            if (
                target.closest(".ignore-close") ||
                target.closest("[data-radix-popper-content-wrapper]")
            ) {
                return;
            }

            if (refInfos.current && !refInfos.current.contains(event.target as Node)) {
                setInfo(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setInfo]);

    return (
        <main className="relative min-h-screen bg-background overflow-hidden transition-colors duration-300">
            <motion.div
                ref={refInfos}
                initial={{ opacity: 0, y: 400 }}
                animate={info ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-foreground px-6 absolute bottom-0 right-14"
            >
                {loading ? (
                    <div>Carregando...</div>
                ) : erro ? (
                    <div>{erro}</div>
                ) : (
                    <>
                        <Card className="bg-card/60 border-border w-75 max-w-md shadow-xl rounded-t-2xl rounded-b-none backdrop-blur-md p-6 text-center">
                            <CardContent className="flex flex-col items-center gap-4">
                                {/* 🌦 Ícone + clima */}
                                <div className="flex flex-col w-full gap-3">
                                    <div className="flex flex-row gap-2 w-full items-center">
                                        <div className="w-full flex flex-col text-left">
                                            <h2 className="text-5xl font-semibold text-left">{clima.temperatura}°</h2>
                                            <p className="text-base font-bold mt-2">{clima.descricao}</p>
                                        </div>
                                        {getWeatherIcon()}
                                    </div>

                                    <div className="flex flex-row w-full items-center justify-center gap-1">
                                        <p className="text-muted-foreground">
                                            {clima.cidade} - {clima.estado}, {clima.pais}
                                        </p>
                                        <MapPin className="text-muted-foreground" size={16} />
                                    </div>
                                </div>

                                {/* ⏰ Data/Hora estilizada */}
                                <div className="flex w-full flex-col">
                                    <p className="text-6xl tracking-widest text-amber-400 font-extralight font-exo">{dataHora.hora}</p>
                                    <p className="text-lg font-light text-muted-foreground">{dataHora.data.replace('.', '')}</p>
                                </div>

                                <div className="border-t-1 w-full" />

                                {/* 🎶 Player */}
                                <div className="my-2 flex flex-col items-center gap-3">
                                    <p className="text-sm text-muted-foreground">
                                        {tracks[currentIndex].title} - {tracks[currentIndex].artist}
                                    </p>
                                    <div className="flex w-full items-center flex-row gap-3">
                                        <Select
                                            onValueChange={(value) => handlePlaylistChange(value as keyof typeof playlists)}
                                            value={playlistAtual}
                                        >
                                            <SelectTrigger
                                                className="p-1 w-12 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                title="Playlist"
                                            >
                                                {playlistIcons[playlistAtual] || <ListMusic className="text-amber-400" size={18} />}
                                            </SelectTrigger>

                                            <SelectContent>
                                                {Object.keys(playlists).map((key) => (
                                                    <SelectItem
                                                        key={key}
                                                        value={key}
                                                        className={`capitalize ${playlistAtual === key ? "text-amber-400 font-semibold" : ""
                                                            }`}
                                                    >
                                                        {key}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <button
                                            onClick={prevTrack}
                                            className="p-2 hover:scale-110 transition-all duration-300 ease-out cursor-pointer"
                                            title="Anterior"
                                        >
                                            <SkipBack />
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className="w-10 h-10 bg-amber-400 rounded-full hover:scale-110 transition-all duration-300 ease-out shadow-md cursor-pointer flex items-center justify-center"
                                            title={isPlaying ? "Pausar" : "Tocar"}
                                        >
                                            {isPlaying ? <Pause className="text-background" /> : <Play className="text-background" />}
                                        </button>

                                        <button
                                            onClick={nextTrack}
                                            className="p-2 hover:scale-110 transition-all duration-300 ease-out cursor-pointer"
                                            title="Próxima"
                                        >
                                            <SkipForward />
                                        </button>

                                        {/* Controle de volume */}
                                        <div
                                            onMouseEnter={() => setShowVolume(true)}
                                            onMouseLeave={() => setShowVolume(false)}
                                            className="flex w-12 items-center justify-center flex-col relative"
                                        >
                                            <button
                                                onClick={() => setIsMuted((prev) => !prev)}
                                                className={`w-7 h-7 flex items-center justify-center transition-all duration-300 cursor-pointer rounded-b-lg border-x-1 border-b-1 ${showVolume ? 'bg-card' : 'border-transparent'}`}
                                                title={isMuted ? "Ativar som" : "Silenciar"}
                                            >
                                                {isMuted ? (
                                                    <VolumeX className="text-muted-foreground" size={18} />
                                                ) : (
                                                    <Volume2 className="text-muted-foreground" size={18} />
                                                )}
                                            </button>

                                            <div
                                                className={`absolute rotate-[-90deg] -top-22 px-2 rounded-r-lg h-7 w-38 cursor-pointer transition-all duration-300 border-y-1 border-r-1 flex items-center justify-center bg-card ${!showVolume && "opacity-0 pointer-events-none"
                                                    }`}
                                            >
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={isMuted ? 0 : volume}
                                                    onChange={(e) => {
                                                        const vol = parseFloat(e.target.value);
                                                        setVolume(vol);
                                                        if (vol > 0) setIsMuted(false);
                                                        if (audioRef.current) audioRef.current.volume = vol;
                                                    }}
                                                    style={{
                                                        "--fill-width": `${(isMuted ? 0 : volume) * 100}%`,
                                                    } as React.CSSProperties}
                                                    className="cursor-pointer transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <audio ref={audioRef} onEnded={nextTrack} preload="auto" />
                    </>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={(isPlaying && !info) ? (showzinho ? { opacity: 1, width: 300 } : { opacity: 1, width: 65 }) : { opacity: 0, width: 0 }}
                whileHover={{ width: 300 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                onMouseEnter={() => setText(true)}
                onMouseLeave={() => setText(false)}
                className="absolute bottom-5 right-0 bg-blue-300 dark:bg-muted h-15 z-20 shadow-[-10px_5px_35px_rgba(0,0,0,0.15)] rounded-l-full flex items-center justify-start p-3"
            >
                <div className="flex flex-row gap-4 relative w-full">
                    <img src="/gifs/disco.png" alt="Disco" className="w-10 h-10 animate-slow-spin" />
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={(text || showzinho) ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ delay: (text || showzinho) ? 0.8 : 0, duration: (text || showzinho) ? 0.6 : 0.4, ease: "easeOut" }}
                        className="absolute left-15"
                    >
                        <p className="text-xs">Tocando Agora:</p>
                        <p>{tracks[currentIndex].title} - {tracks[currentIndex].artist}</p>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}
