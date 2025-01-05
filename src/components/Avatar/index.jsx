import Image from 'next/image'
import styles from './avatar.module.css'

const Avatar = ({ name, imageSrc }) => {
  return (
    <ul className={styles.avatar}>
        <li>
            <Image
            src={imageSrc}
            alt={`Foto de perfil de ${name}`}
            width={32}
            height={32}
            />
        </li>
        <li>
            @{name}
        </li>
    </ul>
  )
}

export default Avatar