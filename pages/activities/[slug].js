import React from 'react';

import Article from '@/entities/Article';
import Breadcrumbs from '@/features/Breadcrumbs';
import Layout from '@/shared/ui/Layout';
import Section from '@/shared/ui/Section';
import Subscribe from '@/widgets/Subscribe';

import styles from './styles.module.scss';
import {fetchActivitiesPaths, loadCurrentActivity} from "@/app/servises/activities/loadCurrentActivity";

const POSTS_TO_LOAD = 6;

const CurrentPost = (props) => {
  const { activity, sameCategoryPosts } = props;
  // const { title, category, categorySlug, publishedDate, image, slug, body } = post;

  const paths = [
    { name: 'Главная', url: '/' },
    { name: 'Криптоактивности', url: '/activities' },
    { name: activity.title, url: `/activities/${activity.slug}` },
  ];

  return (
    <Layout>
      <Breadcrumbs paths={paths}></Breadcrumbs>
      <Section noTopPadding={true}>
        <Article post={activity} directory={'activities'}></Article>
      </Section>
      <Section>
        <Subscribe />
      </Section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await fetchActivitiesPaths();

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const activity = await loadCurrentActivity(slug);

  return {
    props: {
      activity,
    },
  };
}

export default CurrentPost;
