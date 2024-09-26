"use client";
import { verifyToken } from "@/services/user.service";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await verifyToken();
      if (user) {
        router.push("/messages");
      } else {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      <Image
        src="/tpa.png"
        alt="Logo"
        width={150}
        height={150}
        layout="fixed"
      />
      <h1 className="text-2xl font-bold mb-2">Sistema de Mensajes de Audio</h1>
      <p className="text-center mb-4 text-gray-700">
        Bienvenido al sistema que te permite enviar mensajes de audio y generar
        estadística. A través de esta herramienta, podrás identificar menciones
        de incidentes y mantenimientos, junto con sus respectivas fechas, de
        manera eficiente y rápida.
      </p>
      <p className="text-center mb-6 text-gray-500">
        Para comenzar, inicia sesión con tu cuenta de Google y descubre todas
        las funcionalidades que ofrecemos.
      </p>
      <a href="http://localhost:3000/auth/google">
        <button
          className="flex items-center bg-slate-200 p-3 rounded-2xl transition-colors duration-300 hover:bg-slate-300"
          aria-label="Iniciar sesión con Google"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Iniciar Sesión con Google
        </button>
      </a>
    </div>
  );
}
