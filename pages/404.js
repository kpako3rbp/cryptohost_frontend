import React from 'react';

import Section from '@/shared/ui/Section';
import NotFoundBlock from "@/shared/ui/NotFoundBlock";
import Layout from '@/shared/ui/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Section>
        <NotFoundBlock />
      </Section>
    </Layout>
  );
};

export default NotFound;
