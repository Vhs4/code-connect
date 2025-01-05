import CardPost from "@/components/CardPost";
import styles from "./page.module.css";
import logger from "@/logger";
import Link from "next/link";
import { API_URL } from "@/services/api";

async function getAllPosts(page) {
  try {
    const response = await fetch(`${API_URL}/posts?_page=${page}&_per_page=6`);
    if (!response.ok) throw new Error('Falha na rede');
    logger.info('Posts obtidos com sucesso')
    return response.json();
  } catch (error) {
    logger.error('Ops, ocorreu um erro: ' + error.message);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams.page || 1;
  const { data: posts, prev, next } = await getAllPosts(currentPage)

  return (
    <main className={styles.grid}>
      {posts && posts.length > 0 ? posts.map(post => (
        <CardPost key={post.id} post={post} />
      )) : (
        <p>Nenhum post encontrado</p>
      )}
      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link href={`/?page=${next}`}>Próxima página</Link>}
      </div>
    </main>
  );
}