"use client";

import { useEffect, useState } from "react";
import "./home.css";
import { Dancing_Script, Pacifico } from "next/font/google";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function HomePage() {
  const [heartSize, setHeartSize] = useState(100); // Tamaño inicial del corazón
  const [touchCount, setTouchCount] = useState(0); // Contador de toques
  const [showMessages, setShowMessages] = useState(false); // Controla si se muestran los mensajes
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    years: 0,
  });
  const messages = [
    "Eres mi razón para sonreír cada día ❤️",
    "Tu fortaleza me inspira 🌟",
    "Contigo, el mundo tiene más color 🌈",
    "Eres mi lugar seguro en este mundo caótico 🏡",
    "Cada día a tu lado es un regalo 🎁",
    "Eres la persona más increíble que he conocido 💫",
    "Tu amor es mi mayor fortaleza 💪",
    "Eres mi sueño hecho realidad 🌙",
    "No hay nadie como tú en este mundo 🌍",
    "Eres mi todo, mi siempre y mi para siempre 💖",
    "Te amo más de lo que las palabras pueden expresar 💕",
    "Gracias por ser mi compañera de vida 🤍",
    "Eres mi mejor amiga y mi amor verdadero 💑",
    "Juntos, somos invencibles 💥",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);
  const startDate = new Date("2019-05-17");

  const calculateTimeTogether = () => {
    const now = new Date();
    // Diferencia en milisegundos
    const difference = now.getTime() - startDate.getTime();

    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeTogether({ days, hours, minutes, seconds, years });
  };

  useEffect(() => {
    // Calcula el tiempo inicial
    if (!timeTogether.days) calculateTimeTogether();
    const interval = setInterval(calculateTimeTogether, 1000); // Actualiza cada segundo
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  });

  // Efecto para reiniciar el tamaño del corazón si no se toca
  useEffect(() => {
    if (touchCount === 0) return;

    const timeout = setTimeout(() => {
      setHeartSize(100); // Reinicia el tamaño
      setTouchCount(0); // Reinicia el contador
    }, 2000); // Tiempo de espera antes de reiniciar

    return () => clearTimeout(timeout);
  }, [touchCount]);

  // Función para manejar el toque en el corazón
  const handleHeartClick = () => {
    if (touchCount < 10) {
      setHeartSize((prevSize) => prevSize + 20); // Aumenta el tamaño
      setTouchCount((prevCount) => prevCount + 1); // Incrementa el contador
    } else {
      setShowMessages(true); // Muestra los mensajes
    }
  };

  return (
    <div className="container">
      {!showMessages ? (
        <div
          className="heart"
          style={{ width: heartSize, height: heartSize, fontSize: heartSize }}
          onClick={handleHeartClick}
        >
          ❤️
        </div>
      ) : (
        <div className="messages">
          <h1 className={dancingScript.className}>Para mi Amor 💌</h1>
          <div className="time-together">
            <p>Llevamos juntos:</p>
            <p>
              {timeTogether.days} días, {timeTogether.hours} horas,{" "}
              {timeTogether.minutes} minutos y {timeTogether.seconds} segundos
            </p>
            <p>{timeTogether.years} años juntos y muchos más por delante 🌟</p>
          </div>
          <div
            className={pacifico.className + " heart-message"}
            onClick={() =>
              setCurrentMessage((prev) => (prev + 1) % messages.length)
            }
          >
            {messages[currentMessage]}
          </div>
        </div>
      )}

      <div className="footer">
        Hecho con ❤️ por tu Joel - ¡Feliz San Valentín!
      </div>
    </div>
  );
}
