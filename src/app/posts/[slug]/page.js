import logger from '@/logger';
import { API_URL } from '@/services/api'
import { remark } from 'remark';
import html from 'remark-html'
import styles from './page.module.css';
import CardPost from '@/components/CardPost';

async function getPostBySlug(slug) {
    const url = `${API_URL}/posts?slug=${slug}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            logger.error(`Erro ao buscar post: ${response.statusText}`);
            return {};
        }
        const data = await response.json();
        if (data.length === 0) {
            logger.warn(`Nenhum post encontrado para o slug: ${slug}`);
            return {};
        }
        logger.info('Post obtido com sucesso');
        const post =  data[0];

        const processedContent = await remark()
            .use(html)
            .process(post.markdown);
        const contentHtml = processedContent.toString();

        post.markdown = contentHtml;

        return post;
    } catch (error) {
        logger.error(`Erro ao buscar post: ${error.message}`);
        return {};
    }
}


const PagePost = async ({ params }) => {
    const post = await getPostBySlug(params.slug); 
    return (
        <div>
        <CardPost post={post} highlight />
        <h3 className={styles.subtitle}>Código:</h3>
        <div className={styles.code}>
            <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </div>
    </div>
    )
}

export default PagePost