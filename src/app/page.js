import CardPost from "@/components/CardPost";
import styles from "./page.module.css";
import logger from "@/logger";
import Link from "next/link";
import db from "../../prisma/db";

async function getAllPosts(page, searchTerm) {
  try {
    const where = {}

    if (searchTerm) {
      where.title = {
        contains: searchTerm,
        mode: 'insensitive' // case insensitive (lowercase)
      }
    }

    const perPage = 4
    const skip = (page - 1) * perPage

    const totalItems = await db.post.count({ where })

    const totalPages = Math.ceil(totalItems / perPage)

    const prev = page > 1 ? page - 1 : null
    const next = page < totalPages ? page + 1 : null    

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where,
      orderBy: { createdAt: 'desc'},
      include: {
        author: true
      }})
    logger.info('Posts obtidos com sucesso')    

    return { data: posts, prev: prev, next: next };
  } catch (error) {
    logger.error('Ops, ocorreu um erro: ' + error.message, { error });
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams.page || 1);
  const searchTerm = searchParams?.q;

  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm)

  return (
    <main className={styles.grid}>
      {posts && posts.length > 0 ? posts.map(post => (
        <CardPost key={post.id} post={post} />
      )) : (
        <p>Nenhum post encontrado</p>
      )}
      <div className={styles.links}>
        {prev && <Link href={{ pathname: '/', query: { page: prev, q: searchTerm } }}>Página anterior</Link>}
        {next && <Link href={{ pathname: '/', query: { page: next, q: searchTerm } }}>Próxima página</Link>}
      </div>
    </main>
  );
}