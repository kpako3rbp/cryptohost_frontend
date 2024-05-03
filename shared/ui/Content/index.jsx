import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';
import Markdown from "react-markdown";

const Content = (props) => {
  const { className, body } = props;

  return (
    <div className={cl(styles.content, className)}>
      {/*<BlockContent
        blocks={body}
        imageOptions={{ w: 1000, h: 750, fit: 'max' }}
        projectId={clientConfig.projectId}
        dataset={clientConfig.dataset}
      />*/}

      <Markdown>{body}</Markdown>
    </div>
  );
};

export default Content;
