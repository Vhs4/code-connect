
import { ArrowBack } from "./components/icons/arrow-back";
import Image from "next/image";
import Link from "next/link";

import style from './error/error.module.css'
import banner from '../../public/images/404.png'
import { Heading } from "./components/Heading";

export default async function NotFound() {
  return (
    <div className={style.container}>
      <Image src={banner}/>
      <Heading>Opa! Ocorreu um erro.</Heading>
      <p className={style.text}>Não conseguimos carregar a página, volte para seguir navegando.</p>
      <Link href="/">
        Voltar ao feed <ArrowBack color='#81FE88'/>
      </Link>
    </div>
  )
}