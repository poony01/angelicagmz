// src/pages/index.jsx
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/globals.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Angelica GMZ 🔥</title>
      </Head>
      <div className="container">
        <img src="/background.jpeg" className="background" alt="Fundo sensual" />

        <div className="content">
          <h1>Angelica GMZ 💋</h1>
          <p>Acesse conteúdos exclusivos e privados após pagamento.</p>
          
          <div className="links">
            <a href="https://www.instagram.com/angelica__gmss" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://t.me/AngelicaaGMZ" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </div>

          <Link href="/login">
            <button className="btn">Entrar / Criar Conta</button>
          </Link>
        </div>
      </div>
    </>
  );
}
