import axios from 'axios';
import cl from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showNotification } from '@/shared/lib/userNotifications';
import Button from '@/shared/ui/Button';
import Preloader from '@/shared/ui/Preloader';
import { addCategory, setLoadedCount, setPosts } from '@/slices/postsSlice';

import styles from './index.module.scss';
import loadPosts from "@/app/servises/news/loadPosts";

const POSTS_TO_LOAD = 7;

const Categories = (props) => {
  const { className, categories } = props;
  const dispatch = useDispatch();
  const { posts, categories: currentCategories } = useSelector((state) => state.postsData);

  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(currentCategories);

  useEffect(() => {
    setSelectedCategories(currentCategories);
    dispatch(setLoadedCount(posts.length));
  }, [currentCategories]);

  const getPostsByCategories = async (newCategory) => {
    setLoading(true);

    const isAlreadySelected = selectedCategories.includes(newCategory); //
    const updatedCategories = isAlreadySelected
      ? selectedCategories.filter((category) => category !== newCategory)
      : [...selectedCategories, newCategory];

    try {
      /*const { data } = await axios.get('/api/posts', {
        params: {
          start: 0,
          end: POSTS_TO_LOAD,
          categories: JSON.stringify(updatedCategories), // это обязательно! Иначе не сработает
        },
      });*/

      const data = await loadPosts(1, POSTS_TO_LOAD, updatedCategories);

      dispatch(setPosts({ posts: data.posts, total: data.total }));
      setSelectedCategories(updatedCategories);
      dispatch(addCategory(newCategory));
    } catch (err) {
      showNotification('error', '😩 Что-то пошло не так, попробуйте еще раз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.categories}>
      {categories.map((category) => {
        const { name, id } = category;

        const buttonClassName = cl(className, styles.categoriesBtn, {
          [styles.categoriesBtnActive]: currentCategories.includes(id),
        });

        return (
          <Button
            color={'gray'}
            padding={'small'}
            key={id}
            onClick={() => getPostsByCategories(id)}
            disabled={loading}
            className={buttonClassName}
          >
            {name}
          </Button>
        );
      })}
      {loading && <Preloader isGLobal={true} />}
    </div>
  );
};

export default Categories;
