"use client"

import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import style from './error/error.module.css'
import banner from '../../public/images/500.png'
import { ArrowBack } from "./components/icons/arrow-back";
import { Heading } from "./components/Heading";

export default function Error({ error }) {
 
 React.useEffect(() => {
    console.error(error)
    }, [error])
 
    return (
        <div className={style.container}>
        <Image src={banner} alt="Imagem de um robô pensativo" />
        <Heading>Opa! Ocorreu um erro.</Heading>
        <p className={style.text}>Não conseguimos carregar a página, volte para seguir navegando.</p>
        <Link href="/">
          Voltar ao feed <ArrowBack color='#81FE88'/>
        </Link>
      </div>
  );
}