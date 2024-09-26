"use client";
import { verifyToken } from "@/services/user.service";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../app/styles/logo.module.css";

export default function HeaderComponent() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => setUser(await verifyToken()))();
  }, []);

  const logout = async () => {
    const result = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (result.ok) {
      router.push("/auth");
    }
  };

  return (
    <header className="flex justify-between bg-slate-700 text-white px-10 py-3">
      <nav>
        <Image
          src="/tpa.png"
          alt="Logo"
          width={150}
          height={150}
          className={styles.logo}
          layout="fixed"
        />
      </nav>
      {user && (
        <div className="flex items-center">
          <div className="mr-5">
            <img src={user.iconSrc} width={30} height={30} alt="user icon" />
          </div>
          <p>{user.name}</p>
          <button
            className="bg-white text-slate-700 rounded-lg py-1 px-3 mx-4"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="mx-2">Cerrar sesión</span>
          </button>
        </div>
      )}
    </header>
  );
}
