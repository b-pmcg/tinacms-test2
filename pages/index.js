import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  getGithubPreviewProps,
  parseJson,
  parseMarkdown,
} from 'next-tinacms-github';
import { GetStaticProps } from 'next';
import { usePlugin } from 'tinacms';
import { useGithubJsonForm, useGithubMarkdownForm } from 'react-tinacms-github';
import { useMarkdownForm } from 'next-tinacms-markdown';
import matter from 'gray-matter';
import Mdx from '../content/mdxtest.mdx';

export default function Home({ file }) {
  console.log('file', file);
  // const Data = file.data;
  // const Mdx = dynamic(() => import(`../content/mdtest.md`));
  // console.log('matter', matter(Mdx));
  const formOptions = {
    label: 'Home Page',
    // fields: [{ name: 'title', component: 'text' }],
    fields: [
      {
        name: 'markdownBody',
        label: 'Info Page Content',
        component: 'markdown',
      },
    ],
  };

  const [data, form] = useGithubMarkdownForm(file, formOptions);
  console.log('data', data);
  console.log('form', form);
  usePlugin(form);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>something</h1> */}
        <Mdx />
      </main>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const path = './content/mdxtest.mdx';
  const vfile = require('to-vfile');
  // console.log('vfile', vfile);
  const filemdx = await vfile.read(path);
  const content = filemdx.contents.toString();
  console.log('filemdx', content);

  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/mdxtest.mdx',
      parse: parseMarkdown,
    });
  }
  // const data = require(`../content/mdxtest.mdx`);
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/mdxtest.mdx',
        data: { markdownBody: content },
        // data
        // data: (await import('../content/home.json')).default,
      },
    },
  };
};
